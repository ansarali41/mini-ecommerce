# Mini E-Commerce API Testing Guide

This guide explains how to use the provided Postman collection to test the Backend API for the Mini E-Commerce application.

## Prerequisites

1. [Postman](https://www.postman.com/downloads/) installed on your computer
2. Mini E-Commerce backend server running (typically on http://localhost:5000)

## Setting Up the Collection

1. Open Postman
2. Click on "Import" in the top left corner
3. Select "File" and upload the `postman_collection.json` file
4. The "Mini E-Commerce API" collection should now appear in your collections list

## Testing Flow

### Authentication

1. **Register a User**

    - Open the "Register User" request in the Authentication folder
    - The request body contains sample user credentials
    - Send the request to create a new user
    - You should get a response with a token and user details

2. **Login**

    - Open the "Login User" request
    - Update the email and password to match the user you registered
    - Send the request
    - The response should include a token that will be automatically saved to the collection variables

3. **Get Current User**
    - After logging in, you can test the "Get Current User" endpoint
    - This request uses the token saved during login
    - You should see the details of the logged-in user

### Products

Test product-related endpoints:

1. **Get All Products**

    - No authentication required
    - View all available products

2. **Create, Update, Delete Products**
    - These operations require authentication
    - Make sure you've logged in first

### Categories

Similar to Products, you can:

1. **View Categories** (no auth required)
2. **Create, Update, Delete Categories** (auth required)

### Orders

1. **Create an Order**

    - Requires authentication
    - The sample request body includes customer details and order items
    - This will automatically update product stock levels

2. **View Orders**

    - Requires authentication
    - You can view all orders or a specific order by ID

3. **Testing Stock Updates**
    - Create an order for a product with a specific quantity
    - Verify the product's stock has decreased by checking with "Get Product by ID"
    - Try creating an order for more units than available stock (should return an error)
    - Cancel an order (if implemented) and verify stock updates

### Stock Management Testing

1. **Verify Initial Stock**

    - Use "Get Product by ID" to check the current stock level of a product

2. **Create an Order**

    - Create an order including this product
    - The stock level should automatically decrease

3. **Verify Stock Update**

    - Get the product again to verify the stock level has decreased

4. **Test Stock Validation**

    - Try to create an order for more units than available
    - The API should return a 400 error with a message about insufficient stock

5. **Edge Cases**
    - Test with exactly the remaining stock amount (should succeed)
    - Test with zero quantity (should fail validation)
    - Test with negative quantity (should fail validation)

### Customers

Customer-related endpoints all require authentication.

## Automatic Token Handling

The collection includes a test script that automatically extracts the authentication token from login responses and saves it as a collection variable. This means after logging in, all subsequent authenticated requests will use this token without manual copying.

## Troubleshooting

-   **401 Unauthorized**: Make sure you've logged in and the token is valid
-   **403 Forbidden**: The authenticated user doesn't have permission for this action
-   **404 Not Found**: The requested resource doesn't exist
-   **400 Bad Request**: Check request data - common with stock validation errors
-   **500 Server Error**: Check the backend server logs for details

## Stock-Related Error Messages

When testing stock-related functionality, look for these specific error messages:

-   `Insufficient stock for product`: Occurs when trying to order more units than available
-   `Stock cannot be negative`: Model validation error when attempting to set negative stock

## Modifying Requests

Feel free to modify the request bodies to test different scenarios. For example:

-   Create products with different prices and categories
-   Test validation by submitting incomplete data
-   Test error handling with invalid IDs

## Environment Variables

For more advanced usage, you can create a Postman environment with variables like:

-   `baseUrl`: http://localhost:5000
-   `userEmail`: testuser@example.com
-   `userPassword`: password123

This allows you to quickly switch between different environments (e.g., development, staging, production).
