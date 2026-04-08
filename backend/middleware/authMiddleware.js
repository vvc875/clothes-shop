const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Không có quyền truy cập, token lỗi");
        }
    } else {
        res.status(401);
        throw new Error("Không có token");
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Bạn không phải Admin");
    }
};

module.exports = { protect, admin };
