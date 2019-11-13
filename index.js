const express = require('express');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*',
}));

app.use(
    '/search',
    proxy({ 
      target: 'https://www.google.com.hk', 
      changeOrigin: true,
    })
);

const tgPath = '/apiw1';
app.use(
    `${tgPath}/:name`,
    proxy({
        target: 'https://venus.web.telegram.org',
        changeOrigin: true,
        router: (req) => {
            const name = req.path.replace(`${tgPath}/`, '');
            return `https://${name}.web.telegram.org`;
        },
        pathRewrite: (path, req) => {
            return tgPath;
        },
        onError: (err, req, res) => {
            console.error(`tg ${req.path} error`);
        },
    }),
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Node app is running on port:', port);
});