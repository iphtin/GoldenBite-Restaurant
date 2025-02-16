import mongoose from "mongoose";

const ExtrasSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const DiscountsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  productModel: {
    type: String,
    default: "SpecialDiscount",
  },
  price: [],
  image: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  extras: [ExtrasSchema],
  createdAt: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
});

const SpecialDiscount = mongoose.model("SpecialDiscount", DiscountsSchema);

export default SpecialDiscount;
