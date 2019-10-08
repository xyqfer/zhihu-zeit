const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

app.get('/', (req, res) => {
    res.send('this is home page');
});

app.use(
    '/question',
    proxy({ 
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
    })
);

const port = 3000;
app.listen(port, () => {
    console.log('Node app is running on port:', port);
});