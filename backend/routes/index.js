const productRoutes = require("./productRoutes"); // Đảm bảo đúng đường dẫn file
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const path = require("path");
const multer = require("multer");

// Cấu hình Multer (Giữ nguyên logic của bạn)
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpg|jpeg|png/;
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase(),
        );
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) return cb(null, true);
        cb("Lỗi: Chỉ chấp nhận file ảnh!");
    },
});

// HÀM ROUTE CHÍNH
function route(app) {
    // API Upload
    app.post("/api/upload", upload.single("image"), (req, res) => {
        if (!req.file)
            return res
                .status(400)
                .send({ message: "Không có file nào được nạp!" });
        res.send(`/${req.file.path.replace(/\\/g, "/")}`);
    });

    // API chính (Đăng nhập nằm trong userRoutes)
    app.use("/api/orders", orderRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/users", userRoutes);

    app.get("/", (req, res) => {
        res.send("API của shop quần áo đang chạy...");
    });
}

module.exports = route;
