const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Hàm tạo Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Đăng nhập & lấy token
// @route   POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
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

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");
    res.json(users);
});

module.exports = { authUser };
