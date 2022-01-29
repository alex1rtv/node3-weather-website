const request = require('request');

// ------------------------------------------------------ //

const weather = ({latitude, longitude}, callback) => {
    let url = `http://api.weatherstack.com/current?access_key=84e65ea799790b835bfec815c2cdfc5d&query=${latitude},${longitude}`;

    request({ url }, (error, response) => {
        if (error) {
        callback("Cannot connect to weather service", undefined);
        } else if (response.body.error) {
            callback("Please specify a valid location identifier using the query parameter", undefined);
        } else {
            const data = JSON.parse(response.body);
            console.log('-----------------------------------------------');
            console.log(data);
            console.log('-----------------------------------------------');
            callback(undefined, {
                temperature: data.current.temperature,
                precip: data.current.precip
            });
        }
    });
};

module.exports = weather;

/*
Response: data


-----------------------------------------------
{
  request: {
    type: 'LatLon',
    query: 'Lat 32.09 and Lon 34.78',
    language: 'en',
    unit: 'm'
  },
  location: {
    name: 'Sumayl',
    country: 'Israel',
    region: 'Tel Aviv',
    lat: '32.083',
    lon: '34.783',
    timezone_id: 'Asia/Jerusalem',
    localtime: '2022-01-28 14:11',
    localtime_epoch: 1643379060,
    utc_offset: '2.0'
  },
  current: {
    observation_time: '12:11 PM',
    temperature: 11,
    weather_code: 302,
    weather_icons: [
      'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0018_cloudy_with_heavy_rain.png'
    ],
    weather_descriptions: [ 'Rain' ],
    wind_speed: 19,
    wind_degree: 180,
    wind_dir: 'S',
    pressure: 1022,
    precip: 0.3,
    humidity: 87,
    cloudcover: 75,
    feelslike: 8,
    uv_index: 3,
    visibility: 8,
    is_day: 'yes'
  }
}
-----------------------------------------------
*/