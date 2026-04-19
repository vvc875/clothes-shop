import express from "express";
const router = express.Router();
import { getCategories } from "../controllers/categoryController.js";

// Đường dẫn: /api/categories
router.route("/").get(getCategories);

export default router;