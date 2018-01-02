/**
 * SERVICES.JS
 * AUTHOR: RAYMOND JOHN HILL
 */

'use strict';
const router = require('express').Router();


/**
 * @api {get} /geocode/ Request Geocoding of Address
 * @apiName GeocodeAddress
 * @apiGroup Services
 *
 * @apiParam {String} address The address to geocode.
 *
 * @apiSuccess {Object} location  The location of the address in lat/lng.
 * @apiSuccess {String} location_type  Where the lat/lng is actually located, in reference to the structure at the same location.
 * @apiSuccess {Object} viewport  The viewport (or envelope) that contains the lat/lng (useful for zoom to fit).
 * @apiSuccess {Object} bounds  The bounding box (or envelope) that contains the lat/lng (useful for zoom to fit).
 */
router.get('/geocode', (req, res, next) => {
    let geocoder = require('./geocoder.js');
    let params = req.query.address;

    geocoder.geocodeAddress(params)
    .then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(results);
        return next();
    })
    .catch((err) => {
        return next(err);
    });
});


/**
 * @api {get} /reverseGeocode Request Reverse Geocoding of Latitude and Longitude
 * @apiName ReverseGeocode
 * @apiGroup Services
 *
 * @apiParam {String} latlng The latitude and longitude to reverse geocode.
 *
 * @apiSuccess {Object} address_components  All of the components of the address, both long and short versions.
 * @apiSuccess {String} formatted_address  The actual address in a human-readable format.
 * @apiSuccess {Object} viewport  The viewport (or envelope) that contains the lat/lng (useful for zoom to fit).
 */
router.get('/reverseGeocode', (req, res, next) => {
    let geocoder = require('./geocoder.js');
    let params = req.query.latlng;

    geocoder.reverseGeocode(params)
    .then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(results);
        return next();
    })
    .catch((err) => {
        return next(err);
    });
});


/**
 * SERVICES.JS EXPORTS
 */
module.exports = router;
