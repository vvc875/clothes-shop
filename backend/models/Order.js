import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        // Ai là người đặt đơn này?
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        // Giỏ hàng khách mua
        orderItems: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                size: { type: String, required: true }, // Đã thêm Size để lấy đúng hàng
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
            },
        ],

        // Thông tin người nhận
        shippingAddress: {
            customerName: { type: String, required: true }, // Đã thêm tên người nhận
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
        },

        // Tiền bạc & Trạng thái thanh toán
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["COD", "Bank_Transfer"],
            default: "COD",
        },
        // Đã thay isPaid bằng paymentStatus
        paymentStatus: {
            type: String,
            required: true,
            enum: ["Unpaid", "Paid"],
            default: "Unpaid",
        },

        // Trạng thái vận chuyển (thay isDelivered)
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Shipping", "Completed", "Canceled"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
