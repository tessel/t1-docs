#Arduino <-> Tessel communication

This is a tutorial for how to pass data back and forth between an Arduino and a Tessel.

The data is passed via a [UART](http://en.wikipedia.org/wiki/Uart) bridge. Arduino has the [SoftwareSerial](http://arduino.cc/en/Reference/SoftwareSerial) library for UART comm and Tessel has it's built in UART functions.

UART works through having TX (transmit) and RX (recieve) pins. A TX of one device is hooked up to the RX of another device like this:

Tessel TX  <---> Arduino RX
Tessel RX  <---> Arduino TX
Tessel GND <---> Arduino GND

##Step 1: Get an Arduino

The Arduino needs to operate at 3.3V. Some boards which operate at this voltage are:

* [Arduino Mini](https://www.sparkfun.com/products/11114)
* [Seeeduino](http://www.seeedstudio.com/depot/Seeeduino-V30-Atmega-328P-p-669.html)
* [Crowduino](http://www.elecrow.com/crowduino-with-atmega-328-v11-p-338.html)

Both the Seeeduino and the Crowduino can switch between 5V and 3.3V.


### Arduino Uno
Arduino Unos send over signals at 5V and **this will damage Tesssel**. If you are planning on using an Arduino Uno, you need to make a [5V to 3.3V level converter](https://www.sparkfun.com/products/12009) which shifts the 5V UART TX signal from the Arduino to 3.3V. 

The UART TX coming **from** Tessel is at max 3.3V, but this will register as a digital "high" signal so it does not need to be boosted up to 5V.

##Step 2: Hook up the Arduino to the Tessel

There are 3 pins that need to be hooked up, UART TX, UART RX, and Ground.

In the code example, we're going to be using Arduino's SoftwareSerial on pins 10 and 11.

![wiring an arduino to a tessel](https://s3.amazonaws.com/technicalmachine-assets/doc+pictures/arduino-tessel-wiring-uart.jpg)

Arduino Pin 10 (orange wire) <--> Tessel Port D, pin TX/G1
Arduino Pin 11 (white wire)  <--> Tessel Port D, pin RX/G2
Arduino Ground (brown wire)  <--> Tessel Ground

##Step 3: Program the Arduino

Run this code on the Arduino

```
#include <SoftwareSerial.h>
#define rxPin 10 // connect to TX of other device
#define txPin 11 // connect to RX of other device

SoftwareSerial tesselBridge =  SoftwareSerial(rxPin, txPin);

void setup()  
{
  // open serial port at 9600 baud
  Serial.begin(9600);
  Serial.println("Starting up...");
  
  // set the data rate for the SoftwareSerial port
  tesselBridge.begin(9600);
}

void loop() // run over and over
{
  if (tesselBridge.available())
    Serial.write(tesselBridge.read());
  if (Serial.available())
    tesselBridge.write(Serial.read());
}
```

##Step 4: Program Tessel

Make a folder for the code:

```
mkdir arduinoBridge;
cd arduinoBridge; touch uart.js;
```

Put this in the uart.js file.

```
var tessel = require('tessel');
var led1 = tessel.led[0].output(0);
var led2 = tessel.led[1].output(0);
var i = 0;

// baudrate must match the baudrate set in the Arduino file
uartBridge = tessel.port['D'].UART({baudrate: 9600}); 

uartBridge.on('data', function(data){
  // UART data is not packetized, so you will get the data 
  // buffer as the message is sent. This means that long
  // messages will be truncated as several events.
  
  var number = parseInt(data[0]) - 48; // convert hex to ascii to int
  console.log("got data", data, number);

  if (number == 1)
    led1.toggle();

  if (number == 2)
    led2.toggle();
});

// every 3 seconds write some data over to the arduino
setInterval(function(){
  uartBridge.write("Hi there "+i+"\n");
  i++;
}, 3000);
```

Run the code with `tessel run uart.js`, or if you want this to be persistant through power cycles, `tessel push uart.js`.

##Step 5: Test it
You should be able to go into the Arduino console and see the LEDs on Tessel change as you enter a "1" or a "2".

![terminal](https://s3.amazonaws.com/technicalmachine-assets/doc+pictures/arduino-to-tessel.jpg)
