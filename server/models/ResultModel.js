import AssessmentModel from "./AssessmentModel.js";

const ResultModel = {
  // Generate interpretation based on assessment type and score
  getInterpretation(assessmentType, score) {
    const interpretations = {
      mood: [
        { max: 10, label: "Normal", severity: "low" },
        { max: 16, label: "Mild mood disturbance", severity: "mild" },
        { max: 20, label: "Borderline clinical depression", severity: "moderate" },
        { max: 30, label: "Moderate depression", severity: "moderate" },
        { max: 40, label: "Severe depression", severity: "high" },
        { max: Infinity, label: "Extreme depression", severity: "critical" },
      ],
      dast10: [
        { max: 0, label: "None reported", severity: "low" },
        { max: 2, label: "Low level", severity: "low" },
        { max: 5, label: "Moderate level", severity: "moderate" },
        { max: 8, label: "Substantial level", severity: "high" },
        { max: 10, label: "Severe level", severity: "critical" },
      ],
      anxiety: [
        { max: 21, label: "Low anxiety", severity: "low" },
        { max: 35, label: "Moderate anxiety", severity: "moderate" },
        { max: Infinity, label: "Potentially concerning levels of anxiety", severity: "high" },
      ],
      wellbeing: [
        { max: 33, label: "Very low", severity: "critical" },
        { max: 48, label: "Low", severity: "high" },
        { max: 63, label: "Normal", severity: "moderate" },
        { max: 78, label: "Mild", severity: "low" },
        { max: 93, label: "Moderate", severity: "low" },
        { max: 108, label: "High state of well-being", severity: "low" },
      ],
      ybocs: [
        { max: 13, label: "Mild symptoms or lower", severity: "low" },
        { max: 25, label: "Moderate symptoms", severity: "moderate" },
        { max: 34, label: "Moderate-severe symptoms", severity: "high" },
        { max: 40, label: "Severe symptoms", severity: "critical" },
      ],
      sbqr: [
        { max: 6, label: "Low risk", severity: "low" },
        { max: 7, label: "Moderate risk - requires attention", severity: "moderate" },
        { max: 11, label: "High risk - immediate intervention needed", severity: "high" },
        { max: Infinity, label: "Critical risk - urgent professional help required", severity: "critical" },
      ],
      sleepQuality: [
        { max: 10, label: "Good sleep quality", severity: "low" },
        { max: 20, label: "Fair sleep quality", severity: "mild" },
        { max: 30, label: "Poor sleep quality", severity: "moderate" },
        { max: Infinity, label: "Very poor sleep quality", severity: "high" },
      ],
      phq: [
        { max: 15, label: "Minimal phobic avoidance", severity: "low" },
        { max: 30, label: "Mild phobic avoidance", severity: "mild" },
        { max: 45, label: "Moderate phobic avoidance", severity: "moderate" },
        { max: Infinity, label: "Severe phobic avoidance", severity: "high" },
      ],
      ryffFull: [
        { max: 108, label: "Very low well-being", severity: "critical" },
        { max: 162, label: "Low well-being", severity: "high" },
        { max: 216, label: "Moderate well-being", severity: "moderate" },
        { max: 270, label: "Good well-being", severity: "low" },
        { max: 324, label: "Excellent well-being", severity: "low" },
      ],
    };

    const ranges = interpretations[assessmentType];
    if (!ranges) return { label: "Unknown", severity: "unknown" };

    for (const range of ranges) {
      if (score <= range.max) {
        return { label: range.label, severity: range.severity };
      }
    }

    return { label: "Unknown", severity: "unknown" };
  },

  // Generate recommendations based on assessment results
  getRecommendations(assessmentType, score, interpretation) {
    const recommendations = {
      mood: {
        low: [
          "Continue maintaining your positive mental health habits",
          "Practice gratitude and mindfulness regularly",
          "Stay connected with friends and family",
        ],
        mild: [
          "Consider talking to a trusted friend or family member",
          "Engage in regular physical exercise",
          "Practice stress-reduction techniques like meditation",
          "Monitor your mood patterns",
        ],
        moderate: [
          "We recommend consulting with a mental health professional",
          "Consider cognitive behavioral therapy (CBT)",
          "Maintain a regular sleep schedule",
          "Engage in activities you enjoy",
          "Avoid isolation and stay socially connected",
        ],
        high: [
          "Strongly recommend seeking professional help immediately",
          "Contact a mental health crisis line if needed",
          "Inform a trusted person about how you're feeling",
          "Consider medication evaluation with a psychiatrist",
          "Avoid making major life decisions during this time",
        ],
        critical: [
          "URGENT: Please seek immediate professional help",
          "Contact a crisis helpline: National Suicide Prevention Lifeline (988)",
          "Visit an emergency room if you have thoughts of self-harm",
          "Do not stay alone - reach out to someone you trust",
          "Your safety is the top priority",
        ],
      },
      dast10: {
        low: [
          "Continue making healthy choices",
          "Stay informed about substance use risks",
          "Maintain supportive relationships",
        ],
        moderate: [
          "Consider speaking with a counselor about substance use",
          "Evaluate your relationship with substances",
          "Join a support group if needed",
          "Identify triggers and develop coping strategies",
        ],
        high: [
          "We strongly recommend professional substance abuse counseling",
          "Consider joining a 12-step program or similar support group",
          "Speak with your doctor about treatment options",
          "Build a strong support network",
        ],
        critical: [
          "URGENT: Seek professional help for substance abuse immediately",
          "Contact SAMHSA National Helpline: 1-800-662-4357",
          "Consider inpatient treatment programs",
          "Inform your doctor about your substance use",
          "Your health and safety are at serious risk",
        ],
      },
      anxiety: {
        low: [
          "Continue your current stress management practices",
          "Practice deep breathing exercises",
          "Maintain a healthy work-life balance",
        ],
        moderate: [
          "Consider learning relaxation techniques",
          "Regular exercise can help reduce anxiety",
          "Limit caffeine and alcohol intake",
          "Consider speaking with a therapist",
          "Practice mindfulness meditation",
        ],
        high: [
          "We recommend consulting with a mental health professional",
          "Consider cognitive behavioral therapy (CBT) for anxiety",
          "Learn and practice anxiety management techniques",
          "Discuss medication options with a psychiatrist if needed",
          "Join an anxiety support group",
        ],
      },
      wellbeing: {
        critical: [
          "Consider comprehensive mental health evaluation",
          "Focus on building positive relationships",
          "Set small, achievable goals",
          "Seek professional counseling",
          "Engage in activities that bring meaning to your life",
        ],
        high: [
          "Work on developing a sense of purpose",
          "Build stronger social connections",
          "Consider therapy to improve well-being",
          "Practice self-compassion",
        ],
        moderate: [
          "Continue working on personal growth",
          "Maintain healthy relationships",
          "Engage in meaningful activities",
        ],
        low: [
          "Excellent! Continue your positive practices",
          "Share your strategies with others",
          "Maintain your current lifestyle",
          "Consider helping others improve their well-being",
        ],
      },
      ybocs: {
        low: [
          "Symptoms are minimal - continue monitoring",
          "Practice stress management",
          "Maintain healthy routines",
        ],
        moderate: [
          "Consider consulting with a mental health professional",
          "Cognitive behavioral therapy (CBT) can be very effective for OCD",
          "Learn about exposure and response prevention (ERP)",
          "Join an OCD support group",
        ],
        high: [
          "We strongly recommend professional treatment",
          "Specialized OCD therapy (ERP) is highly recommended",
          "Discuss medication options with a psychiatrist",
          "Consider intensive outpatient programs",
        ],
        critical: [
          "URGENT: Seek specialized OCD treatment immediately",
          "Contact the International OCD Foundation for resources",
          "Consider intensive treatment programs",
          "Medication evaluation is strongly recommended",
          "Your quality of life can significantly improve with proper treatment",
        ],
      },
      sbqr: {
        low: [
          "Continue maintaining your mental wellness",
          "Stay connected with supportive people",
          "Practice healthy coping strategies",
          "Know that help is available if needed",
        ],
        moderate: [
          "We recommend speaking with a mental health professional",
          "Share your feelings with someone you trust",
          "National Suicide Prevention Lifeline: 988",
          "Develop a safety plan with professional guidance",
        ],
        high: [
          "URGENT: Please contact a mental health professional immediately",
          "Call 988 (Suicide & Crisis Lifeline) for immediate support",
          "Do not stay alone - reach out to someone you trust",
          "Visit an emergency room if you have immediate plans",
          "Your life matters and help is available",
        ],
        critical: [
          "EMERGENCY: Seek immediate help - Call 988 or go to nearest ER",
          "You are not alone - crisis counselors are available 24/7",
          "Text 'HELLO' to 741741 (Crisis Text Line)",
          "Remove means of self-harm from your environment",
          "This crisis is temporary - professional help can make a difference",
        ],
      },
      sleepQuality: {
        low: [
          "Continue your good sleep hygiene practices",
          "Maintain a consistent sleep schedule",
          "Keep your bedroom cool, dark, and quiet",
        ],
        mild: [
          "Review your sleep environment and bedtime routine",
          "Limit screen time before bed",
          "Avoid caffeine and heavy meals in the evening",
          "Consider relaxation techniques before sleep",
        ],
        moderate: [
          "Consult with a healthcare provider about your sleep issues",
          "Keep a sleep diary to identify patterns",
          "Consider cognitive behavioral therapy for insomnia (CBT-I)",
          "Evaluate medications that might affect sleep",
        ],
        high: [
          "Strongly recommend consultation with a sleep specialist",
          "Discuss potential sleep disorders with your doctor",
          "Consider a sleep study if recommended",
          "Address underlying health or mental health issues",
          "Poor sleep significantly impacts overall health",
        ],
      },
      phq: {
        low: [
          "Continue managing your daily activities well",
          "Maintain your current coping strategies",
          "Stay engaged in social and work activities",
        ],
        mild: [
          "Consider gradual exposure to mildly avoided situations",
          "Practice relaxation techniques when facing fears",
          "Maintain social connections and activities",
        ],
        moderate: [
          "We recommend consulting with a mental health professional",
          "Cognitive Behavioral Therapy (CBT) is highly effective for phobias",
          "Consider exposure therapy with a trained therapist",
          "Learn anxiety management techniques",
        ],
        high: [
          "Strongly recommend specialized treatment for phobias",
          "Exposure and Response Prevention (ERP) therapy is very effective",
          "Consult with a psychologist specializing in anxiety disorders",
          "Medication may be helpful in combination with therapy",
          "Phobias are highly treatable with proper intervention",
        ],
      },
      ryffFull: {
        critical: [
          "URGENT: Seek professional mental health support",
          "Your well-being is significantly impacted",
          "Therapy can help improve multiple life areas",
          "Consider comprehensive mental health evaluation",
          "Support groups may also be beneficial",
        ],
        high: [
          "We recommend consulting with a mental health professional",
          "Focus on building one area of well-being at a time",
          "Consider therapy to address specific challenges",
          "Engage in activities that bring meaning and purpose",
        ],
        moderate: [
          "Continue working on personal growth",
          "Set realistic goals for self-improvement",
          "Strengthen relationships with others",
          "Practice self-compassion and acceptance",
        ],
        low: [
          "Maintain your positive well-being practices",
          "Continue nurturing relationships and personal growth",
          "Share your strategies with others",
          "Stay engaged in meaningful activities",
        ],
      },
    };

    const typeRecs = recommendations[assessmentType];
    if (!typeRecs || !typeRecs[interpretation.severity]) {
      return ["Please consult with a mental health professional for personalized recommendations"];
    }

    return typeRecs[interpretation.severity];
  },

  // Get formatted result with interpretation and recommendations
  async getFormattedResult(assessmentId) {
    const assessment = await AssessmentModel.findById(assessmentId);
    if (!assessment) return null;

    const interpretation = this.getInterpretation(
      assessment.assessment_type,
      assessment.score
    );

    const recommendations = this.getRecommendations(
      assessment.assessment_type,
      assessment.score,
      interpretation
    );

    return {
      ...assessment,
      interpretation,
      recommendations,
    };
  },

  // Get dashboard summary for user
  async getDashboardSummary(userId) {
    const stats = await AssessmentModel.getStats(userId);
    const summary = {
      totalAssessments: 0,
      assessmentsByType: {},
      recentAssessments: [],
    };

    stats.forEach((stat) => {
      summary.totalAssessments += stat.count;
      summary.assessmentsByType[stat.assessment_type] = {
        count: stat.count,
        avgScore: Math.round(stat.avg_score),
        lastTaken: stat.last_taken,
      };
    });

    // Get 5 most recent assessments
    const recent = await AssessmentModel.getUserAssessments(userId);
    summary.recentAssessments = recent.slice(0, 5).map((assessment) => ({
      id: assessment.id,
      type: assessment.assessment_type,
      score: assessment.score,
      interpretation: assessment.interpretation,
      date: assessment.created_at,
    }));

    return summary;
  },
};

export default ResultModel;
