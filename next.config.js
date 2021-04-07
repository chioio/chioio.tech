const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

// Next config
module.exports = (phase, { defaultConfig }) => {
  return {
    distDir: 'build',
    env: {
      DOMAIN: 'chioio.tech',
    },
    assetPrefix: isProd ? 'https://chioio.tech' : '',
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/home',
        },
      ];
    },
  };
};
