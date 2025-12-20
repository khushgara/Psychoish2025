import db from "../config/db.js";

const AssessmentModel = {
  // Create new assessment
  async create(userId, assessmentType, responses, score, interpretation, recommendations) {
    const query = `
      INSERT INTO assessments (user_id, assessment_type, responses, score, interpretation, recommendations)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [
      userId,
      assessmentType,
      JSON.stringify(responses),
      score,
      interpretation,
      recommendations,
    ]);
    return result.insertId;
  },

  // Get assessment by ID
  async findById(id) {
    const query = "SELECT * FROM assessments WHERE id = ?";
    const [rows] = await db.execute(query, [id]);
    if (rows[0] && typeof rows[0].responses === 'string') {
      rows[0].responses = JSON.parse(rows[0].responses);
    }
    return rows[0];
  },

  // Get user's assessment history
  async getUserAssessments(userId, assessmentType = null) {
    let query = "SELECT * FROM assessments WHERE user_id = ?";
    const params = [userId];

    if (assessmentType) {
      query += " AND assessment_type = ?";
      params.push(assessmentType);
    }

    query += " ORDER BY created_at DESC";
    const [rows] = await db.execute(query, params);
    
    return rows.map(row => ({
      ...row,
      responses: typeof row.responses === 'string' ? JSON.parse(row.responses) : row.responses
    }));
  },

  // Get latest assessment by type
  async getLatestByType(userId, assessmentType) {
    const query = `
      SELECT * FROM assessments 
      WHERE user_id = ? AND assessment_type = ?
      ORDER BY created_at DESC
      LIMIT 1
    `;
    const [rows] = await db.execute(query, [userId, assessmentType]);
    if (rows[0] && typeof rows[0].responses === 'string') {
      rows[0].responses = JSON.parse(rows[0].responses);
    }
    return rows[0];
  },

  // Get assessment statistics
  async getStats(userId) {
    const query = `
      SELECT 
        assessment_type,
        COUNT(*) as count,
        AVG(score) as avg_score,
        MAX(created_at) as last_taken
      FROM assessments
      WHERE user_id = ?
      GROUP BY assessment_type
    `;
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },

  // Delete assessment
  async delete(id, userId) {
    const query = "DELETE FROM assessments WHERE id = ? AND user_id = ?";
    const [result] = await db.execute(query, [id, userId]);
    return result.affectedRows > 0;
  },
};

export default AssessmentModel;
