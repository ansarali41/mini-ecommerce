# Mini E-Commerce Platform

A simple yet feature-rich e-commerce application with a Node.js backend and Next.js frontend.

## Features

-   User authentication with JWT
-   Product browsing with filters by category, price, rating, and search
-   Shopping cart functionality
-   Checkout process
-   Customer profile management
-   Order history

## Tech Stack

### Backend

-   Node.js
-   Express.js
-   MySQL database
-   Sequelize ORM
-   JSON Web Tokens for authentication

### Frontend

-   Next.js
-   React
-   Tailwind CSS
-   Axios for API requests
-   Context API for state management

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   MySQL

### Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/mini-e-commerce.git
cd mini-e-commerce
```

2. Install dependencies:

```
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

4. Initialize the database:

```
npm run init-db
```

5. Start the development servers:

```
npm run dev
```

-   Backend will run on http://localhost:5000
-   Frontend will run on http://localhost:3000

## Project Structure

```
mini-e-commerce/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── utils/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── styles/
│   └── package.json
└── package.json
```

## API Endpoints

### Authentication

-   POST `/api/users/register` - Register a new user
-   POST `/api/users/login` - User login
-   GET `/api/users/me` - Get current user (protected)

### Products

-   GET `/api/products` - Get all products with filters
-   GET `/api/products/:id` - Get a single product
-   POST `/api/products` - Create a product (admin only)
-   PUT `/api/products/:id` - Update a product (admin only)
-   DELETE `/api/products/:id` - Delete a product (admin only)

### Categories

-   GET `/api/categories` - Get all categories
-   POST `/api/categories` - Create a category (admin only)

### Orders

-   POST `/api/orders` - Create a new order
-   GET `/api/orders` - Get user's orders (protected)
-   GET `/api/orders/:id` - Get a specific order (protected)

### Customers

-   GET `/api/customers/:id` - Get customer details (protected)
-   POST `/api/customers` - Create/update customer profile (protected)

## License

MIT
