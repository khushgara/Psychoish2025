import { GoogleGenerativeAI } from "@google/generative-ai";

// NOTE: genAI is initialized lazily inside the handler so a missing
// GEMINI_API_KEY doesn't crash the whole server at startup.
let genAI = null;

/* ── Mental health system prompt ──────────────────────────────── */
const SYSTEM_PROMPT = `You are Psy, a compassionate and knowledgeable mental health support assistant for Psychoish — a mental wellness platform. 

Your role:
- Provide warm, empathetic, evidence-based mental health guidance
- Help users understand their assessment results and what they mean
- Suggest coping strategies, mindfulness techniques, and self-care tips
- Encourage users to seek professional help when appropriate
- Answer questions about anxiety, depression, sleep, OCD, well-being, and stress
- Be supportive without being prescriptive or replacing clinical care

Tone guidelines:
- Warm, caring, and non-judgmental
- Clear and accessible (avoid excessive jargon)
- Encouraging and hopeful while being realistic
- Concise responses (2-4 paragraphs max unless the user asks for detail)

Important safety rules:
- ALWAYS recommend professional help for serious or clinical issues
- For any mention of self-harm, suicidal thoughts, or crisis — immediately and empathetically refer to 988 Suicide & Crisis Lifeline (call or text 988) and emergency services
- Never diagnose. You can explain what assessment scores mean generally, but always caveat with "consult a professional"
- Never prescribe or recommend specific medications

You are NOT a replacement for therapy. Make this clear gently when relevant.

Platform context: Psychoish offers 9 clinical assessments (mood/PHQ-9, anxiety/GAD-7, sleep quality, OCD/Y-BOCS, suicide risk/SBQ-R, drug abuse/DAST-10, phobia questionnaire, psychological well-being). Users can book therapist consultations through the platform.`;

/* ── Chat sessions store (in-memory, keyed by sessionId) ─────── */
const sessions = new Map();

const MAX_HISTORY = 20; // keep last 20 message pairs

export const chatWithAI = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ success: false, message: "AI service not configured" });
    }

    // Lazy-init: create only once, reuse on subsequent calls
    if (!genAI) {
      genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }

    const sid = sessionId || "anonymous";

    // Get or create chat history for this session
    if (!sessions.has(sid)) {
      sessions.set(sid, []);
    }
    const history = sessions.get(sid);

    // Try models in order of free-tier generosity
    const MODELS = ["gemini-2.0-flash-lite", "gemini-2.5-flash", "gemini-2.0-flash"];
    let reply = null;
    let lastErr = null;

    for (const modelName of MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_PROMPT,
        });

        const chat = model.startChat({
          history: history.map((h) => ({
            role: h.role,
            parts: [{ text: h.text }],
          })),
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.75,
            topP: 0.9,
          },
        });

        const result = await chat.sendMessage(message.trim());
        reply = result.response.text();
        break; // success — stop trying
      } catch (err) {
        lastErr = err;
        if (err.status === 429 || err.status === 404) continue; // try next model
        throw err; // unexpected error — surface it
      }
    }

    if (!reply) throw lastErr;

    // Persist history
    history.push({ role: "user", text: message.trim() });
    history.push({ role: "model", text: reply });
    if (history.length > MAX_HISTORY * 2) history.splice(0, 2);

    return res.json({ success: true, reply, sessionId: sid });
  } catch (err) {
    console.error("Chat AI error:", err);

    if (err.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Psy is taking a short break (rate limit reached). Please wait 30 seconds and try again!",
      });
    }

    return res.status(500).json({
      success: false,
      message: "AI service temporarily unavailable. Please try again.",
    });
  }
};

export const clearSession = (req, res) => {
  const { sessionId } = req.body;
  if (sessionId && sessions.has(sessionId)) {
    sessions.delete(sessionId);
  }
  res.json({ success: true });
};

/* Returns a summary of recent in-memory sessions (for auth users) */
export const getChatHistory = (req, res) => {
  // In-memory only — no DB persistence yet
  // Build a lightweight list of all live sessions with their first user message
  const sessionList = [];
  for (const [sid, messages] of sessions.entries()) {
    if (messages.length > 0) {
      const firstUser = messages.find((m) => m.role === "user");
      sessionList.push({
        _id: sid,
        createdAt: new Date().toISOString(),
        messages: messages.map((m) => ({
          role: m.role === "model" ? "assistant" : m.role,
          content: m.text,
        })),
        preview: firstUser?.text?.slice(0, 60) || "Chat session",
      });
    }
  }
  // Return most recent first (reversed)
  res.json({ success: true, sessions: sessionList.reverse() });
};
