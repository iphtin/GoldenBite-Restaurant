import Orders from "../model/Order.js";
import mongoose from "mongoose";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find()
      .populate("customer", "name email")
      .populate("products.product", "name image")
      .sort({ orderDate: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findById(id)
      .populate("customer", "name email")
      .populate("products.product", "name image");
    if (!order) return res.status(404).json({ message: "Order not found!" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  const {
    customer,
    products,
    totalPrice,
    paymentMethod,
    deliveryAddress,
    orderType,
  } = req.body;

  console.log(req.body);

  try {
    const newOrder = new Orders({
      customer,
      products,
      totalPrice,
      paymentMethod,
      deliveryAddress,
      orderType,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place the order", error });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const orderUpdates = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const updatedOrder = await Orders.findByIdAndUpdate(orderId, orderUpdates, {
      new: true,
    })
      .populate("userId", "name email") // Populate user details
      .populate("products.product", "name price"); // Populate food details

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(201).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const deletedOrder = await Orders.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
