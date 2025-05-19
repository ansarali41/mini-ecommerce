# Mini E-Commerce Platform

A comprehensive, secure, and user-friendly e-commerce application built with Node.js (backend) and Next.js (frontend).

## Features

### User Management

-   User registration and authentication with JWT
-   Secure password hashing using bcrypt
-   User profile management
-   Role-based access control (normal users and administrators)

### Product Management

-   Browse products with advanced filtering options:
    -   Category filtering
    -   Price range filtering
    -   Rating filtering
    -   Keyword search
-   Product details with high-quality images
-   Real-time stock tracking and availability display
-   Product ratings and reviews
-   Featured products on homepage

### Shopping Experience

-   Shopping cart with persistent storage
-   Real-time stock validation in cart
-   Quantity adjustment with stock constraints
-   Automatic detection of out-of-stock items
-   Clear visuals for product availability status

### Checkout Process

-   Secure and intuitive checkout flow
-   Customer information pre-filling from profile
-   Customer address management
-   Order summary with tax calculation
-   Multiple payment method options

### Order Management

-   Order history and status tracking
-   Order details view
-   Stock updates on purchase completion
-   Order confirmation with details

### Store Management

-   Category management
-   Inventory tracking and management
-   Stock level tracking and automatic updates
-   Product listing management for sellers

## Tech Stack

### Backend

-   Node.js
-   Express.js
-   MySQL database
-   Sequelize ORM
-   JSON Web Tokens for authentication
-   bcrypt for password hashing
-   Transaction support for data integrity

### Frontend

-   Next.js 13+ with App Router
-   React with Hooks
-   Tailwind CSS for styling
-   Axios for API requests
-   Context API for state management
-   Responsive design for all devices
-   Next.js Image optimization for performance

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   MySQL (v5.7 or higher)
-   npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mini-e-commerce.git
cd mini-e-commerce
```

2. Install dependencies:

```bash
npm run install-all
```

3. Set up environment variables:

    - Create a `.env` file in the `backend` directory with the following variables:
        ```
        PORT=5000
        NODE_ENV=development
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=your_mysql_password
        DB_NAME=mini_ecommerce
        JWT_SECRET=your_jwt_secret
        JWT_EXPIRES_IN=7d
        ```

4. Initialize the database and seed with sample data:

```bash
npm run init-db
```

5. Start the development servers:

```bash
npm run dev
```

-   Backend will run on http://localhost:5000
-   Frontend will run on http://localhost:3000

## Project Structure

```
mini-e-commerce/
├── backend/
│   ├── src/
│   │   ├── config/         # Database and server configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth and error middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── scripts/        # Utility scripts for testing/initialization
│   │   ├── seeders/        # Database seed data
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Application entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js pages and routes
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React Context providers
│   │   └── utils/          # Frontend utility functions
│   └── package.json
└── package.json            # Root package.json
```

│ │ ├── contexts/
│ │ └── styles/
│ └── package.json
└── package.json

```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user profile (protected)
- POST `/api/auth/refresh` - Refresh authentication token

### Products
- GET `/api/products` - Get all products with filtering options
  - Query parameters: `categoryId`, `minPrice`, `maxPrice`, `minRating`, `search`, `page`, `limit`, `sortBy`, `sortOrder`
- GET `/api/products/:id` - Get detailed information about a specific product
- POST `/api/products` - Create a new product (seller/admin only)
- PUT `/api/products/:id` - Update a product (owner/admin only)
- DELETE `/api/products/:id` - Delete a product (owner/admin only)
- GET `/api/products/featured` - Get featured products for homepage

### Categories
- GET `/api/categories` - Get all product categories
- GET `/api/categories/:id` - Get a specific category and its products
- POST `/api/categories` - Create a new category (admin only)
- PUT `/api/categories/:id` - Update a category (admin only)
- DELETE `/api/categories/:id` - Delete a category (admin only)

### Orders
- POST `/api/orders` - Create a new order (automatically updates product stock)
- GET `/api/orders` - Get all orders for current user (protected)
- GET `/api/orders/:id` - Get detailed information about a specific order (protected)
- PUT `/api/orders/:id/cancel` - Cancel an order (protected)
- PUT `/api/orders/:id/status` - Update order status (admin only)

### Customers
- GET `/api/customers/profile` - Get customer profile (protected)
- POST `/api/customers/profile` - Create or update customer profile (protected)

## Key Features Explained

### Secure Authentication
The application uses JSON Web Tokens (JWT) for authentication. Passwords are securely hashed using bcrypt before storage.

### Real-time Stock Management
- Stock levels are updated in real-time when orders are placed
- The system prevents ordering products with insufficient stock
- Clear visual indicators show product availability (In Stock/Out of Stock)
- Cart items automatically validate against current stock levels

### Smart Shopping Cart
- The cart persists between sessions using localStorage
- Item quantities are limited to available stock
- Out-of-stock products are clearly marked and cannot be checked out
- Cart totals and tax are calculated automatically

### Responsive Design
The frontend is built with a mobile-first approach, ensuring a great experience on any device size.

### Data Integrity
All critical operations (like order placement) use database transactions to ensure data consistency.

## License

MIT
```
