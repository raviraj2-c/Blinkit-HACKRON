# 🚀 Blinkit Clone

A full-stack e-commerce application built with React, Node.js, and MySQL, inspired by Blinkit.

## 📋 Tech Stack

### Frontend
- React 18 with Vite
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- React Router DOM (for routing)
- React Query (for data fetching)
- Zod (for form validation)

### Backend
- Node.js & Express
- MySQL
- JWT for authentication
- Prisma (ORM)
- Express Validator
- Multer (for file uploads)

## 🛠️ Project Setup

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8 or higher)
- Git

### Frontend Setup (Current Directory)

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

3. Start development server:
```bash
npm run dev
```

### Backend Setup (Create New Directory)

1. Create backend directory:
```bash
mkdir blinkit-backend
cd blinkit-backend
```

2. Initialize project:
```bash
npm init -y
```

3. Install dependencies:
```bash
npm install express cors dotenv mysql2 prisma @prisma/client jsonwebtoken bcryptjs express-validator multer
```

4. Create `.env` file:
```env
PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL="mysql://user:password@localhost:3306/blinkit"
```

5. Initialize Prisma:
```bash
npx prisma init
```

## 📁 Project Structure

### Frontend Structure
```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Basic UI components
│   ├── layout/        # Layout components
│   └── features/      # Feature-specific components
├── pages/             # Page components
├── hooks/             # Custom hooks
├── lib/               # Utility functions
├── types/             # TypeScript types
├── services/          # API services
├── store/             # State management
└── styles/            # Global styles
```

### Backend Structure
```
src/
├── controllers/       # Request handlers
├── models/           # Prisma models
├── routes/           # API routes
├── middleware/       # Custom middleware
├── utils/            # Utility functions
├── config/           # Configuration files
└── services/         # Business logic
```

## 🗄️ Database Schema

```sql
-- Users Table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    category_id VARCHAR(36),
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Orders Table
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'delivered', 'cancelled'),
    delivery_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36),
    product_id VARCHAR(36),
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## 🔐 API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Products
- GET /api/products
- GET /api/products/:id
- POST /api/products (Admin)
- PUT /api/products/:id (Admin)
- DELETE /api/products/:id (Admin)

### Categories
- GET /api/categories
- POST /api/categories (Admin)
- PUT /api/categories/:id (Admin)
- DELETE /api/categories/:id (Admin)

### Orders
- GET /api/orders
- POST /api/orders
- GET /api/orders/:id
- PUT /api/orders/:id/status (Admin)

## 🚀 Development Workflow

1. Start the MySQL server
2. Run the backend server:
```bash
cd backend
npm run dev
```

3. Run the frontend development server:
```bash
cd frontend
npm run dev
```

## 📱 Features to Implement

- [ ] User authentication
- [ ] Product catalog with categories
- [ ] Shopping cart
- [ ] Order management
- [ ] Real-time order tracking
- [ ] Admin dashboard
- [ ] Payment integration
- [ ] Search functionality
- [ ] Filter and sort products
- [ ] User reviews and ratings

## 🔒 Security Considerations

- Implement JWT for secure authentication
- Use bcrypt for password hashing
- Input validation and sanitization
- CORS configuration
- Rate limiting
- XSS protection
- CSRF protection
- Secure headers

## 🌟 Future Enhancements

- Real-time delivery tracking
- Push notifications
- Payment gateway integration
- Analytics dashboard
- Mobile app development
- Performance optimization
- Caching implementation
- SEO optimization

## 📄 License

MIT License