/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      '72.60.180.196',
      'speakclubingerman.com',
    ],
  },
 experimental: {
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: {
          subsets: ['latin'],
          display: 'swap',
          fetchTimeout: 20000, // таймаут 20 сек
        },
      },
    ],
  },

  // інші налаштування...
};

module.exports = nextConfig;
