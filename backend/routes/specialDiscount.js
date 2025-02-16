import express from "express";
import {
  createSpecialDiscount,
  getSpecialDiscounts,
  updateSpecialDiscount,
  deleteSpecialDiscount,
} from "../controllers/specialDiscount.js";

const router = express.Router();

router.get("/", getSpecialDiscounts);
router.post("/create", createSpecialDiscount);
router.put("/update/:id", updateSpecialDiscount);
router.delete("/delete/:id", deleteSpecialDiscount);

export default router;
