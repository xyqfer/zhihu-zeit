const proxy = require('http-proxy-middleware');

module.exports = proxy({ 
    target: 'https://www.zhihu.com', 
    changeOrigin: true,
    onProxyRes: (proxyRes, req, res) => {
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