const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { users, products, orders } = require("./data");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // THAY ĐỔI Ở ĐÂY: Tạo user theo cách này để nó chạy hàm mã hóa mật khẩu
        const createdUsers = await Promise.all(
            users.map(async (user) => {
                return await User.create(user); // Dùng .create thay vì .insertMany
            }),
        );

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);
        await Order.insertMany(orders);

        console.log("✅ Dữ liệu đã được nạp và MÃ HÓA thành công!");
        process.exit();
    } catch (error) {
        console.error(`❌ Lỗi: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("🗑️  Đã xóa sạch dữ liệu trong Database!");
        process.exit();
    } catch (error) {
        console.error(`❌ Lỗi khi xóa dữ liệu: ${error.message}`);
        process.exit(1);
    }
};

// Kiểm tra tham số dòng lệnh
if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
