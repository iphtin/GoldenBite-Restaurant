import express from "express";
import {
  getAllOrders,
  createOrder,
  deleteOrder,
  updateOrder,
  getSingleOrder,
} from "../controllers/order.js";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getSingleOrder);
router.post("/add", createOrder);
router.put("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder);

export default router;
