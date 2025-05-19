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
    // Enable full static site generation if needed
    // trailingSlash: true,
};

export default nextConfig;
