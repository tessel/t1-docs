# Proposal: JavaScript Hardware API

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

* **Platform-agnostic.** No preference for an event/listener system other than a single assigned listener for events. Asynchronous functions use Node.js-form callbacks (error in the first argument, values in the subsequent arguments). Synchronous functions are discouraged but available for compatibility.
* **Simple.** Straightforward functions and objects modeling protocols. No use of constants in function arguments.
* **Capability-based.** When capabilities aren't supported, this is determinable by user code and errors are thrown in case of unsupported use.

## API

### Pins
GPIO access exists on the hardware interface.

&#x20;<a href="#api-array-number-hardware-digitalReadPins-" name="api-array-number-hardware-digitalReadPins-">#</a> <i>array&lt;number&gt;</i>&nbsp; hardware.<b>digitalReadPins</b> = []  
An array of which pins are digital inputs.

&#x20;<a href="#api-array-number-hardware-digitalWritePins-" name="api-array-number-hardware-digitalWritePins-">#</a> <i>array&lt;number&gt;</i>&nbsp; hardware.<b>digitalWritePins</b> = []  
An array of which pins are digital outputs.

&#x20;<a href="#api-array-number-hardware-analogReadPins-" name="api-array-number-hardware-analogReadPins-">#</a> <i>array&lt;number&gt;</i>&nbsp; hardware.<b>analogReadPins</b> = []  
An array of which pins are analog inputs.

&#x20;<a href="#api-array-number-hardware-analogWritePins-" name="api-array-number-hardware-analogWritePins-">#</a> <i>array&lt;number&gt;</i>&nbsp; hardware.<b>analogWritePins</b> = []  
An array of which pins are analog outputs.

&#x20;<a href="#api-array-number-hardware-pwmWritePins-" name="api-array-number-hardware-pwmWritePins-">#</a> <i>array&lt;number&gt;</i>&nbsp; hardware.<b>pwmWritePins</b> = []  
An array of which pins are PWM outputs.

&#x20;<a href="#api-array-number-hardware-Pin-pin-" name="api-array-number-hardware-Pin-pin-">#</a> <i>array&lt;number&gt;</i>&nbsp; hardware.<b>Pin</b> ( `pin` )  
array<number> pin.setInput( [`callback(err)`] )

&#x20;<a href="#api-Set-pin-to-be-an-input-Sets-err-if-the-pin-cannot-be-used-as-an-input-" name="api-Set-pin-to-be-an-input-Sets-err-if-the-pin-cannot-be-used-as-an-input-">#</a> Set `pin` to be an input. Sets `err` if the pin cannot be used as an input.   
pin.setOutput ( [`initial`], [`callback(err)`] ) 

&#x20;<a href="#api-Set-pin-to-be-an-output-Sets-err-if-the-pin-cannot-be-used-as-an-output-" name="api-Set-pin-to-be-an-output-Sets-err-if-the-pin-cannot-be-used-as-an-output-">#</a> Set `pin` to be an output. Sets `err` if the pin cannot be used as an output.    
pin.write ( `value`, [`callback(err)`] ) 

&#x20;<a href="#api-Write-the-digital-value-to-a-digital-output-pin-HIGH-is-output-if-value-is-truthy-otherwise-LOW-Sets-err-if-the-pin-cannot-be-used-as-a-digital-output-or-is-not-configured-as-an-output-" name="api-Write-the-digital-value-to-a-digital-output-pin-HIGH-is-output-if-value-is-truthy-otherwise-LOW-Sets-err-if-the-pin-cannot-be-used-as-a-digital-output-or-is-not-configured-as-an-output-">#</a> Write the digital `value` to a digital output pin. HIGH is output if `value` is truthy, otherwise LOW. Sets `err` if the pin cannot be used as a digital output or is not configured as an output.  
pin.read ( `callback(err, value)` ) 

&#x20;<a href="#api-Read-a-digital-value-from-a-digital-input-pin-1-is-returned-if-the-value-is-HIGH-otherwise-0-if-LOW-Sets-err-if-the-pin-cannot-be-used-as-a-digital-input-or-is-not-configured-as-an-input-" name="api-Read-a-digital-value-from-a-digital-input-pin-1-is-returned-if-the-value-is-HIGH-otherwise-0-if-LOW-Sets-err-if-the-pin-cannot-be-used-as-a-digital-input-or-is-not-configured-as-an-input-">#</a> Read a digital `value` from a digital input pin. `1` is returned if the value is HIGH, otherwise `0` if LOW. Sets `err` if the pin cannot be used as a digital input or is not configured as an input.    
pin.readSync () *&rarr; number* 

&#x20;<a href="#api-Reads-a-digital-value-from-a-digital-input-pin-synchronously-and-returns-immediately-1-is-returned-if-the-value-is-HIGH-otherwise-0-if-LOW-An-error-is-thrown-if-the-pin-cannot-be-used-as-a-digital-input-or-is-not-configured-as-an-input-" name="api-Reads-a-digital-value-from-a-digital-input-pin-synchronously-and-returns-immediately-1-is-returned-if-the-value-is-HIGH-otherwise-0-if-LOW-An-error-is-thrown-if-the-pin-cannot-be-used-as-a-digital-input-or-is-not-configured-as-an-input-">#</a> Reads a digital `value` from a digital input pin synchronously and returns immediately. `1` is returned if the value is HIGH, otherwise `0` if LOW. An error is thrown if the pin cannot be used as a digital input or is not configured as an input.    
pin.analogWrite ( `value`, [`callback(err)`] ) 

&#x20;<a href="#api-Write-the-analog-value-to-an-analog-output-pin-The-value-is-a-number-ranging-from-0-to-255-Sets-err-if-the-pin-cannot-be-used-as-an-analog-output-or-is-not-configured-as-an-output-" name="api-Write-the-analog-value-to-an-analog-output-pin-The-value-is-a-number-ranging-from-0-to-255-Sets-err-if-the-pin-cannot-be-used-as-an-analog-output-or-is-not-configured-as-an-output-">#</a> Write the analog `value` to an analog output pin. The `value` is a number ranging from `0` to `255`. Sets `err` if the pin cannot be used as an analog output or is not configured as an output.    
pin.analogRead ( `callback(err, value)` )  

&#x20;<a href="#api-Read-the-analog-value-from-an-analog-input-pin-The-value-is-a-number-ranging-from-0-to-1024-Sets-err-if-the-pin-cannot-be-used-as-an-analog-input-or-is-not-configured-as-an-input-" name="api-Read-the-analog-value-from-an-analog-input-pin-The-value-is-a-number-ranging-from-0-to-1024-Sets-err-if-the-pin-cannot-be-used-as-an-analog-input-or-is-not-configured-as-an-input-">#</a> Read the analog `value` from an analog input pin. The `value` is a number ranging from `0` to `1024`. Sets `err` if the pin cannot be used as an analog input or is not configured as an input.    
pin.analogReadSync () *&rarr; number*  

&#x20;<a href="#api-Read-the-analog-value-from-an-analog-input-pin-synchronously-and-returns-immediately-The-value-is-a-number-ranging-from-0-to-1024-An-error-is-thrown-if-the-pin-cannot-be-used-as-an-analog-input-or-is-not-configured-as-an-input-" name="api-Read-the-analog-value-from-an-analog-input-pin-synchronously-and-returns-immediately-The-value-is-a-number-ranging-from-0-to-1024-An-error-is-thrown-if-the-pin-cannot-be-used-as-an-analog-input-or-is-not-configured-as-an-input-">#</a> Read the analog `value` from an analog input pin synchronously and returns immediately. The `value` is a number ranging from `0` to `1024`. An error is thrown if the pin cannot be used as an analog input or is not configured as an input.    
pin.pwmWrite ( `value`, [`callback(err)`] ) 

&#x20;<a href="#api-Write-the-analog-value-to-a-PWM-output-pin-The-value-is-a-number-ranging-from-0-to-255-Sets-err-if-the-pin-cannot-be-used-as-an-PWM-output-or-is-not-configured-as-an-output-" name="api-Write-the-analog-value-to-a-PWM-output-pin-The-value-is-a-number-ranging-from-0-to-255-Sets-err-if-the-pin-cannot-be-used-as-an-PWM-output-or-is-not-configured-as-an-output-">#</a> Write the analog `value` to a PWM output pin. The `value` is a number ranging from `0` to `255`. Sets `err` if the pin cannot be used as an PWM output or is not configured as an output.    
pin.setRiseListener ( `onrise(err, time)` )  

&#x20;<a href="#api-Sets-a-listener-for-a-rising-signal-edge-on-pin-" name="api-Sets-a-listener-for-a-rising-signal-edge-on-pin-">#</a> Sets a listener for a rising signal edge on `pin`.  
pin.removeRiseListener ( )  

&#x20;<a href="#api-Removes-the-listener-for-rising-signal-edge-" name="api-Removes-the-listener-for-rising-signal-edge-">#</a> Removes the listener for rising signal edge.  
pin.setFallListener ( `onfall(err, time)` )  

&#x20;<a href="#api-Sets-a-listener-for-a-falling-signal-edge-on-pin-" name="api-Sets-a-listener-for-a-falling-signal-edge-on-pin-">#</a> Sets a listener for a falling signal edge on `pin`.  
pin.removeFallListener ( )  

&#x20;<a href="#api-Removes-the-listener-for-the-falling-signal-edge-" name="api-Removes-the-listener-for-the-falling-signal-edge-">#</a> Removes the listener for the falling signal edge.  
# SPI

&#x20;<a href="#api-A-SPI-channel-" name="api-A-SPI-channel-">#</a> <b>A</b> SPI channel.  
new hardware.SPI ( [`idx`] )  

&#x20;<a href="#api-Creates-a-SPI-channel-" name="api-Creates-a-SPI-channel-">#</a> Creates a SPI channel.  
spi.initialize (`onconnected(err)`)  

&#x20;<a href="#api-Initializes-the-SPI-channel-" name="api-Initializes-the-SPI-channel-">#</a> Initializes the SPI channel.  
spi.setClockSpeed ( `mhz`, [`callback(err)`] ) 

&#x20;<a href="#api-Set-the-SPI-output-speed-" name="api-Set-the-SPI-output-speed-">#</a> Set the SPI output speed.    
spi.setCPOL ( `cpol`, [`callback(err)`] ) 

&#x20;<a href="#api-Set-CPOL-SPI-polarity-" name="api-Set-CPOL-SPI-polarity-">#</a> Set CPOL (SPI polarity).    
spi.setCPHA ( `cpha`, [`callback(err)`] ) 

&#x20;<a href="#api-Set-CPHA-SPI-bit-significance-" name="api-Set-CPHA-SPI-bit-significance-">#</a> Set CPHA (SPI bit significance).      
spi.transfer ( `cs`, `writebuf`, `readcount`, `callback(err, data)` ) 

&#x20;<a href="#api--cs-is-the-chip-select-pin-or-1-if-no-pin-should-be-toggled-" name="api--cs-is-the-chip-select-pin-or-1-if-no-pin-should-be-toggled-">#</a> `cs` is the chip select pin, or `-1` if no pin should be toggled.    
spi.read ( `cs`, `readcount`, `callback(err, data)` ) 

&#x20;<a href="#api--cs-is-the-chip-select-pin-or-1-if-no-pin-should-be-toggled-" name="api--cs-is-the-chip-select-pin-or-1-if-no-pin-should-be-toggled-">#</a> `cs` is the chip select pin, or `-1` if no pin should be toggled.    
spi.write ( `cs`, `writebuf`, `callback(err)` ) 

&#x20;<a href="#api--cs-is-the-chip-select-pin-or-1-if-no-pin-should-be-toggled-" name="api--cs-is-the-chip-select-pin-or-1-if-no-pin-should-be-toggled-">#</a> `cs` is the chip select pin, or `-1` if no pin should be toggled.    
# I2C

&#x20;<a href="#api-An-I2C-channel-" name="api-An-I2C-channel-">#</a> An I2C channel.  
new hardware.I2C ( [`idx`] )  

&#x20;<a href="#api-Creates-an-I2C-channel-" name="api-Creates-an-I2C-channel-">#</a> Creates an I2C channel.  
i2c.initialize ( `onconnected(err)` )  

&#x20;<a href="#api-Initializes-the-I2C-channel-" name="api-Initializes-the-I2C-channel-">#</a> Initializes the I2C channel.  
i2c.transfer ( `address`, `writebuf`, `readcount`, `callback(err, data)` )  

&#x20;<a href="#api-Transfers-the-array-of-bytes-writebuf-to-the-device-signified-by-address-with-readcount-bytes-" name="api-Transfers-the-array-of-bytes-writebuf-to-the-device-signified-by-address-with-readcount-bytes-">#</a> Transfers the array of bytes `writebuf` to the device signified by `address` with `readcount` bytes.  
i2c.read ( `address`, `readcount`, `callback(err, data)` )  

&#x20;<a href="#api-Reads-readcount-bytes-from-the-device-with-the-address-on-the-bus-" name="api-Reads-readcount-bytes-from-the-device-with-the-address-on-the-bus-">#</a> Reads `readcount` bytes from the device with the `address` on the bus.  
i2c.write ( `address`, `writebuf`, `callback(err)` )  

&#x20;<a href="#api-Writes-the-array-of-bytes-writebuf-to-the-device-with-the-address-on-the-bus-" name="api-Writes-the-array-of-bytes-writebuf-to-the-device-with-the-address-on-the-bus-">#</a> Writes the array of bytes `writebuf` to the device with the `address` on the bus.  
# UART

&#x20;<a href="#api-A-UART-channel-" name="api-A-UART-channel-">#</a> <b>A</b> UART channel.  
new hardware.UART ( [`idx`] )

&#x20;<a href="#api-Creates-a-UART-channel-" name="api-Creates-a-UART-channel-">#</a> Creates a UART channel.  
array<number> uart.baudRates 

&#x20;<a href="#api-An-array-of-valid-baud-rates-supported-by-the-system-" name="api-An-array-of-valid-baud-rates-supported-by-the-system-">#</a> An array of valid baud rates supported by the system.    
uart.initialize ( `onconnected(err)` ) 

&#x20;<a href="#api-Initializes-the-UART-connection-" name="api-Initializes-the-UART-connection-">#</a> Initializes the UART connection.    
uart.setBaudRate ( `rate`, `callback(err)` ) 

&#x20;<a href="#api-Sets-the-baud-rate-to-a-valid-rate-in-baudRates-" name="api-Sets-the-baud-rate-to-a-valid-rate-in-baudRates-">#</a> Sets the baud `rate` to a valid rate in `baudRates`.  
uart.setDataListener ( `ondata(err, data)` ) 

&#x20;<a href="#api-Set-the-new-data-listener-function-" name="api-Set-the-new-data-listener-function-">#</a> Set the new data listener function.    
uart.removeDataListener 

&#x20;<a href="#api-Removes-datas-listener-attached-to-the-port-" name="api-Removes-datas-listener-attached-to-the-port-">#</a> Removes datas listener attached to the port.    
uart.write ( `buf`, `callback(err)` ) 

&#x20;<a href="#api-Writes-a-buffer-to-the-UART-connection-" name="api-Writes-a-buffer-to-the-UART-connection-">#</a> Writes a buffer to the UART connection.  
# Signal

&#x20;<a href="#api-Signal-output-via-buffers-and-simple-animation-protocols-High-speed-signals-are-implementation-dependent-and-use-their-own-signal-indexing-scheme-" name="api-Signal-output-via-buffers-and-simple-animation-protocols-High-speed-signals-are-implementation-dependent-and-use-their-own-signal-indexing-scheme-">#</a> Signal output via buffers and simple animation protocols. High speed signals are implementation-dependent and use their own signal indexing scheme.  
new hardware.Signal ( `interface`, `signalidx` )  

&#x20;<a href="#api-Creates-a-signal-channel-" name="api-Creates-a-signal-channel-">#</a> Creates a signal channel.  
number signal.maxSpeed

&#x20;<a href="#api-The-maximum-speed-in-MHz-at-which-a-signal-can-be-emitted-" name="api-The-maximum-speed-in-MHz-at-which-a-signal-can-be-emitted-">#</a> The maximum speed (in MHz) at which a signal can be emitted.  
number signal.idleBit = 0 

&#x20;<a href="#api-The-bit-truthy-for-HIGH-and-otherwise-LOW-to-be-output-while-there-is-no-signal-This-value-is-writeable-" name="api-The-bit-truthy-for-HIGH-and-otherwise-LOW-to-be-output-while-there-is-no-signal-This-value-is-writeable-">#</a> The bit, truthy for HIGH and otherwise LOW, to be output while there is no signal. This value is writeable.    
signal.initialize ( `onconnected(err)` ) 

&#x20;<a href="#api-Initializes-the-signal-connection-" name="api-Initializes-the-signal-connection-">#</a> Initializes the signal connection.  
signal.setClockSpeed ( `MHz`, [`callback(err)`] ) 

&#x20;<a href="#api-Set-the-signal-output-speed-from-0-to-maxSpeed-" name="api-Set-the-signal-output-speed-from-0-to-maxSpeed-">#</a> Set the signal output speed from `0` to `maxSpeed`.    
signal.stop ( [`callback(err)`] ) 

&#x20;<a href="#api-Stop-an-ongoing-signal-" name="api-Stop-an-ongoing-signal-">#</a> Stop an ongoing signal.    
signal.loop ( `buf`, [`onrepeat(err)`] ) 

&#x20;<a href="#api-Repeat-the-buffered-signal-" name="api-Repeat-the-buffered-signal-">#</a> Repeat the buffered signal.    
signal.send ( `buf`, [`onfinished(err)`] ) 

&#x20;<a href="#api-Send-a-signal-calling-the-callback-when-completed-" name="api-Send-a-signal-calling-the-callback-when-completed-">#</a> Send a signal, calling the callback when completed.    
signal.queue ( `buf`, [`onfinished(err)`] ) 

&#x20;<a href="#api-Queue-a-signal-for-when-the-current-signal-completes-" name="api-Queue-a-signal-for-when-the-current-signal-completes-">#</a> Queue a signal for when the current signal completes.    
undefined


## Example Implementations

* <b>[hardware-firmata](https://github.com/technicalmachine/hardware-firmata)</b> &mdash; An implementation of the hardware API to output the [Firmata](http://firmata.org/wiki/Main_Page) protocol.
* <b>[accel-mma84](https://github.com/technicalmachine/accel-mma84)</b> &mdash; MMA8452Q accelerometer.
* <b>[servo-pca9685](https://github.com/technicalmachine/servo-pca9685)</b> &mdash; PCA9685 PWM driver.
* <b>[climate-s17005](https://github.com/technicalmachine/climate-s17005)</b> &mdash; S17005 temperature/humidity sensor.


## References

This API in part draws inspiration from several pre-existing APIs.

* <http://firmata.org/wiki/Main_Page>
* <http://pythonhosted.org/RPIO/> and <https://pypi.python.org/pypi/RPi.GPIO>
