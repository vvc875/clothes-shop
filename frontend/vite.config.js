import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cấu hình Proxy để kết nối Frontend (5173) với Backend (5000)
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Khi gọi API bắt đầu bằng /api, Vite sẽ tự động gửi tới server Node.js
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // Cấu hình để hiển thị được ảnh từ thư mục uploads của backend
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})