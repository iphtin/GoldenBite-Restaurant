import mongoose from "mongoose";

const ExtrasSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: [],
  productModel: {
    type: String,
    default: "Food",
  },
  availabilitySchedule: [
    {
      startTime: { type: String, required: true }, // e.g., "07:00"
      endTime: { type: String, required: true }, // e.g., "13:00"
    },
  ],
  image: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  extras: [ExtrasSchema],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Food = mongoose.model("Food", FoodSchema);

export default Food;
