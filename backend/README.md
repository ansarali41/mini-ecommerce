# Mini E-Commerce Backend

This is the backend API for the Mini E-Commerce platform, built with Node.js, Express, and Sequelize ORM.

## Features

### API Endpoints

-   RESTful API design with proper HTTP methods and status codes
-   Complete set of CRUD operations for all resources
-   Comprehensive filter, sort, and pagination options for listing endpoints

### Authentication & Security

-   JWT-based authentication with refresh token support
-   Secure password hashing with bcrypt
-   Role-based access control (user/admin separation)
-   Request validation and sanitization

### Database Management

-   MySQL database with Sequelize ORM
-   Data models with proper relationships and constraints
-   Database transactions for data integrity
-   Comprehensive error handling

### Product & Inventory Management

-   Product management with categories
-   Real-time inventory tracking and stock updates
-   Stock validation during order processing
-   Prevention of overselling with transaction-based stock adjustments

### Order Processing

-   Complete order lifecycle management
-   Automatic stock updates on order placement
-   Customer profile management
-   Order history tracking

## Technical Implementation

### Architecture

-   MVC architecture with controllers, models, and routes
-   Middleware for authentication and error handling
-   Utility functions for common operations
-   Database seeders for initial data

### Data Integrity

-   Transaction support for critical operations
-   Validation at model and controller levels
-   Consistent error responses

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   MySQL (v5.7 or higher)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables (create a `.env` file):

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

3. Initialize the database:

```bash
npm run init-db
```

4. Seed the database with initial data:

```bash
npm run seed-db
```

5. Start the development server:

```bash
npm run dev
```

The API will be available at http://localhost:5000/api

## API Endpoints

### Authentication

-   `POST /api/auth/register` - Register a new user
-   `POST /api/auth/login` - User login
-   `GET /api/auth/me` - Get current user profile (protected)

### Products

-   `GET /api/products` - Get all products with filtering options
-   `GET /api/products/:id` - Get a single product by ID
-   `POST /api/products` - Create a new product (protected)
-   `PUT /api/products/:id` - Update a product (protected)
-   `DELETE /api/products/:id` - Delete a product (protected)

### Categories

-   `GET /api/categories` - Get all categories
-   `GET /api/categories/:id` - Get a category by ID
-   `POST /api/categories` - Create a new category (admin only)
-   `PUT /api/categories/:id` - Update a category (admin only)
-   `DELETE /api/categories/:id` - Delete a category (admin only)

### Orders

-   `POST /api/orders` - Create a new order (protected)
-   `GET /api/orders` - Get all orders for current user (protected)
-   `GET /api/orders/:id` - Get order details (protected)
-   `PUT /api/orders/:id/cancel` - Cancel an order (protected)

### Customers

-   `GET /api/customers/profile` - Get customer profile (protected)
-   `POST /api/customers/profile` - Create or update customer profile (protected)

## Data Models

### User

-   Authentication and basic user information
-   Relationships: Customer, Products (seller)

### Customer

-   Shipping and billing information
-   Relationship: Orders, User

### Product

-   Product details, pricing, and inventory
-   Real-time stock tracking
-   Relationships: Category, User (seller), OrderItems

### Category

-   Product categorization
-   Relationship: Products

### Order

-   Order processing and status tracking
-   Automatic inventory management
-   Relationships: Customer, OrderItems

### OrderItem

-   Individual items in an order
-   Relationships: Order, Product

## Scripts

The backend includes several utility scripts for testing and database management:

-   `npm run init-db` - Initialize the database
-   `npm run seed-db` - Seed the database with initial data
-   `npm run test-stock` - Test stock update functionality
-   `npm run verify-auth` - Verify authentication system
