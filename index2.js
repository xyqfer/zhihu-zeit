'use strict';

const express = require('express');
const app = express();
require('express-ws')(app);


app.get('/', function (req, res, next) {
    res.end('Just try connecting to wss://ws.now.sh');
});

app.ws('/abc', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
        ws.send(msg + ' abc');
    });
    console.log('socket');
});

app.listen(process.env.PORT || 3000);