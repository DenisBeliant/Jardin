const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

function getHum() {
    client.publish('campusnum/jardin/hum', Math.floor(Math.random() * 100).toString());
    setInterval(() => {
        getHum(); 
      }, Math.floor(Math.random() * 30) * 10000);
};

getHum();