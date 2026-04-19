import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    
    // Slug để làm đường link đẹp (VD: ao-thun)
    slug: { type: String, required: true, unique: true },
    
    // Ảnh đại diện cho danh mục
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;