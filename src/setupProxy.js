const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/kugou', {
            target: 'http://m.kugou.com/',
            changeOrigin: true,
            pathRewrite: {
              '^/kugou': ''
            }
        })
    );
}