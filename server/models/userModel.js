import mongoose from "mongoose";

// ── Schema ────────────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },

    // Profile fields embedded directly (replaces the old user_profiles table)
    phone: { type: String, default: null },
    date_of_birth: { type: Date, default: null },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say", null],
      default: null,
    },
    bio: { type: String, default: null },
    avatar_url: { type: String, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ── Model API ─────────────────────────────────────────────────────────────────
const UserModel = {
  // Create new user — returns the new document's _id as a string
  async create(name, email, hashedPassword) {
    const user = await User.create({ name, email, password: hashedPassword });
    return user._id.toString();
  },

  // Find user by email (includes password for auth checks)
  async findByEmail(email) {
    return User.findOne({ email }).lean();
  },

  // Find user by ID (excludes password)
  async findById(id) {
    return User.findById(id).select("-password").lean();
  },

  // Update top-level user fields (name, email, password, …)
  async update(id, updates) {
    const result = await User.findByIdAndUpdate(id, { $set: updates }, { new: true });
    return !!result;
  },

  // Get embedded profile fields for a user
  async getProfile(userId) {
    const user = await User.findById(userId)
      .select("phone date_of_birth gender bio avatar_url")
      .lean();
    if (!user) return null;
    return { user_id: userId, ...user };
  },

  // Upsert profile fields (same method signature as before)
  async updateProfile(userId, profileData) {
    const { phone, date_of_birth, gender, bio, avatar_url } = profileData;
    const result = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          phone: phone ?? null,
          date_of_birth: date_of_birth ?? null,
          gender: gender ?? null,
          bio: bio ?? null,
          avatar_url: avatar_url ?? null,
        },
      },
      { new: true }
    );
    return result ? result._id.toString() : false;
  },
};

export default UserModel;
