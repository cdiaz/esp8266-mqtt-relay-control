  var MQTTWS_BROKER = "127.0.0.1"; // IP del Broker MQTT
  var WS_PORT = 80; // Puerto del WebSocket
  var MQTT = new Paho.MQTT.Client(MQTTWS_BROKER, WS_PORT,"Domoty-"+ new Date().getTime()); // Create MQTT client
  
  MQTT.onConnectionLost = function (responseObject) {
    console.log("Status: " + responseObject.errorMessage);
  };

  MQTT.onMessageArrived = function (message) {
    console.log(message.destinationName, ' -- ', message.payloadString);
  };

  function init() {
    MQTT.connect({ // MQTT Connect
        timeout: 3,
        onSuccess: function () {
          console.log("Connected to Broker MQTT");
          MQTT.subscribe('domoty/esp8266', {qos: 1}); // Subscribe to "domoty/esp8266" Topic
        },
        onFailure: function (message) {
          console.log("Fail connection: " + message.errorMessage);
        }
    })
  }

  $(document).ready(function(){

    $('#btn-on').click(function(){ // Event: Switch ON
      message = new Paho.MQTT.Message("1"); // Create Message
      message.destinationName = "domoty/esp8266"; // Destine message to the "domoty/esp8266" Topic
      MQTT.send(message); // Send Message
    });

    $('#btn-off').click(function(){ // Event: Switch OFF
      message = new Paho.MQTT.Message("0"); //Create Message
      message.destinationName = "domoty/esp8266"; // Destine message to the "domoty/esp8266" Topic
      MQTT.send(message); // Send Message
    });

  });

  init();