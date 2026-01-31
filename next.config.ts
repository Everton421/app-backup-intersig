import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*', // Rota que você vai usar no seu frontend
        destination: 'http://localhost:3333/:path*', // Seu backend HTTP
      },
    ];
  },
};
export default nextConfig;
