import db from "../config/db.js";

const UserModel = {
  // Create new user
  async create(name, email, hashedPassword) {
    const query =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const [result] = await db.execute(query, [name, email, hashedPassword]);
    return result.insertId;
  },

  // Find user by email
  async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  },

  // Find user by ID
  async findById(id) {
    const query = "SELECT id, name, email, created_at FROM users WHERE id = ?";
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  // Update user
  async update(id, updates) {
    const fields = [];
    const values = [];

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    });

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    const [result] = await db.execute(query, values);
    return result.affectedRows > 0;
  },

  // Get or create user profile
  async getProfile(userId) {
    const query = "SELECT * FROM user_profiles WHERE user_id = ?";
    const [rows] = await db.execute(query, [userId]);
    return rows[0];
  },

  // Update user profile
  async updateProfile(userId, profileData) {
    const { phone, date_of_birth, gender, bio, avatar_url } = profileData;

    // Check if profile exists
    const existing = await this.getProfile(userId);

    if (existing) {
       const query = `
        UPDATE user_profiles 
        SET phone = ?, date_of_birth = ?, gender = ?, bio = ?, avatar_url = ?
        WHERE user_id = ?
      `;
      const [result] = await db.execute(query, [
        phone || null,
        date_of_birth || null,
        gender || null,
        bio || null,
        avatar_url || null,
        userId,
      ]);
      return result.affectedRows > 0;
    } else {
      const query = `
        INSERT INTO user_profiles (user_id, phone, date_of_birth, gender, bio, avatar_url)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.execute(query, [
        userId,
        phone || null,
        date_of_birth || null,
        gender || null,
        bio || null,
        avatar_url || null,
      ]);
      return result.insertId;
    }
  },
};

export default UserModel;
