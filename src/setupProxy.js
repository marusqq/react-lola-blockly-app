const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/lola-to-verilog',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        }),
    );
    app.use(
        '/validate-lola',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        }),
    );
    app.use(
        '/ask-chat-gpt-lola',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        }),
    );
};

