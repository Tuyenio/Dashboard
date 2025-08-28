# Dashboard Analytics Frontend

Frontend cho ứng dụng Dashboard Analytics được xây dựng với React, TypeScript, Vite và Material-UI.

## 🚀 Công nghệ sử dụng

- **React 18** - Thư viện UI hiện đại
- **TypeScript** - Type safety và developer experience tốt hơn
- **Vite** - Build tool nhanh và hiệu quả
- **Material-UI (MUI)** - Component library đẹp và đầy đủ
- **React Router** - Client-side routing
- **Zustand** - State management nhẹ và đơn giản
- **TanStack Query** - Data fetching và caching
- **Recharts** - Thư viện biểu đồ responsive
- **Axios** - HTTP client

## 📁 Cấu trúc thư mục

```
src/
├── components/        # Các component tái sử dụng
│   └── Charts.tsx    # Component biểu đồ
├── pages/            # Các trang chính
│   ├── Dashboard.tsx # Trang dashboard chính
│   └── Login.tsx     # Trang đăng nhập
├── layouts/          # Layout components
│   └── MainLayout.tsx # Layout chính với sidebar
├── hooks/            # Custom hooks
│   └── index.ts      # Hooks cho API calls
├── services/         # API services
│   ├── api.ts        # Cấu hình axios
│   └── index.ts      # Các service functions
├── store/            # State management
│   └── index.ts      # Zustand stores
├── types/            # TypeScript types
│   └── index.ts      # Interface definitions
├── utils/            # Utility functions
│   └── index.ts      # Helper functions
├── styles/           # CSS files
│   └── global.css    # Global styles
└── assets/           # Static assets
    ├── images/       # Hình ảnh
    └── icons/        # Icons
```

## 🛠️ Cài đặt và chạy

### Prerequisites
- Node.js >= 16
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

### Build cho production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env.local` trong thư mục frontend:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=Dashboard Analytics
```

### Kết nối với Spring Boot Backend
Backend API endpoint được cấu hình trong `src/services/api.ts`:
- Default URL: `http://localhost:8080/api`
- Có thể thay đổi qua environment variables

## 📋 Features

### ✅ Đã hoàn thành
- 🎨 UI/UX hiện đại với Material-UI
- 📊 Biểu đồ interactive với Recharts
- 🔐 Authentication system
- 📱 Responsive design
- 🌙 Dark/Light theme support
- 📈 Dashboard với các metrics quan trọng
- 🚀 Performance tối ưu với Vite
- 📦 State management với Zustand
- 🔄 Data fetching với TanStack Query

### 🚧 Cần phát triển thêm
- Analytics page chi tiết
- User management page
- Settings page
- Real-time notifications
- Advanced filtering
- Data export functionality

## 🎯 Cách sử dụng

1. **Đăng nhập**: Vào `/login` để đăng nhập hệ thống
2. **Dashboard**: Xem tổng quan dữ liệu tại trang chủ
3. **Navigation**: Sử dụng sidebar để điều hướng
4. **Export**: Xuất dữ liệu dưới dạng Excel/PDF
5. **Theme**: Chuyển đổi dark/light mode

## 🔗 API Integration

Frontend đã được cấu hình sẵn để kết nối với Spring Boot backend:

- Authentication endpoints
- Dashboard data endpoints
- User management endpoints
- File export endpoints

## 📱 Responsive Design

Ứng dụng được thiết kế responsive cho:
- 📱 Mobile (xs: 0px+)
- 📱 Tablet (sm: 600px+)
- 💻 Desktop (md: 900px+)
- 🖥️ Large screens (lg: 1200px+)

## 🧪 Testing

```bash
# Chạy tests
npm run test

# Test coverage
npm run test:coverage
```

## 📈 Performance

- ⚡ Vite cho build speed cực nhanh
- 🎯 Code splitting tự động
- 📦 Tree shaking để giảm bundle size
- 💾 Caching với TanStack Query
- 🔄 Lazy loading components

## 🚀 Deployment

### Build cho production
```bash
npm run build
```

### Deploy lên Nginx
```bash
# Copy dist folder to nginx directory
cp -r dist/* /var/www/html/
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push và tạo Pull Request

## 📞 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub repository.
