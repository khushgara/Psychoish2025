import db from "../config/db.js";
import AssessmentModel from "../models/AssessmentModel.js";
import ResultModel from "../models/ResultModel.js";

const debugSubmit = async () => {
  try {
    const userId = 4;
    const assessmentType = "sleepQuality";
    const responses = [
      { questionId: 1, value: 2 },
      { questionId: 2, value: 3 }
    ];

    // Simulate controller logic
    const score = 1; // Mock score
    
    // Get interpretation
    console.log("Getting interpretation...");
    const interpretation = ResultModel.getInterpretation(
      assessmentType,
      score
    );
    console.log("Interpretation:", JSON.stringify(interpretation));

    // Get recommendations
    console.log("Getting recommendations...");
    const recommendations = ResultModel.getRecommendations(
      assessmentType,
      score,
      interpretation
    );
    console.log("Recommendations found");

    // Save to database
    console.log("Attempting DB Insert...");
    const assessmentId = await AssessmentModel.create(
      userId,
      assessmentType,
      responses,
      score,
      interpretation.label,
      JSON.stringify(recommendations)
    );
    
    console.log("✅ Success! ID:", assessmentId);
    process.exit(0);

  } catch (error) {
    console.error("❌ Error during debug submission:");
    console.error(error.message);
    if (error.sqlMessage) console.error("SQL Error:", error.sqlMessage);
    if (error.code) console.error("Error Code:", error.code);
    process.exit(1);
  }
};

debugSubmit();
