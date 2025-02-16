import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Reviews = mongoose.model("Reviews", ReviewsSchema);

export default Reviews;
