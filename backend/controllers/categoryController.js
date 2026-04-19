import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

// @desc    Lấy tất cả danh mục
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
});

// Sau này nếu muốn thêm Admin tạo danh mục, Khiêm sẽ viết thêm export const createCategory ở đây.