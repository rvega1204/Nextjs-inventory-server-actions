import mongoose from "mongoose";

/**
 * Connects to the MongoDB database.
 * @returns {Promise<Mongoose>} A promise that resolves to the Mongoose instance.
 */
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("Please provide a valid MongoDB URI");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { promise: null, conn: null };
}

/**
 * Connects to the MongoDB database.
 * @returns {Promise<Mongoose>} A promise that resolves to the Mongoose instance.
 */
async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
