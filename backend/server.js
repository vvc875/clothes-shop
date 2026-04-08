const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const route = require("./routes/index"); // Import hàm route từ index.js

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Phục vụ file tĩnh (Ảnh)
// Nếu folder uploads nằm trong backend, dùng path.join(__dirname, "uploads")
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// GỌI HÀM ROUTE ĐỂ NẠP TẤT CẢ API
route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại port ${PORT}`);
});
