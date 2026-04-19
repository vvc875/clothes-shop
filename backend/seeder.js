import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Thêm dòng này
import connectDB from './config/db.js';

// Các dòng import Models giữ nguyên...
import User from './models/User.js';
import Category from './models/Category.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import { users, categories, products } from './data.js';

// Đoạn code để lấy đường dẫn chính xác của thư mục backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sửa lại dòng này: Tìm file .env nằm CÙNG thư mục với file seeder.js này
dotenv.config({ path: path.resolve(__dirname, '.env') });

connectDB();

// ... các phần importData và destroyData giữ nguyên bên dưới
const importData = async () => {
  try {
    // 1. Dọn dẹp sạch sẽ rác cũ
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany(); // Đã thêm Category
    await User.deleteMany();

    // 2. Bơm dữ liệu mới vào (Dùng insertMany vì mật khẩu đã được mã hóa sẵn trong data.js)
    await User.insertMany(users);
    await Category.insertMany(categories); // Đã thêm Category
    await Product.insertMany(products);

    console.log('✅ ĐÃ BƠM DỮ LIỆU LÊN MONGODB THÀNH CÔNG!');
    process.exit();
  } catch (error) {
    console.error(`❌ LỖI: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log("🗑️ Đã xóa sạch dữ liệu trong Database!");
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