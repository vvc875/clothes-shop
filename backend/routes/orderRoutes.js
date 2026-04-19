import express from "express";
const router = express.Router();

// Nhớ phải có đuôi .js ở cuối nhé!
import { getOrders } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getOrders);

export default router;