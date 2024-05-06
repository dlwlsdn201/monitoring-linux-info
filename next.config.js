/** @type {import('next').NextConfig} */

// const path = require('path');
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Production Mode 에서는 react -> preact 로 교체
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
    // config.resolve.alias = {
    //   '@app': path.resolve(__dirname, 'app'),
    //   '@api': path.resolve(__dirname, 'app/api'),
    //   '@shared': path.resolve(__dirname, 'app/shared'),
    //   '@styles': path.resolve(__dirname, 'styles'),
    //   '@@types': path.resolve(__dirname, 'types'),
    // };
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};
// const withPreact = require("next-plugin-preact");
module.exports = nextConfig;
