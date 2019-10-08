const express = require('express');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*',
}));

app.use(
    '/',
    proxy({ 
        target: 'https://web.telegram.org',
        selfHandleResponse : true,
        changeOrigin: true,
        onProxyRes: (proxyRes, req, res) => {
            let body = [];
            proxyRes.on('data', function (chunk) {
                body.push(chunk);
            });
            proxyRes.on('end', function () {
                body = Buffer.concat(body).toString('utf8');

                const HEAD_START_LABEL = '<head>';
                const injectData = `
                    <script>
                        !function(t){function n(e){if(r[e])return r[e].exports;var i=r[e]={exports:{},id:e,loaded:!1};return t[e].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){r(1)(window)},function(t,n){t.exports=function(t){var n="RealXMLHttpRequest";t.hookAjax=function(t){function r(n){return function(){var r=this.hasOwnProperty(n+"_")?this[n+"_"]:this.xhr[n],e=(t[n]||{}).getter;return e&&e(r,this)||r}}function e(n){return function(r){var e=this.xhr,i=this,o=t[n];if("function"==typeof o)e[n]=function(){t[n](i)||r.apply(e,arguments)};else{var u=(o||{}).setter;r=u&&u(r,i)||r;try{e[n]=r}catch(t){this[n+"_"]=r}}}}function i(n){return function(){var r=[].slice.call(arguments);if(!t[n]||!t[n].call(this,r,this.xhr))return this.xhr[n].apply(this.xhr,r)}}return window[n]=window[n]||XMLHttpRequest,XMLHttpRequest=function(){var t=new window[n];for(var o in t){var u="";try{u=typeof t[o]}catch(t){}"function"===u?this[o]=i(o):Object.defineProperty(this,o,{get:r(o),set:e(o),enumerable:!0})}this.xhr=t},window[n]},t.unHookAjax=function(){window[n]&&(XMLHttpRequest=window[n]),window[n]=void 0},t.default=t}}]);
                    </script>
                    <script>
                        (() => {
                            hookAjax({
                                open: function(arg, xhr) {
                                    console.log(xhr);
                                    console.log("open called: method:%s,url:%s,async:%s",arg[0],arg[1],arg[2])
                                }
                            });
                        })();
                    </script>
                `;
                const beforeHeadStarts = body.indexOf(HEAD_START_LABEL) + HEAD_START_LABEL.length;
                body = body.slice(0, beforeHeadStarts) + injectData + body.slice(beforeHeadStarts);
                res.send(body);
            });
        },
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