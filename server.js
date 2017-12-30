/**
 * SERVER.JS
 * AUTHOR: RAYMOND JOHN HILL
 */

'use strict';
console.time('boot time');

const app = require('express')();
const express = require('express');
const dateFormat = require('dateformat');
const bodyParser = require('body-parser');
const compression = require('compression');


//Support for large encoded bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//Support for large json bodies
app.use(bodyParser.json({ limit: '50mb' }));

//Begin using compression (standard gzip)
app.use(compression());



//BEGIN STATIC ROUTES

app.use('/info', express.static('static/info'));

//END STATIC ROUTES



app.use((req, res, next) => {
    if(req.url === '/favicon.ico') {
        //Return favicon stuff here, if it's requested.
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        return res.end();
    }

    //if we have any initial setup it can go here.
});

app.listen(8080, () => {
    console.timeEnd('boot time');

    let now = new Date();
    dateFormat.masks.serverTime = "mm/dd/yy hh:MM:ss TT";
    console.log('(%s) Listening on %s:%s', dateFormat(now, "serverTime"), (process.env.HOST || 'localhost'), (process.env.PORT || '8080'));
});
