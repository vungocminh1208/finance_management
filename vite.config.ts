
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Thay 'TEN_REPO_CUA_BAN' bằng tên repository trên GitHub nếu bạn không dùng custom domain
export default defineConfig({
  plugins: [react()],
  base: './', // Sử dụng đường dẫn tương đối để hoạt động tốt trên GitHub Pages
});
