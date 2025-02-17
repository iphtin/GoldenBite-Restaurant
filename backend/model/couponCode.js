import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: true,
      unique: true,
    },
    discountType: {
      type: String,
      enum: ["fixed", "percentage"],
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    minimumPurchaseAmount: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    applicableCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    applicableProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
