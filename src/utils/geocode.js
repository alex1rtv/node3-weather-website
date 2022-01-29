
const request = require('request');

// ----------------------------------------------- //

const geocode = (address, callback) => {
    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWxleDFydHYiLCJhIjoiY2t5cHR0OGpkMGRqbDJ1bzE4N2t4azU5ciJ9.HQHOA3XKOUe3eXHIHlCunw#downloadJSON=true`;

    request({ url }, (error, response) => {
        if (error) {
            callback("Cannot connect to weather service", undefined);
        } else if (JSON.parse(response.body).message) {
            callback("Error: " + JSON.parse(response.body).message, undefined);
        } else {
          const data = JSON.parse(response.body);
          console.log("*******************************");
          console.log(data);
          console.log("*******************************");

          if (data.features.length == 0 || data.query.length == 0) {
            callback("Error address", undefined);
          } 
          else {
            callback(undefined, {
              longitude: data.features[0].center[0],
              latitude: data.features[0].center[1],
              location: data.features[0].place_name
            });
          }          
        }            
      });
};

module.exports = geocode;