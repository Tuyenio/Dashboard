# 🎓 Dashboard Analytics Frontend - Nền Tảng Phân Tích Giáo Dục

**Dự án Dashboard Analytics Frontend** là một ứng dụng web hiện đại được phát triển để phục vụ cho lĩnh vực **giáo dục và trường học**. Đây là một nền tảng phân tích học tập thông minh sử dụng AI để theo dõi, phân tích và đánh giá tiến độ học tập của học sinh.

## 🎯 Mục tiêu dự án

Tạo ra một **nền tảng phân tích giáo dục tiên tiến** giúp:
- 📊 **Phân tích học tập AI**: Theo dõi và phân tích tiến độ học tập của học sinh
- 🎓 **Quản lý giáo dục**: Hỗ trợ giáo viên và học sinh trong quá trình dạy và học
- 📈 **Báo cáo chi tiết**: Cung cấp insights và analytics cho nhà trường
- 🏫 **Tích hợp trường học**: Kết nối với hệ thống quản lý học tập hiện có

## 🚀 Công nghệ sử dụng

### Frontend Stack
- **React 19** - Thư viện UI hiện đại nhất
- **TypeScript** - Type safety và developer experience tốt
- **Vite 7** - Build tool cực nhanh cho development
- **Material-UI v7** - Component library cao cấp với thiết kế Material Design

### State Management & Data
- **Zustand** - State management nhẹ và đơn giản
- **TanStack Query v5** - Data fetching, caching và synchronization
- **Axios** - HTTP client cho API calls

### UI/UX & Animation
- **Framer Motion** - Animation library mạnh mẽ cho hiệu ứng mượt mà
- **@mui/x-charts** - Biểu đồ interactive cao cấp
- **@mui/x-data-grid** - Data grid component chuyên nghiệp
- **Recharts** - Thư viện biểu đồ responsive

### Routing & Navigation
- **React Router Dom v7** - Client-side routing hiện đại

## 📁 Cấu trúc dự án hiện tại

```
frontend/
├── 📄 package.json              # Dependencies và scripts
├── 📄 vite.config.ts           # Cấu hình Vite
├── 📄 tsconfig.json            # Cấu hình TypeScript
├── 📄 index.html               # HTML template
├── 📁 public/                  # Static assets
│   └── 🖼️ vite.svg             # Favicon
├── 📁 src/                     # Source code chính
│   ├── 📄 main.tsx             # Entry point của ứng dụng
│   ├── 📄 App.tsx              # Component root với routing
│   ├── 📄 App.css              # Global styles
│   ├── 📄 index.css            # Base CSS
│   │
│   ├── 📁 pages/               # Các trang chính
│   │   ├── 🔐 Login.tsx        # Trang đăng nhập cao cấp
│   │   └── 📊 Dashboard.tsx    # Trang dashboard analytics
│   │
│   ├── 📁 layouts/             # Layout components
│   │   └── 📐 MainLayout.tsx   # Layout chính với sidebar
│   │
│   ├── 📁 components/          # Components tái sử dụng
│   │   └── 📈 Charts.tsx       # Components biểu đồ
│   │
│   ├── 📁 services/            # API services
│   │   ├── 🔌 api.ts           # Cấu hình axios và base API
│   │   └── 🛠️ index.ts         # Các service functions
│   │
│   ├── 📁 store/               # State management
│   │   └── 💾 index.ts         # Zustand stores
│   │
│   ├── 📁 hooks/               # Custom React hooks
│   │   └── 🎣 index.ts         # Custom hooks cho API
│   │
│   ├── 📁 types/               # TypeScript definitions
│   │   └── 🏷️ index.ts         # Interface và type definitions
│   │
│   ├── 📁 utils/               # Utility functions
│   │   └── 🔧 index.ts         # Helper functions
│   │
│   ├── 📁 styles/              # Styling files
│   │   └── 🎨 global.css       # Global CSS styles
│   │
│   └── 📁 assets/              # Static resources
│       ├── 📁 images/          # Hình ảnh dự án
│       └── 📁 icons/           # Icon files
```

## 🛠️ Cài đặt và chạy dự án

### Prerequisites
- **Node.js** >= 18
- **npm** hoặc **yarn**

### Các bước cài đặt và chạy
```bash
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Cài đặt dependencies (nếu chưa có)
npm install

# 3. Chạy development server
npm run dev

# ➜ Local: http://localhost:5175/
```

### Build và Deploy
```bash
# Build cho production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔗 Kết nối Backend

Frontend được thiết kế để kết nối với **Spring Boot Backend**:
- **API Base URL**: `http://localhost:8080/api`
- **Authentication**: JWT token-based
- **Data Format**: JSON REST API
- **File Upload**: Multipart form data

### API Endpoints
```typescript
// Authentication
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/profile

// Dashboard
GET  /api/dashboard/stats
GET  /api/dashboard/charts

// Students
GET  /api/students
POST /api/students
PUT  /api/students/:id

// Reports
GET  /api/reports/export
```

## 📋 Tính năng hiện tại

### ✅ Đã hoàn thành
- 🎨 **Giao diện Login cao cấp** - Thiết kế nghệ thuật, sang trọng
- 🔐 **Hệ thống Authentication** - Bảo mật với JWT token
- 📊 **Dashboard Analytics** - Biểu đồ và metrics giáo dục
- 📱 **Responsive Design** - Tương thích mọi thiết bị
- ⚡ **Performance tối ưu** - Lazy loading, code splitting
- 🎭 **Animation mượt mà** - Framer Motion effects
- 🏗️ **Architecture hiện đại** - Clean code structure

### 🚧 Đang phát triển
- 📈 **Advanced Analytics** - AI-powered insights
- 👥 **User Management** - Quản lý học sinh/giáo viên
- ⚙️ **Settings Page** - Cấu hình hệ thống
- 🔔 **Real-time Notifications** - Thông báo theo thời gian thực
- 📤 **Data Export** - Xuất báo cáo Excel/PDF

## 🎓 Đặc thù dành cho giáo dục

### Tính năng giáo dục
- 📚 **Quản lý khóa học** - Course management
- 👨‍🎓 **Theo dõi học sinh** - Student progress tracking
- 📝 **Đánh giá học tập** - Assessment tools
- 📊 **Báo cáo tiến độ** - Progress reports
- 🏆 **Hệ thống điểm số** - Grading system
- 📅 **Lịch học** - Class scheduling

### AI Analytics cho giáo dục
- 🤖 **Phân tích học tập AI** - AI-powered learning analytics
- 📈 **Dự đoán kết quả** - Performance prediction
- 🎯 **Cá nhân hóa học tập** - Personalized learning paths
- 📊 **Insights thông minh** - Smart educational insights

## 📱 Responsive Design

### Breakpoints
- 📱 **Mobile**: 0px - 599px
- 📱 **Tablet**: 600px - 899px  
- 💻 **Desktop**: 900px - 1199px
- 🖥️ **Large**: 1200px+

### Design System
- 🎨 **Material Design 3** - Google's latest design system
- 🖌️ **Typography Scale** - Chuẩn typographic hierarchy
- 🎯 **Color Palette** - Accessible và aesthetic
- 📐 **Grid System** - 12-column responsive grid

## 🚀 Performance & Optimization

- ⚡ **Vite HMR** - Hot module replacement cực nhanh
- 📦 **Tree Shaking** - Loại bỏ code không sử dụng
- 🎯 **Code Splitting** - Lazy loading components
- 💾 **Smart Caching** - TanStack Query cache strategy
- 🖼️ **Image Optimization** - Tối ưu hình ảnh
- 📊 **Bundle Analysis** - Phân tích kích thước bundle

## 🎨 UI/UX Design

### Triết lý thiết kế
- 🎓 **Education-focused** - Tập trung vào giáo dục
- 🏛️ **Professional** - Chuyên nghiệp, đáng tin cậy
- 🎨 **Artistic** - Có tính nghệ thuật, thẩm mỹ
- 🔬 **Technology-forward** - Hiện đại, công nghệ cao
- 📚 **Knowledge-centric** - Tôn vinh tri thức

### Visual Elements
- 🌈 **Sophisticated Colors** - Tông màu tinh tế
- ✨ **Smooth Animations** - Animation mượt mà
- 🎭 **Micro-interactions** - Tương tác tinh tế
- 📐 **Golden Ratio Layout** - Bố cục theo tỷ lệ vàng
- 🔍 **Visual Hierarchy** - Phân cấp trực quan rõ ràng

## 🤝 Hướng dẫn Development

### Quy trình làm việc
1. **Clone repository**
2. **Tạo feature branch**
3. **Development với `cd frontend && npm run dev`**
4. **Test trên multiple devices**
5. **Build và preview**
6. **Create Pull Request**

### Code Standards
- 📝 **TypeScript strict mode**
- 🧹 **ESLint + Prettier**
- 📚 **Component documentation**

## 📞 Support & Contact

Dự án được phát triển cho **lĩnh vực giáo dục và trường học** với mục tiêu tạo ra một nền tảng phân tích học tập thông minh và hiện đại.

Nếu cần hỗ trợ hoặc có câu hỏi về dự án, vui lòng:
- 📧 Tạo issue trên GitHub
- 💬 Liên hệ qua chat
- 📖 Tham khảo documentation

---

**🎓 Dashboard Analytics Frontend** - *Nền tảng phân tích giáo dục tiên tiến với AI*
