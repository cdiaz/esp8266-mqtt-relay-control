var mosca = require('mosca');
var settings = {
  port: 1883, // puerto MQTT
  http: { // Servidor de WebSockets
    port: 80, // Puerto del Socket
    bundle: true,
    static: './public'
  }
}
var MQTT_SERVER = new mosca.Server(settings); // Crea un Broker MQTT
MQTT_SERVER.on('clientConnected',function(cliente){ // Evento: ocurre cuando un nuevo cliente se conecta al broker
  console.log('Cliente Conectado',cliente.id); // Muestra el ID del cliente conectado
});
MQTT_SERVER.on('publicado',function(packet,client){ //  Evento: Ocurre cuando un mensaje es publicado
  console.log("Tópico: ", packet.topic, " | ", new Date().toISOString()); // Muestra el mensaje recibido
});
MQTT_SERVER.on('ready', setup); // Inicia el Broker
function setup(){
  console.log('Start MQTT/WebSockets Broker \\{^_^}/');
}