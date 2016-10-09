# Relay Control via Web UI using MQTT protocol over WiFi-ESP8266 module

Requirements:

* ESP8266 Module
* [Arduino core for ESP8266](https://github.com/esp8266/Arduino) (version 2.2.0 minimum)
* Basic knowledge of the Arduino environment (upload a sketch, import libraries, ...)

## Run MQTT Server:

### Docker mode:
```bash
make run
```

## Prepare ESP8266 Module:

### Install Arduino Client for MQTT

1. Download [PubSubClient](https://github.com/knolleary/pubsubclient/archive/v2.6.zip) library
2. Load the `.zip` with **Sketch → Include Library → Add .ZIP Library**

### Load Sketch

1. Open [esp8266_mqtt.ino](https://github.com/cdiaz/Wifi-relay-switch/blob/master/esp8266_mqtt/esp8266_mqtt.ino), change BROKER_IP_SERVER at line 11 and upload

### Access to Web UI

Navigate to http://localhost
