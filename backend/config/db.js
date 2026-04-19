import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('🚀 Đang thử kết nối thẳng bằng link...');
    
    // Dán thẳng link của bạn vào đây
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`✅ Kết nối thành công tới Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Lỗi kết nối: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;