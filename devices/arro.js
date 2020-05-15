const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

var temperature = 30; // La valeur de la température ambiante
var donneesCapt = 31; // La valeur renvoyé du capteur d'humidité
var meteo = false; // False = SOLEIL, true = PLUIE
var caArrose = true; // false = PAS arrose, true = arrose

client.on("connect", () => {
    client.subscribe("campusnum/jardin/weather");
    client.subscribe("campusnum/jardin/hum");
});

client.on("message", function (topic, msg) {
    switch (topic) {
        case "campusnum/jardin/weather":
            if (msg != "rain") {
                meteo = false;
            } else meteo = true;
            jardinClean();
            break;
        case "campusnum/jardin/hum":
            donneesCapt = msg;
            jardinClean();
            break;
        default:
            break;
    }
});
// ---- function principal arrosage du jardin ----//

function jardinClean() {
    if (meteo) {
        // Si il pleut, pas besoin d'arroser
        console.log("Il pleut, pas besoin d'arroser");
        client.publish("campusnum/jardin/arro", '0');
    } else if (donneesCapt <= 30) {
        client.publish("campusnum/jardin/arro", '1');
        console.log(caArrose);
    }

    // Si il pleut pas, prend en compte les données du capteur, puis arrose en conséquence
}

