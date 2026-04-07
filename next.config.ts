import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
  reactCompiler: true,
  webpack: (config) => {
    // Add support for .ts and .tsx files
    config.externals.push('@node-rs/bcrypt');
    return config;
  }
};

export default nextConfig;
