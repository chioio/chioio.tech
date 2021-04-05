module.exports = {
  distDir: 'build',
  env: {
    DOMAIN: 'chioio.tech',
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ];
  },
};
