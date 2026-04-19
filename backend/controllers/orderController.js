import asyncHandler from "express-async-handler";
import Order from "../models/Order.js"; // Nhớ đuôi .js nhé!

// @desc    Lấy tất cả đơn hàng
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
});

// Đã xóa dòng module.exports cũ