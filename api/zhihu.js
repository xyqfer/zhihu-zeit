const proxy = require('http-proxy-middleware');

module.exports = proxy({
    target: 'https://www.zhihu.com', 
    changeOrigin: true,
    pathRewrite: (path, req) => {
        console.log(path);
        const { question } = req.query;
        console.log(question);
        return '/question${question}';
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(proxyRes.headers)
      proxyRes.on('data', (chunk) => {});
      proxyRes.on('end', () => {
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