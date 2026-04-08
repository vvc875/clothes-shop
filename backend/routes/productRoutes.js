const express = require("express");
const router = express.Router();
const {
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

// Đường dẫn: /api/products/:id
router
    .route("/:id")
    .put(protect, admin, updateProduct) // Đã có bảo mật
    .delete(protect, admin, deleteProduct); // Đã có bảo mật

// Đường dẫn: /api/products/
router.route("/").get(getProducts).post(protect, admin, createProduct); // FIX: Thêm protect và admin vào đây!

module.exports = router;
