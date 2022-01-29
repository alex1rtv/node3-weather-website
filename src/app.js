const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { request } = require('http');
const { response } = require('express');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
 
const app = express();
const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(__filename);

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));

const viewsPath = path.join(__dirname, "../templates/views");
app.set('views', viewsPath);

const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.get('/', (request, response) => {
    response.render('index', {
        title: 'Weather',
        name: 'Gray Cat'
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About me',
        name: 'Gray Cat'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help page',
        message: "Helpful information",
        name: 'Gray Cat'
    });
});

// app.use makes the same operation:
// app.get("/", (request, response) => {
//     response.send("<h2>Welcome!</h2>");
// });

// app.get("/help", (request, response) => {
//     response.send({
//         name: "Bob",
//         age: 25
//     });
// });

// app.get("/about", (request, response) => {
//     response.send("<h2></h2>About this site</h2>");
// });

// app.get("/products", (request, response) => {
//     if (!request.query.search) {
//         return response.send({
//             error: 'You must provide a search term'
//         });
//     }
//     console.log(request.query);

//     response.send({
//         products: []
//     });
// });

app.get("/weather", (request, response) => {
    if (!request.query.address) {
        return response.send({
            error: 'You must provide an address term'
        });
    }

    geocode(request.query.address, (error, {longitude, latitude, location} = {}) => {
        if (!error) {
            console.log("\nResults:");
            console.log("Location: " + location);
            console.log("Longtitude: " + longitude);
            console.log("Latitude: " + latitude + "\n");

            weather({latitude, longitude}, (error, {temperature, precip: rainProb, weather_descriptions}) => {
                if (!error) {
                    console.log(`Weather descriptions: : ${weather_descriptions}`);
                    console.log(`Temperature: ${temperature} C`);
                    console.log(`Rain probability ${rainProb} %`);
                    response.send({
                        location,
                        forecast: `${weather_descriptions}. Temperature: ${temperature} C. Rain probability ${rainProb} %`
                    });
                }
                else {
                    console.log(error);
                    return response.send({ error });
                }
            });   
        }
        else {
            console.log(error);
            return response.send({ error });
        }
    });

    // response.send({
    //     forecast: "It is raining",
    //     location: "Tel Aviv",
    //     temperature: "15 C",
    //     "rain probability": "48%"
    // });
});

app.get('/help/*', (request, response) => {
    // response.send("Help article not found");
    response.render('404page', {
        title: '404', 
        message: 'Help article not found',
        name: 'Gray Cat'
    });
});

// error address
app.get('*', (request, response) => {
    // response.send("My 404 page");
    response.render('404page', { 
        title: '404',
        message: 'Page not found', 
        name: 'Gray Cat'});
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
