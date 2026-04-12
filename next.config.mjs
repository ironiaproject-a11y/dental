/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress responses with gzip
  compress: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000, // 1 year cache
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Strict mode for better performance
  reactStrictMode: true,

  // Experimental: faster builds and smaller bundles
  experimental: {
    optimizePackageImports: ['react-icons', 'gsap'],
  },
};

export default nextConfig;
