import express from "express";
const router = express.Router();

// Nhớ phải có đuôi .js ở đây nữa nhé
import { authUser } from "../controllers/userController.js";

// Đường dẫn: POST /api/users/login
router.post("/login", authUser);

// ĐÂY LÀ DÒNG QUAN TRỌNG NHẤT - CỨU CÁNH CỦA BẠN
export default router;