import mongoose from "mongoose";

const ExtrasSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const OrdersSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "products.productModel",
        required: true,
      },
      productModel: {
        type: String,
        enum: ["Food", "SpecialDiscount"], // Determines which schema to reference
        required: true,
      },
      extras: [ExtrasSchema],
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  couponCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon",
  },
  deliveryAddress: {
    phone: String,
    city: String,
    state: String,
    country: String,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: [
      "Pending",
      "Processing",
      "Out for Delivery", // For delivery orders
      "Delivered", // For delivery orders
      "Ready for Pickup", // For takeaway or dine-in self-pickup
      "Served", // For dine-in when the order is served
      "Completed", // When the dine-in order is finished
      "Canceled",
    ],
    default: "Pending",
  },
  deliveryDate: {
    type: Date,
    default: null,
  },
  // New field for order type
  orderType: {
    type: String,
    enum: ["Dine-in", "Takeaway", "Delivery"],
    required: true,
  },
});

const Orders = mongoose.model("Orders", OrdersSchema);

export default Orders;
