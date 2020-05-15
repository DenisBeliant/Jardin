var app = require("express")();
var http = require("http").Server(app);
var socket = require("socket.io")(http);
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
socket.on("connect", function (jardin) {
  console.log("socket");
  jardin.on("data", function (msg) {
    console.log(msg);
    document.getElementById("temp").innerText = msg.temp;
    document.getElementById("hum").innerText = msg.hum;
  });
});

// const mqtt = require("mqtt");
// const client = mqtt.connect("ws://localhost:80");

// const express = require("express");
// const http = require("http").createServer(app);
// const app = express();
// const socket = require("socket.ios")(http);

// http.Server(app).listen(80, () => console.log("Lecture du port 80"));
// app.use("/", express.static(__dirname + "/../client"));
