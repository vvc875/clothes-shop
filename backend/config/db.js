const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Kết nối tới MongoDB bằng đường dẫn trong file .env
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Đã kết nối MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Lỗi kết nối: ${error.message}`);
        process.exit(1); // Dừng chương trình nếu không kết nối được
    }
};

module.exports = connectDB;
