// MongoDB connection

import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI;

if(!MONGO_DB_URI){
    throw new Error("No URI in .env local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGO_DB_URI, {
            dbName: "Graphic_Editor",
            bufferCommands: false
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}