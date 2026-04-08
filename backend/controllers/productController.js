const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

// @desc    Lấy tất cả sản phẩm (User & Admin đều dùng)
const getProducts = asyncHandler(async (req, res) => {
    // 1. Phân trang
    const pageSize = 8; // Số sản phẩm trên một trang
    const page = Number(req.query.pageNumber) || 1; // Trang hiện tại (mặc định là 1)

    // 2. Tìm kiếm (theo Tên hoặc Danh mục)
    const keyword = req.query.keyword
        ? {
              $or: [
                  { name: { $regex: req.query.keyword, $options: "i" } }, // Tìm theo tên (i: không phân biệt hoa thường)
                  { category: { $regex: req.query.keyword, $options: "i" } }, // Tìm theo danh mục
              ],
          }
        : {}; // Nếu không có từ khóa, tìm tất cả

    // 3. Đếm tổng số sản phẩm khớp với điều kiện tìm kiếm
    const count = await Product.countDocuments({ ...keyword });

    // 4. Lấy dữ liệu sản phẩm có phân trang và tìm kiếm
    const products = await Product.find({ ...keyword })
        .limit(pageSize) // Giới hạn số sản phẩm
        .skip(pageSize * (page - 1)); // Bỏ qua các sản phẩm của các trang trước

    // 5. Trả về dữ liệu
    res.json({ products, page, pages: Math.ceil(count / pageSize) }); // Trả về danh sách, trang hiện tại, tổng số trang
});

// @desc    Xóa sản phẩm (Chỉ Admin)
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.json({ message: "Sản phẩm đã được xóa" });
    } else {
        res.status(404);
        throw new Error("Không tìm thấy sản phẩm");
    }
});

// @desc    Tạo sản phẩm mới (Chỉ Admin)
const createProduct = asyncHandler(async (req, res) => {
    // Lấy toàn bộ dữ liệu từ Frontend gửi lên
    const { name, price, description, image, brand, category, countInStock } =
        req.body;

    const product = new Product({
        name: name || "Tên mặc định",
        price: price || 0,
        user: req.user._id, // Đã có protect nên req.user sẽ tồn tại
        image: image || "/images/sample.jpg",
        brand: brand || "Thương hiệu",
        category: category || "Danh mục",
        countInStock: countInStock || 0,
        numReviews: 0,
        description: description || "Mô tả sản phẩm",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Cập nhật sản phẩm
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        sizes,
        countInStock,
    } = req.body;

    // Tìm sản phẩm theo ID
    const product = await Product.findById(req.params.id);

    if (product) {
        // Cập nhật các trường dữ liệu nếu có dữ liệu mới gửi lên, nếu không thì giữ nguyên cũ
        product.name = name || product.name;
        product.price = price || product.price; // Quan trọng: Đảm bảo trường price được cập nhật
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.sizes = sizes || product.sizes;
        product.countInStock = countInStock || product.countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Không tìm thấy sản phẩm");
    }
});

module.exports = { getProducts, deleteProduct, createProduct, updateProduct };
