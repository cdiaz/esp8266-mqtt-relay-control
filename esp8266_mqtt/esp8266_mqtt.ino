#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// WIFI parameters 
const char* SSID = "YOUR_SSID";
const char* PASSWORD = "YOUR_SSID_PASSWORD";

// MQTT Config
const char* BROKER_MQTT = "BROKER_IP_SERVER"; // MQTT Broker IP 
int BROKER_PORT = 1883;
WiFiClient espClient;
PubSubClient MQTT(espClient); // Instanciar Cliente MQTT

void setup() {
  initPins();
  initSerial();
  initWiFi();
  initMQTT();
}

void initPins() {
  pinMode(2, OUTPUT);
  digitalWrite(2, 0);
}

void initSerial() {
  Serial.begin(115200);
}

void initWiFi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting: ");
  Serial.println(SSID);

  WiFi.begin(SSID, PASSWORD); // Wifi Connect
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print(SSID);
  Serial.println(" | IP ");
  Serial.println(WiFi.localIP());
}

// MQTT Broker connection
void initMQTT() {
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  MQTT.setCallback(mqtt_callback);
}

// Receive messages
void mqtt_callback(char* topic, byte* payload, unsigned int length) {

  String message;
  for (int i = 0; i < length; i++) {
    char c = (char)payload[i];
    message += c;
  }
  Serial.print("Topic ");
  Serial.print(topic);
  Serial.print(" | ");
  Serial.println(message);

  if (message == "1") {
    digitalWrite(2, 1);
    } else {
      digitalWrite(2, 0);
    }
    message = "";
    Serial.println();
    Serial.flush();
  }

  void reconnectMQTT() {
    while (!MQTT.connected()) {
      Serial.print("Intentando conectar con Broker MQTT: ");
      Serial.println(BROKER_MQTT);
      if (MQTT.connect("ESP8266")) {
        Serial.println("Conectado");
      MQTT.subscribe("domoty/esp8266"); // Asigna el tópico domoty/esp8266, obs: este mismo será usado para la comunicación con el frontend
      } else {
        Serial.println("Conexión fallida");
        Serial.println("Intentando reconectar en 2 segundos");
        delay(2000);
      }
    }
  }

  void recconectWiFi() {
    while (WiFi.status() != WL_CONNECTED) {
      delay(100);
      Serial.print(".");
    }
  }

  void loop() {
    if (!MQTT.connected()) {
    reconnectMQTT(); // Retry Worker MQTT Server connection
  }
  recconectWiFi(); // Retry WiFi Network connection
  MQTT.loop();
}
