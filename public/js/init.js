  var MQTTWS_BROKER = "192.168.100.9"; // IP Broker MQTT/Websocket
  var WS_PORT = 80; // Puerto del WebSocket
  var MQTT = new Paho.MQTT.Client(MQTTWS_BROKER, WS_PORT,"Domoty-"+ new Date().getTime()); // Instanciar Cliente MQTT
  
  MQTT.onConnectionLost = function (responseObject) {
    console.log("Status: " + responseObject.errorMessage);
  };

  MQTT.onMessageArrived = function (message) {
    console.log(message.destinationName, ' -- ', message.payloadString);
  };

  var options = {
    timeout: 3,
    onSuccess: function () {
      console.log("Se estableció conexión con el Broker MQTT");
      MQTT.subscribe('domoy/rele', {qos: 1}); // Suscribirse al tópico domoty/rele
    },
    onFailure: function (message) {
      console.log("Conexión Fallida: " + message.errorMessage);
    }
  };

  function init() {
    MQTT.connect(options); // Conectar con Broker MQTT
  }

  $(document).ready(function(){

    $('#btn-on').click(function(){ // Evento: Activar dispositivo
      message = new Paho.MQTT.Message("1"); // Crea un nuevo mensaje
      message.destinationName = "domoty/esp8266"; // Define el tópico 
      MQTT.send(message); // Envia mensaje
    });

    $('#btn-off').click(function(){ // Evento: desactivar dispositivo
      message = new Paho.MQTT.Message("0"); // Crea un nuevo mensaje
      message.destinationName = "domoty/esp8266"; // Define un tópico a ser enviado domoty/rele
      MQTT.send(message); // Envia mensaje
    });

  });

  init();