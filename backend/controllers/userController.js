import asyncHandler from "express-async-handler";
import User from "../models/User.js"; // Đừng quên đuôi .js nhé
import jwt from "jsonwebtoken";

// Hàm tạo Token (Giữ nội bộ trong file này nên không cần export cũng được)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Đăng nhập & lấy token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Email hoặc mật khẩu không đúng");
    }
});

// @desc    Lấy tất cả người dùng
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");
    res.json(users);
});

// Đã xóa module.exports cũ