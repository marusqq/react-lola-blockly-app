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
        '/lola-to-c',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        }),
    );
    app.use(
        '/lola-to-vhdl',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        }),
    );
    app.use(
        '/lola-to-system-c',
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
    app.use(
        '/ask-chat-gpt-lola',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        }),
    );
    app.use(
        '/generate-verilog-testbench',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        }),
    );
    app.use(
        '/stimulate-verilog',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        }),
    );
};

