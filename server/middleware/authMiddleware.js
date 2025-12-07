import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

// Verify JWT token middleware
export const verifyToken = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        success: false,
        message: "No token provided. Please login." 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ 
            success: false,
            message: "Token expired. Please login again." 
          });
        }
        return res.status(401).json({ 
          success: false,
          message: "Invalid token." 
        });
      }

      // Add user info to request
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };

      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Authentication error" 
    });
  }
};

// Optional: Role-based access control (for future use)
export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: "Unauthorized" 
      });
    }

    if (roles && !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: "Insufficient permissions" 
      });
    }

    next();
  };
};

export default verifyToken;
