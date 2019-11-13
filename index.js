const express = require('express');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const expressWs = require('express-ws');
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

expressWs(app);
app.ws('/conn2', require('./routes/conn2'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Node app is running on port:', port);
});