import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // Liên kết với Admin nào đã tạo sản phẩm này
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    
    // Đã đổi từ String thành ObjectId liên kết với bảng Category
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category', 
      required: true 
    },
    
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    
    // Đã xóa countInStock và thay bằng mảng quản lý kho theo Size
    sizes: [
      {
        size: { type: String, required: true }, // Ví dụ: S, M, L...
        quantity: { type: Number, required: true, default: 0 },
      }
    ],

    // Các thông số thống kê
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    
    // Đã thêm trường Đếm số lượng bán ra (phục vụ biểu đồ Dashboard)
    soldCount: { type: Number, default: 0 }, 
  },
  { 
    timestamps: true 
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;