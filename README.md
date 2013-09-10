# Hardware API Proposal

**VERSION 0.0.1**

This is the common interface used by the Tessel for writing hardware modules. The goal is to have one line on your platform of choice:

```js
var hardware = require('hardware');
```

That lets you write interoperable code for hardware-level protocols, GPIOs, SPI/I2C/UART/CAN, etc.

From this level, we could abstract remote protocols (such as Firmata) and move interoperably between platforms.


## Bank

A bank of pins.

new hardware.<b>Bank</b> (`idx`)  

*array<number>*&nbsp; bank.<b>digitalReadPins</b>  
*array<number>*&nbsp; bank.<b>digitalWritePins</b>  
*array<number>*&nbsp; bank.<b>analogReadPins</b>  
*array<number>*&nbsp; bank.<b>analogWritePins</b>  
*array<number>*&nbsp; bank.<b>pwmWritePins</b>  

bank.<b>setInput</b> (`pin`, [`callback(err)`])  
bank.<b>setOutput</b> (`pin`, [`callback(err)`])  

bank.<b>digitalWrite</b> (`value`, [`callback(err)`])  
bank.<b>digitalRead</b> (`callback(err, value)`)  
*number*&nbsp; bank.<b>digitalReadSync</b> ()  

bank.<b>analogWrite</b> (`value`, [`callback(err)`])  
bank.<b>analogRead</b> (`callback(err, read)`)  
*number*&nbsp; bank.<b>analogReadSync</b> ()  

bank.<b>pwmWrite</b> (`value`, [`callback(err)`])  


## SPI

A SPI output.

new hardware.<b>SPI</b> (`idx`, [`bank`, `cs`])  

spi.<b>setClockSpeed</b> (`mhz`)  
spi.<b>setCPOL</b> (`cpol`)  
spi.<b>setCPHA</b> (`cpha`)  

spi.<b>transfer</b> (`writebuf`, `readcount`, `callback(err, data)`)  
spi.<b>read</b> (`readcount`, `callback(err, data)`)  
spi.<b>write</b> (`writebuf`, `callback(err)`)  


## I2C

An I2C output.

new hardware.<b>I2C</b> (`idx`, `address`)  

i2c.<b>transfer</b> (`writebuf`, `readcount`, `callback(err, data)`)  
i2c.<b>read</b> (`readcount`, `callback(err, data)`)  
i2c.<b>write</b> (`writebuf`, `callback(err)`)  


## FastSignal

FastSignal signal output via a buffer.

new hardware.<b>FastSignal</b> (`bankidx`, `pinidx`)

fast.idleBit = 0  

fast.<b>setClockSpeed</b> (`mhz`)  

fast.<b>loop</b> (`buf`, [`onrepeat(err)`])  
fast.<b>send</b> (`buf`, [`onfinished(err)`])  
fast.<b>queue</b> (`buf`, [`onfinished(err)`])  

