import asyncHandler from "express-async-handler";
import User from "../models/User.js"; 
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Đăng nhập & lấy token
// PHẢI CÓ CHỮ export Ở ĐÂY ĐỂ userRoutes.js KHÔNG BÁO LỖI NỮA
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Gọi đúng hàm matchPassword bạn vừa định nghĩa trong Model
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, 
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Email hoặc mật khẩu không đúng");
    }
});

// @desc    Lấy tất cả người dùng
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");
    res.json(users);
});