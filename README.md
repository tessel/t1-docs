# JavaScript Hardware API Proposal

**VERSION 0.0.1**

This is a proposal for a common interface for Hardware APIs in JavaScript. The goal is to have, on platform of choice, a standardard API to code modules against.

```js
var myhardware = require('myhardware');

var accel = require('accelmodule').connect(myhardware);
accel.getAcceleration(function (xyz) { ... });
```

This lets you write interoperable code for hardware-level protocols, GPIOs, SPI/I2C/UART/CAN, etc.

With a generic hardware interface, you can also create remote protocols (such as Firmata). Interoperable code can control a remote Arduino or run on-board a JavaScript microcontroller/microprocessor.


### Pins

GPIO access exists on the hardware interface.

*array&lt;number&gt;*&nbsp; hardware.<b>digitalReadPins</b>  
*array&lt;number&gt;*&nbsp; hardware.<b>digitalWritePins</b>  
*array&lt;number&gt;*&nbsp; hardware.<b>analogReadPins</b>  
*array&lt;number&gt;*&nbsp; hardware.<b>analogWritePins</b>  
*array&lt;number&gt;*&nbsp; hardware.<b>pwmWritePins</b>  

hardware.<b>setInput</b> (`pin`, [`callback(err)`])  
hardware.<b>setOutput</b> (`pin`, [`initial`], [`callback(err)`])  

hardware.<b>digitalWrite</b> (`value`, [`callback(err)`])  
hardware.<b>digitalRead</b> (`callback(err, value)`)  
*number*&nbsp; hardware.<b>digitalReadSync</b> ()  

hardware.<b>analogWrite</b> (`value`, [`callback(err)`])  
hardware.<b>analogRead</b> (`callback(err, read)`)  
*number*&nbsp; hardware.<b>analogReadSync</b> ()  

hardware.<b>pwmWrite</b> (`value`, [`callback(err)`])  

hardware.<b>setRiseListener</b> (`pin`, `onrise(err, time)`)  
hardware.<b>removeRiseListener</b> (`pin`)  
hardware.<b>setFallListener</b> (`pin`, `onfall(err, time)`)  
hardware.<b>removeFallListener</b> (`pin`)  


### SPI

A SPI channel.

new hardware.<b>SPI</b> (`interface`, [`cs`])  

spi.<b>initialize</b> (`onconnected(err)`)  

spi.<b>setClockSpeed</b> (`mhz`, [`callback(err)`])  
spi.<b>setCPOL</b> (`cpol`, [`callback(err)`])  
spi.<b>setCPHA</b> (`cpha`, [`callback(err)`])  

spi.<b>transfer</b> (`writebuf`, `readcount`, `callback(err, data)`)  
spi.<b>read</b> (`readcount`, `callback(err, data)`)  
spi.<b>write</b> (`writebuf`, `callback(err)`)  


### I2C

An I2C channel.

new hardware.<b>I2C</b> (`interface`, `address`)  

i2c.<b>initialize</b> (`onconnected(err)`)  

i2c.<b>transfer</b> (`writebuf`, `readcount`, `callback(err, data)`)  
i2c.<b>read</b> (`readcount`, `callback(err, data)`)  
i2c.<b>write</b> (`writebuf`, `callback(err)`)  


### Signal

Signal output via buffers and simple animation protocols. Implementation-dependent.

new hardware.<b>Signal</b> (`interface`, `signalidx`)  

*number*&nbsp; signal.<b>idleBit</b> = 0  

signal.<b>initialize</b> (`onconnected(err)`)  

signal.<b>setClockSpeed</b> (`mhz`, [`callback(err)`])  

signal.<b>stop</b> ([`callback(err)`])  
signal.<b>loop</b> (`buf`, [`onrepeat(err)`])  
signal.<b>send</b> (`buf`, [`onfinished(err)`])  
signal.<b>queue</b> (`buf`, [`onfinished(err)`])  


## Firmata

This API can be used as a front-end for remote protocols, such as Firmata:

* bank.<b>setInput</b> / <b>setOutput</b> &rarr; firmata.<b>pinMode</b>
* bank.<b>digitalWrite</b> &rarr; firmata.<b>digitalWrite</b>
* bank.<b>digitalRead</b> &rarr; firmata.<b>digitalRead</b>
* bank.<b>analogWrite</b> / bank.<b>pwmWrite</b> &rarr; firmata.<b>analogWrite</b>
* bank.<b>pwmWrite</b> &rarr; firmata.<b>servoWrite</b>
* bank.<b>analogRead</b> &rarr; firmata.<b>analogRead</b>
* i2c.<b>initialize</b> &rarr; firmata.<b>sendI2CConfig</b>
* i2c.<b>write</b> &rarr; firmata.<b>sendI2CWriteRequest</b>
* i2c.<b>read</b> &rarr; firmata.<b>sendI2CReadRequest</b>


## Implementors

Currently implemented by Tessel.


## References

This API, in part, references several pre-existing APIs.

* <http://firmata.org/wiki/Main_Page>
* <http://pythonhosted.org/RPIO/> and <https://pypi.python.org/pypi/RPi.GPIO>
