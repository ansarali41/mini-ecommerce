/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/:path*',
            },
        ];
    },
    // Improve output for deployments
    output: 'standalone',
    // Enable trailing slashes for better compatibility with Netlify
    trailingSlash: true,
    // Ensure output directory is properly handled
    distDir: '.next',
};

export default nextConfig;
