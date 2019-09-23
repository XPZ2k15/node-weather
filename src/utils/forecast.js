const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f06299e93bd24e2e90006f924bf634fd/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Cannot connect to location services.', undefined)
        } else if (body.error) {
            callback('You have entered an invalid location.', undefined)
        } else {
            callback(undefined,
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + "% chance of rain."
            )
        }
    })
}

module.exports = forecast