import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Import Models
import User from './models/User.js';
import Category from './models/Category.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import { users, categories, products } from './data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình dotenv để đọc file .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Kết nối Database
connectDB();

const importData = async () => {
  try {
    // 1. Xóa sạch dữ liệu cũ trong kho (Database)
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    // 2. Nạp dữ liệu mới từ data.js vào Database
    // Vì Khiêm muốn dùng mật khẩu chữ thường, nên dùng insertMany là chuẩn nhất
    await User.insertMany(users);
    await Category.insertMany(categories);
    await Product.insertMany(products);

    console.log('✅ ĐÃ BƠM DỮ LIỆU CHỮ THƯỜNG LÊN MONGODB THÀNH CÔNG!');
    process.exit();
  } catch (error) {
    console.error(`❌ LỖI KHI BƠM DỮ LIỆU: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log("🗑️ Đã dọn dẹp sạch sẽ Database!");
    process.exit();
  } catch (error) {
    console.error(`❌ LỖI KHI XÓA: ${error.message}`);
    process.exit(1);
  }
};

// Kiểm tra lệnh chạy từ terminal
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}