/**
 * SERVICES.JS
 * AUTHOR: RAYMOND JOHN HILL
 */

'use strict';
const request = require('request');
const googleKey = process.env.google_key;

/**
 * geocodeAddress
 * Geocodes an address using google's geocoder.
 * Params:
 *      address: (string) the address to geocode
 */
const geocodeAddress = function(address) {
    return new Promise((resolve, reject) => {
        let encodedAddress = address.replace(/\s+/ig,'+');
        let requestURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleKey}`;

        request.get(requestURL, (err, res, body) => {
            if(err != null) { return reject(err); }
            if((res && res.statusCode) !== 200) { return reject('yikes'); }

            //if the body fails to parse, we have zero results, so we mimic the google response
            let parsedBody = JSON.parse(body) || { results: [], status: 'ZERO_RESULTS' };
            let results = parsedBody.results.length >= 1 ? parsedBody.results[0].geometry : parsedBody;

            return resolve(results);
        });
    });
};

/**
 * reverseGeocode
 * Reverse geocodes a lat/lng using google's reverse geocoder.
 * Params:
 *      latLng: (string) the lat/lng to reverse geocode
 */
const reverseGeocode = function(latLng) {
    return new Promise((resolve, reject) => {
        let encodedLatLng = latLng.replace(/\s+/ig,'+');
        let requestURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodedLatLng}&key=${googleKey}`;

        request.get(requestURL, (err, res, body) => {
            if(err != null) { return reject(err); }
            if((res && res.statusCode) !== 200) { return reject('yikes'); }

            //if the body fails to parse, we have zero results, so we mimic the google response
            let parsedBody = JSON.parse(body) || { results: [], status: 'ZERO_RESULTS' };
            let results = parsedBody;

            if(parsedBody.results.length >= 1) {
                let firstResult = parsedBody.results[0];
                results =  {
                    address_components: firstResult.address_components,
                    formatted_address: firstResult.formatted_address,
                    viewport: firstResult.geometry.viewport
                };
            }

            return resolve(results);
        });
    });
};


/**
 * SERVICES.JS EXPORTS
 */
module.exports = {
    geocodeAddress: geocodeAddress,
    reverseGeocode: reverseGeocode
};
