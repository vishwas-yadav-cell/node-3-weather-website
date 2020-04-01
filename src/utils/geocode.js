const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmlzaHdhc3lhZGF2IiwiYSI6ImNrOGNwbHRydTBnaTAzbm5ycmM2NmNiaWcifQ.sEHPEErqKfLiJo1c26fZBw&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unalble to connect to a network', undefined);
        } else if (body.features.length === 0) {
            callback('unable to find the location', undefined);
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
            })
        }
    })
}

module.exports = geocode