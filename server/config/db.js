import mongoose from "mongoose";

const connectDB = async () => {
  // Hostinger injects MONGODB_URI automatically when Atlas is linked.
  // Locally we use MONGO_URI from .env
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ No MongoDB URI found. Set MONGODB_URI (production) or MONGO_URI (local) in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
