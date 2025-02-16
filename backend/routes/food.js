import express from "express";
import {
  addFood,
  getFoods,
  updatedFood,
  deleteFood,
  getSingleFood,
} from "../controllers/food.js";

const router = express.Router();

router.get("/", getFoods);
router.get("/:id", getSingleFood);
router.post("/add", addFood);
router.put("/update/:id", updatedFood);
router.delete("/delete/:id", deleteFood);

export default router;
