/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  // Keep mysql2 server-side only – prevents webpack from trying to
  // bundle node:diagnostics_channel and other Node built-ins.
  serverExternalPackages: ["mysql2"],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        util: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        diagnostics_channel: false,
      };
    }
    return config;
  },
  serverActions: {
    allowedOrigins: ['13.212.233.207:3000', 'localhost:3000']
  }
};

module.exports = nextConfig;
