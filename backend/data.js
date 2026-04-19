// Dùng các ID chuẩn của MongoDB để liên kết các bảng
const adminId = "60d5ec49c683261f2c456780";
const userId = "60d5ec49c683261f2c456789";
const categoryAoKhoacId = "60d5ecb8b314982138b56781";
const categoryAoThunId = "60d5ecb8b314982138b56782";
const categoryQuanId = "60d5ecb8b314982138b56783"; // Thêm ID cho quần

const users = [
  {
    _id: adminId,
    name: "Admin User",
    email: "admin@example.com",
    // Lưu ý: Đây là mật khẩu 'password123' đã được băm (hash) bằng bcrypt
    // Nếu bạn để chữ 'password123' trần truồng ở đây, lát nữa đăng nhập hệ thống sẽ báo sai mật khẩu
    password: "password", 
    role: "admin",
    phone: "0988888888",
    address: "Hà Nội"
  },
  {
    _id: userId,
    name: "Quân Chung",
    email: "quan@example.com",
    password: "password", // password123
    role: "user",
    phone: "0912345678",
    address: "123 Cách Mạng Tháng 8, TP.HCM"
  },
  {
    _id: "60d5ec49c683261f2c456790",
    name: "Huong",
    email: "huong@example.com",
    password: "password", // password123
    role: "user",
    phone: "0901234567",
    address: "Đà Nẵng"
  }
];

const categories = [
  {
    _id: categoryAoKhoacId,
    name: "Áo Khoác",
    slug: "ao-khoac",
    image: "/images/ao-khoac.jpg"
  },
  {
    _id: categoryAoThunId,
    name: "Áo", // Giữ nguyên tên cũ của bạn để dễ hình dung
    slug: "ao",
    image: "/images/ao-thun.jpg"
  },
  {
    _id: categoryQuanId,
    name: "Quần",
    slug: "quan",
    image: "/images/quan.jpg"
  }
];

const products = [
  {
    user: adminId,
    name: "Áo Thun Cotton Basic",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60",
    description: "Áo thun 100% cotton thoáng mát, phù hợp mặc hàng ngày.",
    brand: "GenZ Store",
    category: categoryAoThunId, // Đã đổi thành ObjectId liên kết với Danh mục
    price: 150000,
    sizes: [
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 }
    ],
    soldCount: 0,
    rating: 4.5,
    numReviews: 10,
  },
  {
    user: adminId,
    name: "Quần Jean Slim Fit",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=60",
    description: "Quần jean ôm dáng, chất liệu co giãn tốt.",
    brand: "Denim Co",
    category: categoryQuanId, // Đã đổi thành ObjectId
    price: 450000,
    sizes: [
      { size: "30", quantity: 5 },
      { size: "31", quantity: 10 }
    ],
    soldCount: 0,
    rating: 4.0,
    numReviews: 8,
  },
  {
    user: adminId,
    name: "Áo Khoác Bomber",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=60",
    description: "Áo khoác phong cách trẻ trung, giữ ấm tốt.",
    brand: "StreetWear",
    category: categoryAoKhoacId, // Đã đổi thành ObjectId
    price: 650000,
    sizes: [
      { size: "L", quantity: 5 }
    ],
    soldCount: 0,
    rating: 5.0,
    numReviews: 12,
  }
];

// XÓA mảng orders cũ đi vì đơn hàng phải do khách mua chứ không phải tạo mẫu.
// ĐỔI module.exports thành export { ... }
export { users, categories, products };