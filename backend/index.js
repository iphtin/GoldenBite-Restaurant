import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import foodRoutes from "./routes/food.js";
import bannerRoutes from "./routes/banner.js";
import couponRoutes from "./routes/couponCode.js";
import reviewRoutes from "./routes/review.js";
import orderRoutes from "./routes/order.js";
import discountRoutes from "./routes/specialDiscount.js";

// Load environment variables
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Import routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/menu", foodRoutes);
app.use("/banner", bannerRoutes);
app.use("/couponCodes", couponRoutes);
app.use("/review", reviewRoutes);
app.use("/orders", orderRoutes);
app.use("/discounts", discountRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
