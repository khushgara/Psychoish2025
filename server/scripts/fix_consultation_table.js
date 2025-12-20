import db from "../config/db.js";

const fixSchema = async () => {
  try {
    console.log("🔧 Fixing database schema...");

    // 1. Create table if not exists (in case it's missing)
    const createQuery = `
      CREATE TABLE IF NOT EXISTS consultation_bookings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        consultation_type VARCHAR(100) NOT NULL, 
        description TEXT,
        status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `;
    await db.execute(createQuery);
    console.log("✅ Table consultation_bookings ensures.");

    // 2. Modify consultation_type to VARCHAR(100) to accept all frontend values
    // Using simple ALTER TABLE to change the column definition. 
    // This works even if it was ENUM before.
    const alterQuery = `
      ALTER TABLE consultation_bookings 
      MODIFY COLUMN consultation_type VARCHAR(100) NOT NULL;
    `;
    await db.execute(alterQuery);
    console.log("✅ Column consultation_type updated to VARCHAR(100).");

    console.log("🎉 Database fix complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing database:", error);
    process.exit(1);
  }
};

fixSchema();
