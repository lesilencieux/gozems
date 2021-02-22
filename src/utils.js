function getCountryByCoordinate(lat, lng, cb) {
    var geocoding = new require('reverse-geocoding-google');
    var result = 'null'
    var params = {
        'latitude': lat,
        'longitude': lng,
        'key': process.env.API_KEY
    };
    geocoding.location(params, function (err, data) {
        if (err) {
            console.log(err);
            return cb(null, err);
        } else {
            const address_components = data.results[0].address_components;
            r = address_components[address_components.length - 1].long_name;
            result = r;
            return cb(result);
        }

    });
}

function getTimeZoneInfoUsingCoordinates(lat, lng, cb) {
    var result = 'null'
    var timezone = require('node-google-timezone');
    var timestamp = Date.now() / 1000;
    timezone.key(process.env.API_KEY);
    timezone.data(lat, lng, timestamp, function (err, tz) {
        if (err) {
            console.log(err);
            return cb(err);
        } else {
            var d = new Date(tz.local_timestamp * 1000);
            var utc = '';
            utcValue = (tz.raw_response.rawOffset / 3600);
            if (utcValue < 0) {
                utc = 'GMT-' + (-utcValue - 1)
            } else {
                utc = 'GMT+' + (utcValue - 1)
            }
            r = { 'utc': utc, 'heure': d.getUTCHours() };
            result = r;
            return cb(result);
        }

    });
}

function calculteDistanceBetweenTwoCoordonates(origin, dest, units, cb) {
    var result = 'null';
    var distance = require('google-distance-matrix');
    var origins = [origin];
    var destinations = [dest];
    distance.key(process.env.API_KEY)
    distance.units(units)

    distance.matrix(origins, destinations, function (err, distances) {
        if (err) {
            console.log(err);
            return cb(err);
        } else if(distances.rows[0].elements[0].status=="ZERO_RESULTS") {
            console.log(distances.rows[0].elements[0]);
            // S = Math.acos(Math.sin(latA)*Math.sin(latB) + Math.cos(latA)*Math.cos(latB)*Math.cos(abs(longB-longA)))
            var S = Math.acos(Math.sin(origin[0])*Math.sin(dest[0]) + Math.cos(origin[0])*Math.cos(dest[0])*Math.cos(Math.abs(dest[1]-origin[1])));
            super_distance = S*6378137;
            var res =  Math.round(super_distance,100);
            return cb(res/1000+" Km");
        }
        else{
            result = distances.rows[0].elements[0].distance.text;
            return cb(result);
        }

    })
}

// final function
const finalResult= (req, res)=> {
    start = req.body.start
    end = req.body.end
    getCountryByCoordinate(start.lat, start.lng, function (startCountry) {
        getCountryByCoordinate(end.lat, end.lng, function (endCountry) {
            getTimeZoneInfoUsingCoordinates(start.lat, start.lng, function (startTz) {
                getTimeZoneInfoUsingCoordinates(end.lat, end.lng, function (endTz) {
                    origins = [start.lat, start.lng]
                    dest = [end.lat, end.lng]
                    calculteDistanceBetweenTwoCoordonates(origins, dest, req.body.units, function (distance) {
                        result_start = { "country": startCountry, "timezone": startTz.utc, "location": { "lat": start.lat, "lng": start.lng } }
                        result_end = { "country": endCountry, "timezone": endTz.utc, "location": { "lat": end.lat, "lng": end.lng } }
                        result_distance = { "value": distance.split('km')[0], "units": "km" }
                        result_timedif = { "value": Math.abs(endTz.heure - startTz.heure), "units": "hours" }
                        result = { "start": result_start, "end": result_end, "distance": result_distance, "time_diff": result_timedif }
                        res.send(result)
                    });

                })
            })
        })
    })
}

module.exports = finalResult;
