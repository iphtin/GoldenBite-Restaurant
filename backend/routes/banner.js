import express from "express";
import {
  addBanner,
  getBanners,
  deleteBanner,
  updateBanner,
} from "../controllers/banner.js";

const router = express.Router();

router.get("/", getBanners);
router.post("/add", addBanner);
router.put("/update/:id", updateBanner);
router.delete("/delete/:id", deleteBanner);

export default router;
