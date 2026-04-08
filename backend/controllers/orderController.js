const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
});

module.exports = { getOrders };
