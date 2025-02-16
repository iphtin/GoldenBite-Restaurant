import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
