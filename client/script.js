var app = require("express")();
var http = require("http").Server(app);
var socket = require("socket.io")(http);
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');
const express = require("express");
const path = require("path");

app.use("/", express.static(path.join(__dirname + "/")));
// app.use(express.static("client"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
http.listen(80, function () {
    console.log("listening on *:80");
});

client.on('connect', () => {
    client.subscribe('campusnum/jardin/#', () => {
        client.publish('campusnum/jardin', "MQTT connecté !");
    });
});

client.on('message', function(topic, msg) {
   switch(topic) {
       case 'campusnum/jardin/weather': socket.emit('weather', msg.toString()); break;
       case 'campusnum/jardin/hum': socket.emit('hum', msg.toString()); break;
       case 'campusnum/jardin/arro': socket.emit('arro', msg.toString()); break;
       default: break;
   }
})
