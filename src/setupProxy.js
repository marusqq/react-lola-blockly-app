const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/compile_lola',
    createProxyMiddleware({
      // 👇️ make sure to update your target
      target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );
};

