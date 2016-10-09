var mosca = require('mosca');

var settings = {
  port: 1883, // MQTT Port
  http: {
    port: 80, // WS Port
    bundle: true,
    static: './public'
  }
}

var MQTT_SERVER = new mosca.Server(settings); // Instanciate MQTT Server
 MQTT_SERVER.on('clientConnected',function(cliente){ // Receive client connection
  console.log('Cliente Conectado',cliente.id); // Show Id client conected
});

MQTT_SERVER.on('Publish',function(packet,client){ // Publish message
  console.log("Topic: ", packet.topic, " | ", new Date().toISOString()); // Show message
});

MQTT_SERVER.on('ready', setup); // Start Broker
function setup(){
  console.log('Start MQTT/WebSockets Broker \\{^_^}/');
}