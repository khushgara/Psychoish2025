import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

const authController = {
  // User Signup
  async signup(req, res) {
    console.log("📩 Received signup request:", req.body);
    const { name, email, password, confirmPassword } = req.body;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: "Passwords do not match" 
      });
    }

    try {
      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      
      if (existingUser) {
        return res.status(409).json({ 
          success: false,
          message: "User already exists" 
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const userId = await UserModel.create(name, email, hashedPassword);

      // Generate JWT Token  (userId is already a string from UserModel.create)
      const token = jwt.sign(
        { id: userId, email },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      console.log("✅ User signed up successfully:", email);
      res.status(201).json({ 
        success: true,
        message: "Signup successful", 
        token,
        user: { id: userId, name, email }
      });
    } catch (error) {
      console.error("❌ Signup error:", error);
      res.status(500).json({ 
        success: false,
        message: "Server error during signup" 
      });
    }
  },

  // User Login
  async login(req, res) {
    console.log("📩 Received login request:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required" 
      });
    }

    try {
      const user = await UserModel.findByEmail(email);
      
      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: "User not found" 
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ 
          success: false,
          message: "Invalid credentials" 
        });
      }

      // Generate JWT Token — use _id (ObjectId string) not .id which is undefined on lean()
      const mongoId = user._id.toString();
      const token = jwt.sign(
        { id: mongoId, email: user.email },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      console.log("✅ Login successful for:", email);
      return res.json({ 
        success: true,
        message: "Login successful", 
        token,
        user: { id: mongoId, name: user.name, email: user.email }
      });
    } catch (error) {
      console.error("❌ Login error:", error);
      return res.status(500).json({ 
        success: false,
        message: "Server error during login" 
      });
    }
  },

  // Get current user info
  async getCurrentUser(req, res) {
    try {
      const user = await UserModel.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: "User not found" 
        });
      }

      res.json({ 
        success: true,
        user 
      });
    } catch (error) {
      console.error("❌ Get user error:", error);
      res.status(500).json({ 
        success: false,
        message: "Server error" 
      });
    }
  },
};

export default authController;
