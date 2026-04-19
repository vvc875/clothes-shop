const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const getOrders = asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;

    // Logic Tìm kiếm: theo ID hoặc Tên khách hàng (thông qua populate)
    const keyword = req.query.keyword
        ? {
              $or: [
                  {
                      _id: mongoose.Types.ObjectId.isValid(req.query.keyword)
                          ? req.query.keyword
                          : null,
                  },
              ],
          }
        : {};

    const count = await Order.countDocuments({ ...keyword });
    const orders = await Order.find({ ...keyword })
        .populate("user", "name email")
        .sort({ createdAt: -1 }) // Đơn mới nhất lên đầu
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Cập nhật trạng thái đơn hàng
// @route   PUT /api/orders/:id/status
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Không tìm thấy đơn hàng");
    }
});

module.exports = { getOrders, updateOrderStatus };
