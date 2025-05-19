# Mini E-Commerce Deployment Guide

This guide explains how to deploy both the frontend and backend of the Mini E-Commerce application.

## Deployment Services (Free Tier)

-   **Backend**: [Render](https://render.com/) (Web Service)
-   **Database**: [Railway](https://railway.app/) (MySQL)
-   **Frontend**: [Vercel](https://vercel.com/) (Next.js)

## Database Setup (Railway)

1. **Create a Railway account**:

    - Sign up at [railway.app](https://railway.app/)
    - You'll get $5 of free credit each month

2. **Create a MySQL database**:

    - Go to your Railway dashboard
    - Click "New Project" → "Database" → "MySQL"
    - Wait for your database to be provisioned

3. **Get your database credentials**:
    - Click on your MySQL database in the dashboard
    - Go to "Connect" tab
    - You'll find your MySQL connection string
    - Note the following values:
        - Host
        - Port
        - Database name
        - Username
        - Password

## Backend Deployment (Render)

1. **Create a Render account**:

    - Sign up at [render.com](https://render.com/)

2. **Deploy via GitHub**:

    - Push your code to a GitHub repository
    - In Render Dashboard, click "New" → "Web Service"
    - Connect your GitHub repo
    - Configure the service:
        - Name: `mini-e-commerce-api`
        - Environment: `Node`
        - Build Command: `npm install`
        - Start Command: `npm start`

3. **Set environment variables**:

    - NODE_ENV: `production`
    - PORT: `10000` (or let Render assign one)
    - DB_HOST: [Your Railway MySQL host]
    - DB_NAME: `railway` (or your custom database name)
    - DB_USER: [Your Railway MySQL username]
    - DB_PASSWORD: [Your Railway MySQL password]
    - DB_PORT: `3306` (or your MySQL port)
    - JWT_SECRET: [Generate a secure random string]

4. **Deploy your service**
    - Click "Create Web Service"
    - Wait for the deployment to complete
    - Note your service URL (e.g., `https://mini-e-commerce-api.onrender.com`)

## Frontend Deployment (Vercel)

1. **Create a Vercel account**:

    - Sign up at [vercel.com](https://vercel.com/)

2. **Deploy via GitHub**:

    - Make sure your code is in a GitHub repository
    - In Vercel Dashboard, click "Add New" → "Project"
    - Import your repository
    - Configure the project:
        - Framework Preset: "Next.js"

3. **Set environment variables**:

    - NEXT_PUBLIC_API_URL: [Your backend URL with /api] (e.g., `https://mini-e-commerce-api.onrender.com/api`)

4. **Deploy your project**:
    - Click "Deploy"
    - Wait for deployment to complete
    - Vercel will give you a domain for your app (e.g., `https://mini-e-commerce.vercel.app`)

## Update CORS Configuration

After deployment, update your backend CORS configuration to allow requests from your Vercel frontend domain:

1. Go to your Render dashboard
2. Go to the mini-e-commerce-api service
3. Go to Environment Variables
4. Add/update ALLOWED_ORIGINS to include your Vercel domain

## Testing the Deployment

1. Visit your Vercel frontend URL
2. Try to register and log in
3. Test the e-commerce functionality
