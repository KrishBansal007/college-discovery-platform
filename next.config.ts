import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  allowedDevOrigins: ["172.20.10.2", "172.20.10.2:3000"],
};

export default nextConfig;
