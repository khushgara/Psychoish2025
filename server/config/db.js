import mongoose from "mongoose";

// ── Global plugin: logs DB name + collection on every query/save/delete ────────
const dbLoggerPlugin = (schema, options) => {
  const ops = ["find", "findOne", "findOneAndUpdate", "findOneAndDelete", "deleteOne", "deleteMany", "updateOne", "updateMany", "countDocuments"];

  ops.forEach((op) => {
    schema.pre(op, function () {
      const dbName = mongoose.connection.db?.databaseName ?? "unknown";
      const collection = this.mongooseCollection?.name ?? options?.collection ?? "unknown";
      console.log(`🗄️  [DB: ${dbName}] ${op} on '${collection}'`);
    });
  });

  schema.pre("save", function () {
    const dbName = mongoose.connection.db?.databaseName ?? "unknown";
    const collection = this.constructor.collection?.name ?? "unknown";
    console.log(`🗄️  [DB: ${dbName}] save on '${collection}'`);
  });
};

mongoose.plugin(dbLoggerPlugin);
// ───────────────────────────────────────────────────────────────────────────────

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
    const dbName = conn.connection.db.databaseName;
    console.log(`✅ Connected to MongoDB: ${conn.connection.host} | DB: ${dbName}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
