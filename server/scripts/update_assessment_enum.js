import db from "../config/db.js";

const updateSchema = async () => {
  try {
    console.log("Updating assessments table schema...");
    const query = `
      ALTER TABLE assessments 
      MODIFY COLUMN assessment_type 
      ENUM('mood', 'dast10', 'anxiety', 'wellbeing', 'ybocs', 'sbqr', 'sleepQuality', 'phq', 'ryffFull') 
      NOT NULL;
    `;
    await db.execute(query);
    console.log("✅ Schema updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Schema update failed:", error);
    process.exit(1);
  }
};

updateSchema();
