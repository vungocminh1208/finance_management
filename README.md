
# App Quản lý Chi tiêu Shopping

Ứng dụng quản lý chi tiêu cá nhân được xây dựng bằng React, TypeScript và Vite.

## Tính năng chính
- Quản lý danh mục theo màu sắc.
- Lọc chi tiêu theo Tháng/Năm.
- Tổng kết năm tự động.
- Định dạng tiền tệ VND chuẩn.

## Cách Deploy lên GitHub

1. **Tạo Repository mới** trên GitHub của bạn.
2. **Đẩy code lên**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USER_CUA_BAN/TEN_REPO_CUA_BAN.git
   git push -u origin main
   ```
3. **Kích hoạt GitHub Pages**:
   - Vào tab **Settings** của Repository trên GitHub.
   - Chọn mục **Pages** ở menu bên trái.
   - Ở phần **Build and deployment > Source**, chọn **GitHub Actions**.
4. **Chờ đợi**:
   - Tab **Actions** sẽ chạy workflow "Deploy to GitHub Pages". 
   - Sau khoảng 1-2 phút, ứng dụng của bạn sẽ được online tại: `https://USER_CUA_BAN.github.io/TEN_REPO_CUA_BAN/`

## Phát triển cục bộ
```bash
npm install
npm run dev
```
