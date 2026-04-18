const mongoose = require('mongoose');

// This prevents multiple connections during hot reloads
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Turn off buffering for faster failure detection
      serverSelectionTimeoutMS: 5000, // Kill connection attempt after 5 seconds
    };

    console.log("🔗 Connecting to MongoDB Atlas...");
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected Successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB Connection Error:", e.message);
    throw e;
  }

  return cached.conn;
}

module.exports = connectDB;