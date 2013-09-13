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

## Changelog

* **September 11, 2013 (0.0.1)** &mdash; Initial release.


## Goals

* <b>Platform-agnostic.</b> No preference for an event/listener system other than a single assigned listener for events. Asynchronous functions use Node.js-form callbacks (error in the first argument, values in the subsequent arguments). Synchronous functions are discouraged but available for compatibility.
* <b>Simple.</b> Straightforward functions and objects modeling protocols. No use of constants in function arguments.
* <b>Capability-based.</b> When capabilities aren't supported, this is determinable by user code and errors are thrown in case of unsupported use.


### Pins

GPIO access exists on the hardware interface.

*array&lt;number&gt;*&nbsp; hardware.<b>digitalReadPins</b> &mdash; An array of which pins are digital inputs.  
*array&lt;number&gt;*&nbsp; hardware.<b>digitalWritePins</b> &mdash; An array of which pins are digital outputs.  
*array&lt;number&gt;*&nbsp; hardware.<b>analogReadPins</b> &mdash; An array of which pins are analog inputs.  
*array&lt;number&gt;*&nbsp; hardware.<b>analogWritePins</b> &mdash; An array of which pins are analog outputs.  
*array&lt;number&gt;*&nbsp; hardware.<b>pwmWritePins</b> &mdash; An array of which pins are PWM outputs.  

hardware.<b>setInput</b> ( `pin`, [`callback(err)`] ) &mdash; Set `pin` to be an input. Sets `err` if the pin cannot be used as an input.  
hardware.<b>setOutput</b> ( `pin`, [`initial`], [`callback(err)`] ) &mdash; Set `pin` to be an output. Sets `err` if the pin cannot be used as an output.  

hardware.<b>digitalWrite</b> ( `value`, [`callback(err)`] ) &mdash; Write the digital `value` to a digital output pin. HIGH is output if `value` is truthy, otherwise LOW. Sets `err` if the pin cannot be used as a digital output or is not configured as an output.
hardware.<b>digitalRead</b> ( `callback(err, value)` ) &mdash; Read a digital `value` from a digital input pin. `1` is returned if the value is HIGH, otherwise `0` if LOW. Sets `err` if the pin cannot be used as a digital input or is not configured as an input.  
hardware.<b>digitalReadSync</b> () *&rarr; number* &mdash; Reads a digital `value` from a digital input pin synchronously and returns immediately. `1` is returned if the value is HIGH, otherwise `0` if LOW. An error is thrown if the pin cannot be used as a digital input or is not configured as an input.  

hardware.<b>analogWrite</b> ( `value`, [`callback(err)`] ) &mdash; Write the analog `value` to an analog output pin. The `value` is a number ranging from `0` to `255`. Sets `err` if the pin cannot be used as an analog output or is not configured as an output.  
hardware.<b>analogRead</b> ( `callback(err, value)` )  &mdash; Read the analog `value` from an analog input pin. The `value` is a number ranging from `0` to `1024`. Sets `err` if the pin cannot be used as an analog input or is not configured as an input.  
hardware.<b>analogReadSync</b> () *&rarr; number*  &mdash; Read the analog `value` from an analog input pin synchronously and returns immediately. The `value` is a number ranging from `0` to `1024`. An error is thrown if the pin cannot be used as an analog input or is not configured as an input.  

hardware.<b>pwmWrite</b> ( `value`, [`callback(err)`] ) &mdash; Write the analog `value` to a PWM output pin. The `value` is a number ranging from `0` to `255`. Sets `err` if the pin cannot be used as an PWM output or is not configured as an output.  

hardware.<b>setRiseListener</b> ( `pin`, `onrise(err, time)` )  
hardware.<b>removeRiseListener</b> ( `pin` )  
hardware.<b>setFallListener</b> ( `pin`, `onfall(err, time)` )  
hardware.<b>removeFallListener</b> ( `pin` )  


### SPI

A SPI channel.

new hardware.<b>SPI</b> ( [`idx`] )  

spi.<b>initialize</b> (`onconnected(err)`)  

spi.<b>setClockSpeed</b> ( `mhz`, [`callback(err)`] ) &mdash; Set the SPI output speed.  
spi.<b>setCPOL</b> ( `cpol`, [`callback(err)`] ) &mdash; Set CPOL (SPI polarity).  
spi.<b>setCPHA</b> ( `cpha`, [`callback(err)`] ) &mdash; Set CPHA (SPI bit significance).    

spi.<b>transfer</b> ( `cs`, `writebuf`, `readcount`, `callback(err, data)` ) &mdash; `cs` is the chip select pin, or `-1` if no pin should be toggled.  
spi.<b>read</b> ( `cs`, `readcount`, `callback(err, data)` ) &mdash; `cs` is the chip select pin, or `-1` if no pin should be toggled.  
spi.<b>write</b> ( `cs`, `writebuf`, `callback(err)` ) &mdash; `cs` is the chip select pin, or `-1` if no pin should be toggled.  


### I2C

An I2C channel.

new hardware.<b>I2C</b> ( [`idx`] )  

i2c.<b>initialize</b> ( `onconnected(err)` )  

i2c.<b>transfer</b> ( `address`, `writebuf`, `readcount`, `callback(err, data)` )  
i2c.<b>read</b> ( `address`, `readcount`, `callback(err, data)` )  
i2c.<b>write</b> ( `address`, `writebuf`, `callback(err)` )  


### UART

A UART channel.

new hardware.<b>UART</b> ( [`idx`] )

uart.<b>initialize</b> ( `onconnected(err)` ) &mdash; Initializes the UART connection.  

*array&lt;number&gt;* uart.<b>baudRates</b> &mdash; An array of valid baud rates supported by the system.  

uart.<b>setBaudRate</b> ( `rate`, `callback(err)` ) &mdash; Sets the baud `rate` to a valid rate in `baudRates`.

uart.<b>setDataListener</b> ( `ondata(err, data)` ) &mdash; Set the new data listener function.  
uart.<b>removeDataListener</b> &mdash; Removes datas listener attached to the port.  
uart.<b>write</b> ( `buf`, `callback(err)` ) &mdash; Writes a buffer to the UART connection.


### Signal

Signal output via buffers and simple animation protocols. High speed signals are implementation-dependent and use their own signal indexing scheme.

new hardware.<b>Signal</b> ( `interface`, `signalidx` )  

*number*&nbsp; signal.maxSpeed *(read-only)* &mdash; The maximum speed (in MHz) at which a signal can be emitted.
*number*&nbsp; signal.<b>idleBit</b> = 0 &mdash; The bit, truthy for HIGH and otherwise LOW, to be output while there is no signal. This value is writeable.  

signal.<b>initialize</b> ( `onconnected(err)` ) &mdash;  

signal.<b>setClockSpeed</b> ( `MHz`, [`callback(err)`] ) &mdash; Set the signal output speed from `0` to `maxSpeed`.  

signal.<b>stop</b> ( [`callback(err)`] ) &mdash; Stop an ongoing signal.  
signal.<b>loop</b> ( `buf`, [`onrepeat(err)`] ) &mdash; Repeat the buffered signal.  
signal.<b>send</b> ( `buf`, [`onfinished(err)`] ) &mdash; Send a signal, calling the callback when completed.  
signal.<b>queue</b> ( `buf`, [`onfinished(err)`] ) &mdash; Queue a signal for when the current signal completes.  


## Proxy through Firmata

This API can be proxied over remote protocols like Firmata. Here's a suggested binding, available in the <code>hardware-firmata</code> library:

* bank.<b>setInput</b> / <b>setOutput</b> &rarr; firmata.<b>pinMode</b>
* bank.<b>digitalWrite</b> &rarr; firmata.<b>digitalWrite</b>
* bank.<b>digitalRead</b> &rarr; firmata.<b>digitalRead</b>
* bank.<b>analogWrite</b> / bank.<b>pwmWrite</b> &rarr; firmata.<b>analogWrite</b>
* bank.<b>pwmWrite</b> &rarr; firmata.<b>servoWrite</b>
* bank.<b>analogRead</b> &rarr; firmata.<b>analogRead</b>
* i2c.<b>initialize</b> &rarr; firmata.<b>sendI2CConfig</b>
* i2c.<b>write</b> &rarr; firmata.<b>sendI2CWriteRequest</b>
* i2c.<b>read</b> &rarr; firmata.<b>sendI2CReadRequest</b>

Note that functionality is not available in Firmata that is provided by hte Hardware API. In these instances, an Error is thrown detailing that the functionality is not implemented.


## Implementations

* [Tessel](http://technical.io/) uses the Hardware API as its built-in API.


## References

This API, in part, references several pre-existing APIs.

* <http://firmata.org/wiki/Main_Page>
* <http://pythonhosted.org/RPIO/> and <https://pypi.python.org/pypi/RPi.GPIO>
