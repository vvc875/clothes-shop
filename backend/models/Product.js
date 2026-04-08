const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true }, // Link ảnh
        brand: { type: String, required: true },
        category: { type: String, required: true }, // Ví dụ: Áo thun, Quần Jean
        description: { type: String, required: true },
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 }, // Số lượng tồn kho
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        sizes: [
            {
                size: { type: String, required: true }, // Ví dụ: S, M, L, XL
                quantity: { type: Number, required: true, default: 0 },
            },
        ],
        countInStock: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: true, // Tự động tạo createdAt và updatedAt
    },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
