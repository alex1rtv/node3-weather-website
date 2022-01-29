console.log('Client side javascript file is loaded');

/*
fetch('https://puzzle.mead.io/puzzle')
.then((response) => {
    response.json()
    .then((data) => {
        console.log(data);
    })
});
*/

/*
    Note that despite the method being named json(), 
    the result is not JSON but is instead the result of taking JSON as input 
    and parsing it to produce a JavaScript object.
*/

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOK = document.querySelector('#messageOK');
const messageError = document.querySelector('#messageError');

messageOK.textContent = '';
messageError.textContent = 'Loading...';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    //console.log(location);

    fetch(`/weather?address=${location}`)
    .then((response) => { 
        response.json()
        .then((data) => {
            if (data.error) {
                console.log(data.error);
                messageError.textContent = data.error;
            }
            else {
                console.log(data.location);
                console.log(data.forecast);
                messageError.textContent = "Location: " + data.location; 
                messageOK.textContent = "Forecast: " + data.forecast;
            }
        });
    })
});