import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    profileImage: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    deliveryAddress: {
      phone: { type: String },
      city: { type: String, default: "Nairobi" },
      state: { type: String },
      country: { type: String, default: "Kenya" },
    },

    resetToken: String,
    resetTokenExpiration: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
