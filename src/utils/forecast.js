const request = require('request');



const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/a607d2413359727efd887418dbec1f75/${lat},${long}?units=si`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect the network', undefined);
        } else if (body.error) {
            callback('unable to find the location', undefined);
        } else {
            callback(undefined, `Weather is ${body.currently.summary} and the current temprature is ${body.currently.temperature}° celcius.the wind speed is ${body.currently.windSpeed} , there will be ${body.currently.precipProbability}% chance of rain in`)
        }
    })
}

module.exports = forecast