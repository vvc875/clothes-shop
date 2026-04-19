import express from "express";
const router = express.Router();

// 1. Đổi sang import và bắt buộc phải có đuôi .js
import {
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

// Đường dẫn: /api/products/:id
router
    .route("/:id")
    .put(protect, admin, updateProduct) 
    .delete(protect, admin, deleteProduct); 

// Đường dẫn: /api/products/
router.route("/").get(getProducts).post(protect, admin, createProduct); 

// 2. Đổi sang export default
export default router;