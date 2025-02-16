import express from "express";
import {
  getReviews,
  createReview,
  deleteReview,
  getFoodReviews,
} from "../controllers/review.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/add", createReview);
router.post("/:id", getFoodReviews);
router.delete("/delete/:id", deleteReview);

export default router;
