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
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
          phone: profile?.phone || "",
          date_of_birth: profile?.date_of_birth || "",
          gender: profile?.gender || "",
          bio: profile?.bio || "",
          avatar_url: profile?.avatar_url || "",
        },
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
      const { name, email, phone, date_of_birth, gender, bio, avatar_url } = req.body;

      // Update user name and email if provided
      const userUpdates = {};
      if (name) userUpdates.name = name;
      if (email) userUpdates.email = email;
      
      if (Object.keys(userUpdates).length > 0) {
        await UserModel.update(userId, userUpdates);
      }

      // Update profile
      const profileData = {
        phone: phone || null,
        date_of_birth: date_of_birth || null,
        gender: gender || null,
        bio: bio || null,
        avatar_url: avatar_url || null,
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
