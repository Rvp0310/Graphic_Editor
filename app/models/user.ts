import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    files: [
      {
        type: String, // Cloudinary URL
      }
    ],
  },
  {
    timestamps: true,
  }
);

export const User = models.User || mongoose.model("User", UserSchema);