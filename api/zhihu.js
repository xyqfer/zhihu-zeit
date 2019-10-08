const proxy = require('http-proxy-middleware');

module.exports = proxy({
    target: 'https://www.zhihu.com', 
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: (path, req) => {
        const { question } = req.query;
        return `/question${question}`;
    },
    onProxyRes: (proxyRes, req, res) => {
        delete proxyRes.headers['content-security-policy'];
        proxyRes.on('data', (chunk) => {});
        proxyRes.on('end', () => {
            res.send('zhihuuuu');
            res.end(`
                <style>
                .Body--Mobile .RichContent--unescapable.is-collapsed .ContentItem-rightButton {
                    display: none !important;
                }
    
                .Body--Mobile .RichContent.is-collapsed .RichContent-inner {
                    max-height: initial !important;
                }
                </style>
            `);
        });
    },
});