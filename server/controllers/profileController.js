import UserModel from "../models/userModel.js";

const profileController = {
  // Get user profile
  async getProfile(req, res) {
    try {
      const userId = req.user.id;

      const user = await UserModel.findById(userId);
      const profile = await UserModel.getProfile(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        },
        profile: profile || {},
      });
    } catch (error) {
      console.error("❌ Get profile error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  // Update user profile
  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { name, phone, date_of_birth, gender, bio, avatar_url } = req.body;

      // Update user name if provided
      if (name) {
        await UserModel.update(userId, { name });
      }

      // Update profile
      const profileData = {
        phone,
        date_of_birth,
        gender,
        bio,
        avatar_url,
      };

      await UserModel.updateProfile(userId, profileData);

      console.log(`✅ Profile updated for user ${userId}`);

      res.json({
        success: true,
        message: "Profile updated successfully",
      });
    } catch (error) {
      console.error("❌ Update profile error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
};

export default profileController;
