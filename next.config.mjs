
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pub-8ba990c9e955c83e9a95f3b8d19deb3e.r2.dev',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
};

export default nextConfig;
