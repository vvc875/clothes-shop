import productRoutes from "./productRoutes.js"; // Nhớ thêm đuôi .js
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js";
import path from "path";
import multer from "multer";

// Cấu hình Multer (Chuyển sang kiểu import)
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
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) return cb(null, true);
        cb(new Error("Lỗi: Chỉ chấp nhận file ảnh!"));
    },
});

// HÀM ROUTE CHÍNH (Sử dụng export default)
function route(app) {
    // API Upload
    app.post("/api/upload", upload.single("image"), (req, res) => {
        if (!req.file)
            return res
                .status(400)
                .send({ message: "Không có file nào được nạp!" });
        res.send(`/${req.file.path.replace(/\\/g, "/")}`);
    });

    // API chính
    app.use("/api/orders", orderRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/users", userRoutes);

    app.get("/", (req, res) => {
        res.send("API của shop quần áo đang chạy...");
    });
}

export default route; // Thay cho module.exports = route