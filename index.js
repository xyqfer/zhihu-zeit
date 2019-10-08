const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

app.use(
    '/',
    proxy({ 
        target: 'https://web.telegram.org', 
        changeOrigin: true,
    })
);

app.use(
    '/search',
    proxy({ 
      target: 'https://www.google.com.hk', 
      changeOrigin: true,
    })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Node app is running on port:', port);
});