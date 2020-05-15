const axios = require("axios");
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

// Make a request for a user with a given ID

function getWeather() {

    axios
        .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=45.566669&lon=5.93333&exclude=%7Bpart%7D&appid=737999fa3e305ea2c2184c05d9953760`
        )
        .then(function (response) {
            // handle success
            client.publish('campusnum/jardin/weather', response.data.daily[1].weather[0].main);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
};

getWeather();