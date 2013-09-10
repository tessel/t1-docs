# Hardware API Proposal

**VERSION 0.0.1**

This is the common interface used by the Tessel for writing hardware modules. The goal is to have one line on your platform of choice:

```js
var hardware = require('hardware');
```

That lets you write interoperable code for hardware-level protocols, GPIOs, SPI/I2C/UART/CAN, etc.

From this level, we could abstract remote protocols (such as Firmata) and move interoperably between platforms.

Goals in order: 1) as little GC as neded, 2) as few constants and functions as needed.


### Bank

A bank of pins.

new hardware.<b>Bank</b> (`bankidx`)  

* *array<number>*&nbsp; bank.<b>digitalReadPins</b>
* *array<number>*&nbsp; bank.<b>digitalWritePins</b>
* *array<number>*&nbsp; bank.<b>analogReadPins</b>
* *array<number>*&nbsp; bank.<b>analogWritePins</b>
* *array<number>*&nbsp; bank.<b>pwmWritePins</b>  

* bank.<b>setInput</b> (`pin`, [`callback(err)`])
* bank.<b>setOutput</b> (`pin`, [`initial`], [`callback(err)`])

* bank.<b>digitalWrite</b> (`value`, [`callback(err)`])
* bank.<b>digitalRead</b> (`callback(err, value)`)
* *number*&nbsp; bank.<b>digitalReadSync</b> ()  

* bank.<b>analogWrite</b> (`value`, [`callback(err)`])
* bank.<b>analogRead</b> (`callback(err, read)`)
* *number*&nbsp; bank.<b>analogReadSync</b> ()  

* bank.<b>pwmWrite</b> (`value`, [`callback(err)`])  

* bank.<b>addRiseListener</b> (`pin`, `onrise(err, time)`)
* bank.<b>removeRiseListener</b> (`pin`)
* bank.<b>addFallListener</b> (`pin`, `onfall(err, time)`)
* bank.<b>removeFallListener</b> (`pin`)  


### SPI

A SPI channel.

new hardware.<b>SPI</b> (`spiidx`, [`bankidx`, `cs`])  

* spi.<b>initialize</b> (`onconnected(err)`)  

* spi.<b>setClockSpeed</b> (`mhz`)
* spi.<b>setCPOL</b> (`cpol`)
* spi.<b>setCPHA</b> (`cpha`)  

* spi.<b>transfer</b> (`writebuf`, `readcount`, `callback(err, data)`)
* spi.<b>read</b> (`readcount`, `callback(err, data)`)
* spi.<b>write</b> (`writebuf`, `callback(err)`)  


### I2C

An I2C channel.

new hardware.<b>I2C</b> (`i2cidx`, `address`)  

* i2c.<b>initialize</b> (`onconnected(err)`)  

* i2c.<b>transfer</b> (`writebuf`, `readcount`, `callback(err, data)`)
* i2c.<b>read</b> (`readcount`, `callback(err, data)`)
* i2c.<b>write</b> (`writebuf`, `callback(err)`)  


### Signal

Signal output via buffers and simple animation protocols. Implementation-dependent.

new hardware.<b>FastSignal</b> (`bankidx`, `signalidx`)  

* *number*&nbsp; signal.<b>idleBit</b> = 0  

* signal.<b>initialize</b> (`onconnected(err)`)  

* signal.<b>setClockSpeed</b> (`mhz`)  

* signal.<b>stop</b> ()
* signal.<b>loop</b> (`buf`, [`onrepeat(err)`])
* signal.<b>send</b> (`buf`, [`onfinished(err)`])
* signal.<b>queue</b> (`buf`, [`onfinished(err)`])  


## Firmata

Converting between this API to Firmata:

* bank.<b>setInput</b> / <b>setOutput</b> &rarr; firmata.<b>pinMode</b>
* bank.<b>digitalWrite</b> &rarr; firmata.<b>digitalWrite</b>
* bank.<b>digitalRead</b> &rarr; firmata.<b>digitalRead</b>
* bank.<b>analogWrite</b> / bank.<b>pwmWrite</b> &rarr; firmata.<b>analogWrite</b>
* bank.<b>pwmWrite</b> &arr; firmata.<b>servoWrite</b>
* bank.<b>analogRead</b> &rarr; firmata.<b>analogRead</b>
* i2c.<b>initialize</b> &rarr; firmata.<b>sendI2CConfig</b>
* i2c.<b>write</b> &rarr; firmata.<b>sendI2CWriteRequest</b>
* i2c.<b>read</b> &rarr; firmata.<b>sendI2CReadRequest</b>


## References

This API, in part, references several pre-existing APIs.

* <http://firmata.org/wiki/Main_Page>
* <http://pythonhosted.org/RPIO/> and <https://pypi.python.org/pypi/RPi.GPIO>