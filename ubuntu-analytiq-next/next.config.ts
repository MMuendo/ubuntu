import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Enable static exports for maximum SEO (optional - can use server if needed)
  // output: 'export',

  // Strict mode for better error catching
  reactStrictMode: true,

  // Trailing slash consistency for SEO
  trailingSlash: false,
};

export default nextConfig;
