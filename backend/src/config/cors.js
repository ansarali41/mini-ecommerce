// CORS Configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Define allowed origins - add your production frontend URL here when you deploy
        const allowedOrigins = [
            'http://localhost:3000', // Local development frontend
            'https://localhost:3000', // Local development frontend with HTTPS
            'https://mini-e-commerce.vercel.app', // Example production frontend on Vercel
            'https://mini-e-commerce.netlify.app', // Example production frontend on Netlify
        ];

        // Allow requests with no origin (like mobile apps, curl requests, etc)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

module.exports = corsOptions;
