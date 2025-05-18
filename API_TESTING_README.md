# Mini E-Commerce API Testing Tools

This directory contains tools for testing the Mini E-Commerce Backend API.

## Available Tools

1. **Postman Collection** (`postman_collection.json`)

    - A comprehensive collection of all API endpoints
    - Automatically handles authentication tokens
    - Includes sample request bodies for each endpoint

2. **API Testing Guide** (`API_TESTING_GUIDE.md`)

    - Detailed instructions on how to use the Postman collection
    - Explains testing flow and troubleshooting

3. **Command-Line Test Script** (`test_api.sh`)
    - Bash script for quickly testing API endpoints from the terminal
    - Interactive menu for selecting test suites
    - Requirements: `curl` and `jq` for JSON formatting

## Quick Start

### Using Postman

1. Import the `postman_collection.json` file into Postman
2. Make sure your backend server is running (usually on `http://localhost:5000`)
3. Start with the Authentication endpoints to register and login
4. Follow the testing flow described in the API Testing Guide

### Using Command-Line Script

1. Make sure your backend server is running
2. Make the script executable if needed: `chmod +x test_api.sh`
3. Run the script: `./test_api.sh`
4. Follow the interactive menu to select test suites

## Recommended Testing Flow

1. Test Authentication (register, login, get user profile)
2. Test Products (get all, get by ID, create, update)
3. Test Categories (similar to products)
4. Test Orders (create, get all, get by ID)

## Notes

-   The test script automatically extracts and stores authentication tokens
-   Some endpoints require authentication (the script/collection handles this for you)
-   When using Postman, make sure to run the Login request before testing authenticated endpoints
-   For more details, see the API Testing Guide
