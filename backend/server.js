import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import connectDB from './config/db.js';
import route from './routes/index.js'; // Nhớ phải có đuôi .js

// Cấu hình để lấy được __dirname trong ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chỉ định đường dẫn file .env nằm trong thư mục backend
dotenv.config({ path: path.join(__dirname, '.env') });

// Kết nối Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Phục vụ file tĩnh (Ảnh)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Nạp tất cả API từ file routes/index.js
route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại port ${PORT}`);
});