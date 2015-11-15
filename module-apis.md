#Modules

* [Setup](#setup)
* [APIs](#apis)

##Setup
Tessel has four module ports, labeled A, B, C, and D.

<img width="400px" src="https://s3.amazonaws.com/technicalmachine-assets/fre+assets/tessel-ports.jpg">

Most modules can be plugged into any port. The exceptions are that BLE and Camera cannot be plugged into Port C (they depend on an as-yet unimplemented software UART)

Modules should be plugged in so that all of the electrical components are face up and all the hexagons are face down:
Face up:

<img src="https://s3.amazonaws.com/technicalmachine-assets/fre+assets/tessel-all-plugged-sm.jpg">

Face down:

<img src="https://s3.amazonaws.com/technicalmachine-assets/fre+assets/tessel-all-plugged-back-sm.jpg">

##APIs

Documentation for each of Tessel's modules can be found on the individual modules' pages:

* [Accelerometer](https://github.com/tessel/accel-mma84)
* [Ambient](https://github.com/tessel/ambient-attx4)
* [Audio](https://github.com/tessel/audio-vs1053b)
* [Bluetooth Low Energy](https://github.com/tessel/ble-ble113a)
* [Camera](https://github.com/tessel/camera-vc0706)
* [Climate](https://github.com/tessel/climate-si7020)
* [DIY](//tessel.io/diy)
* [GPS](https://github.com/tessel/gps-a2235h)
* [GPRS](https://github.com/tessel/gprs-sim900)
* [Infrared](https://github.com/tessel/ir-attx4)
* [MicroSD](https://github.com/tessel/sdcard)
* [Relay](https://github.com/tessel/relay-mono)
* [RFID](https://github.com/tessel/rfid-pn532)
* [Servo](https://github.com/tessel/servo-pca9685)
