# Mini E-Commerce Frontend

This is the frontend application for the Mini E-Commerce platform, built with Next.js 13+ using the App Router architecture.

## Features

### UI Components

-   Responsive layout with mobile-first design
-   Reusable components for consistent UI/UX
-   Optimized images using Next.js Image component
-   Smooth transitions and loading states

### Pages

-   **Home**: Featured products, categories, and promotional sections
-   **Products**: Product listings with advanced filtering options
-   **Product Detail**: Detailed product information with stock status and add to cart
-   **Cart**: Shopping cart with real-time stock validation
-   **Checkout**: Streamlined checkout process
-   **Customer Profile**: User profile management
-   **Orders**: Order history and details
-   **Authentication**: Login and registration pages

### Context Providers

-   **AuthContext**: Manages user authentication state
-   **CartContext**: Handles shopping cart functionality with stock validation
-   Both contexts persist data between sessions

## Technical Implementation

### State Management

-   React Context API for global state
-   React Hooks for component-level state
-   localStorage for persistence between sessions

### API Integration

-   Axios for API requests
-   Custom API utilities for consistent error handling
-   Debounced search for better performance

### User Experience

-   Form validation with helpful error messages
-   Stock availability indicators throughout the app
-   Explicit apply buttons for filters to reduce unwanted API requests
-   Responsive design that works on all device sizes

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Components

### Product Components

-   `ProductCard.js`: Reusable product display with stock status
-   `ProductFilter.js`: Advanced filtering for product searches

### Cart Components

-   `CartContext.js`: Manages cart state with stock validation
-   Stock validation prevents adding more items than available

### Authentication

-   `AuthContext.js`: JWT-based authentication with token refresh
-   Protected routes for authenticated users only

### Checkout Process

-   Multi-step checkout with form validation
-   Customer information management
-   Order confirmation and history

## Component Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── cart/            # Cart-related components
│   ├── checkout/        # Checkout form components
│   ├── customer/        # Customer profile components
│   ├── layout/          # Layout components (Header, Footer)
│   ├── product/         # Product display components
│   └── ui/              # Generic UI components
├── contexts/            # React Context providers
└── utils/               # Utility functions
```

## Learn More

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
