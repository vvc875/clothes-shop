const bcrypt = require("bcryptjs");

const orders = [
    {
        // THAY DÃY SỐ DƯỚI ĐÂY BẰNG ID USER THẬT TRONG MÁY BẠN
        user: "69cbfc438a2462172ecf844d",
        orderItems: [
            {
                name: "Áo Polo Dior",
                qty: 1,
                image: "/uploads/image-123.png",
                price: 390000,
                // THAY DÃY SỐ DƯỚI ĐÂY BẰNG ID PRODUCT THẬT TRONG MÁY BẠN
                product: "69cbfc438a2462172ecf8452",
            },
        ],
        shippingAddress: {
            address: "123 Cách Mạng Tháng 8",
            city: "Hồ Chí Minh",
            phone: "0901234567",
        },
        paymentMethod: "Thanh toán khi nhận hàng",
        totalPrice: 390000,
        status: "Chờ xác nhận",
        isPaid: false,
        isDelivered: false,
    },
];

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        isAdmin: true,
    },
    {
        name: "Quân Chung",
        email: "quan@example.com",
        password: "password123",
        isAdmin: false,
    },
    {
        name: "Huong",
        email: "huong@example.com",
        password: "password123",
        isAdmin: false,
    },
];

const products = [
    {
        name: "Áo Thun Cotton Basic",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60",
        description: "Áo thun 100% cotton thoáng mát, phù hợp mặc hàng ngày.",
        brand: "GenZ Store",
        category: "Áo",
        price: 150000,
        countInStock: 20,
        rating: 4.5,
        numReviews: 10,
    },
    {
        name: "Quần Jean Slim Fit",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=60",
        description: "Quần jean ôm dáng, chất liệu co giãn tốt.",
        brand: "Denim Co",
        category: "Quần",
        price: 450000,
        countInStock: 15,
        rating: 4.0,
        numReviews: 8,
    },
    {
        name: "Áo Khoác Bomber",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=60",
        description: "Áo khoác phong cách trẻ trung, giữ ấm tốt.",
        brand: "StreetWear",
        category: "Áo Khoác",
        price: 650000,
        countInStock: 5,
        rating: 5.0,
        numReviews: 12,
    },
];

module.exports = { users, products, orders };
