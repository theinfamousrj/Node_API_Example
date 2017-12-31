/**
 * SERVER.JS
 * AUTHOR: RAYMOND JOHN HILL
 */

'use strict';
console.time('boot time');

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'http://127.0.0.1';

const app = require('express')();
const express = require('express');
const dateFormat = require('dateformat');
const bodyParser = require('body-parser');
const compression = require('compression');


//Ensure that we catch everything, just in case.
process.on('unhandledRejection', (error) => {
    console.error(error);
});


//Support for large encoded bodies
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//Support for large json bodies
app.use(bodyParser.json({ limit: '10mb' }));

//Begin using compression (standard gzip)
app.use(compression());


//BEGIN STATIC ROUTES
app.use('/info', express.static('static/info'));

app.use('/images', express.static('static/images'));

app.use('/documentation', express.static('static/documentation'));
//END STATIC ROUTES


//BEGIN NON-STATIC ROUTES
app.use('/status', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).send({
        status: 'LIVE'
    });
});

app.use('/version', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');

    let fs = require('fs');
    let obj = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    return res.status(200).send({
        version: obj.version || '1.0.0'
    });
});
//END NON-STATIC ROUTES



app.listen(port, () => {
    console.timeEnd('boot time');

    let now = new Date();
    dateFormat.masks.serverTime = "mm/dd/yy hh:MM:ss TT";
    console.log('(%s) Listening on %s:%s', dateFormat(now, "serverTime"), host, port);
});
