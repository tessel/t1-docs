# Tessel Hardware API

## Changelog

* **0.1.0** &mdash; Pin interface, improved UART abstractions, parity with Tessel APIs.
* **0.0.1** &mdash; Initial release.


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

&#x20;<a href="#api-new-hardware-Pin-pin-" name="api-new-hardware-Pin-pin-">#</a> new hardware.<b>Pin</b> ( `pin` )  
Create and return `pin` object.

&#x20;<a href="#api-array-number-pin-setInput-callback-err-" name="api-array-number-pin-setInput-callback-err-">#</a> <i>array&lt;number&gt;</i>&nbsp; pin.<b>setInput</b>( [`callback(err)`] )  
Set `pin` to be an input. Sets `err` if the pin cannot be used as an input. 

&#x20;<a href="#api-pin-setOutput-initial-callback-err-" name="api-pin-setOutput-initial-callback-err-">#</a> pin.<b>setOutput</b> ( [`initial`], [`callback(err)`] )   
Set `pin` to be an output. Sets `err` if the pin cannot be used as an output.  

&#x20;<a href="#api-pin-write-value-callback-err-" name="api-pin-write-value-callback-err-">#</a> pin.<b>write</b> ( `value`, [`callback(err)`] )   
Write the digital `value` to a digital output pin. HIGH is output if `value` is truthy, otherwise LOW. Sets `err` if the pin cannot be used as a digital output or is not configured as an output.

&#x20;<a href="#api-pin-read-callback-err-value-" name="api-pin-read-callback-err-value-">#</a> pin.<b>read</b> ( `callback(err, value)` )   
Read a digital `value` from a digital input pin. `1` is returned if the value is HIGH, otherwise `0` if LOW. Sets `err` if the pin cannot be used as a digital input or is not configured as an input.  

&#x20;<a href="#api-pin-readSync-rarr-number-" name="api-pin-readSync-rarr-number-">#</a> pin.<b>readSync</b> () *&rarr; number*   
Reads a digital `value` from a digital input pin synchronously and returns immediately. `1` is returned if the value is HIGH, otherwise `0` if LOW. An error is thrown if the pin cannot be used as a digital input or is not configured as an input.  

&#x20;<a href="#api-pin-analogWrite-value-callback-err-" name="api-pin-analogWrite-value-callback-err-">#</a> pin.<b>analogWrite</b> ( `value`, [`callback(err)`] )   
Write the analog `value` to an analog output pin. The `value` is a number ranging from `0` to `255`. Sets `err` if the pin cannot be used as an analog output or is not configured as an output.  

&#x20;<a href="#api-pin-analogRead-callback-err-value-" name="api-pin-analogRead-callback-err-value-">#</a> pin.<b>analogRead</b> ( `callback(err, value)` )    
Read the analog `value` from an analog input pin. The `value` is a number ranging from `0` to `1024`. Sets `err` if the pin cannot be used as an analog input or is not configured as an input.  

&#x20;<a href="#api-pin-analogReadSync-rarr-number-" name="api-pin-analogReadSync-rarr-number-">#</a> pin.<b>analogReadSync</b> () *&rarr; number*    
Read the analog `value` from an analog input pin synchronously and returns immediately. The `value` is a number ranging from `0` to `1024`. An error is thrown if the pin cannot be used as an analog input or is not configured as an input.  

&#x20;<a href="#api-pin-pwmWrite-value-callback-err-" name="api-pin-pwmWrite-value-callback-err-">#</a> pin.<b>pwmWrite</b> ( `value`, [`callback(err)`] )   
Write the analog `value` to a PWM output pin. The `value` is a number ranging from `0` to `255`. Sets `err` if the pin cannot be used as an PWM output or is not configured as an output.  

&#x20;<a href="#api-pin-setRiseListener-onrise-err-time-" name="api-pin-setRiseListener-onrise-err-time-">#</a> pin.<b>setRiseListener</b> ( `onrise(err, time)` )    
Sets a listener for a rising signal edge on `pin`.

&#x20;<a href="#api-pin-removeRiseListener-" name="api-pin-removeRiseListener-">#</a> pin.<b>removeRiseListener</b> ( )    
Removes the listener for rising signal edge.

&#x20;<a href="#api-pin-setFallListener-onfall-err-time-" name="api-pin-setFallListener-onfall-err-time-">#</a> pin.<b>setFallListener</b> ( `onfall(err, time)` )    
Sets a listener for a falling signal edge on `pin`.

&#x20;<a href="#api-pin-removeFallListener-" name="api-pin-removeFallListener-">#</a> pin.<b>removeFallListener</b> ( )    
Removes the listener for the falling signal edge.

### SPI
A SPI channel.

&#x20;<a href="#api-new-hardware-SPI-idx-" name="api-new-hardware-SPI-idx-">#</a> new hardware.<b>SPI</b> ( [`idx`] )    
Creates a SPI channel.

&#x20;<a href="#api-spi-initialize-onconnected-err-" name="api-spi-initialize-onconnected-err-">#</a> spi.<b>initialize</b> (`onconnected(err)`)    
Initializes the SPI channel.

&#x20;<a href="#api-spi-setClockSpeed-mhz-callback-err-" name="api-spi-setClockSpeed-mhz-callback-err-">#</a> spi.<b>setClockSpeed</b> ( `mhz`, [`callback(err)`] )   
Set the SPI output speed.  

&#x20;<a href="#api-spi-setCPOL-cpol-callback-err-" name="api-spi-setCPOL-cpol-callback-err-">#</a> spi.<b>setCPOL</b> ( `cpol`, [`callback(err)`] )   
Set CPOL (SPI polarity).  

&#x20;<a href="#api-spi-setCPHA-cpha-callback-err-" name="api-spi-setCPHA-cpha-callback-err-">#</a> spi.<b>setCPHA</b> ( `cpha`, [`callback(err)`] )   
Set CPHA (SPI bit significance).    

&#x20;<a href="#api-spi-transfer-cs-writebuf-readcount-callback-err-data-" name="api-spi-transfer-cs-writebuf-readcount-callback-err-data-">#</a> spi.<b>transfer</b> ( `cs`, `writebuf`, `readcount`, `callback(err, data)` )   
`cs` is the chip select pin, or `-1` if no pin should be toggled.  

&#x20;<a href="#api-spi-read-cs-readcount-callback-err-data-" name="api-spi-read-cs-readcount-callback-err-data-">#</a> spi.<b>read</b> ( `cs`, `readcount`, `callback(err, data)` )   
`cs` is the chip select pin, or `-1` if no pin should be toggled.  

&#x20;<a href="#api-spi-write-cs-writebuf-callback-err-" name="api-spi-write-cs-writebuf-callback-err-">#</a> spi.<b>write</b> ( `cs`, `writebuf`, `callback(err)` )   
`cs` is the chip select pin, or `-1` if no pin should be toggled.  

### I2C
An I2C channel.

&#x20;<a href="#api-new-hardware-I2C-idx-" name="api-new-hardware-I2C-idx-">#</a> new hardware.<b>I2C</b> ( [`idx`] )    
Creates an I2C channel.

&#x20;<a href="#api-i2c-initialize-onconnected-err-" name="api-i2c-initialize-onconnected-err-">#</a> i2c.<b>initialize</b> ( `onconnected(err)` )    
Initializes the I2C channel.

&#x20;<a href="#api-i2c-transfer-address-writebuf-readcount-callback-err-data-" name="api-i2c-transfer-address-writebuf-readcount-callback-err-data-">#</a> i2c.<b>transfer</b> ( `address`, `writebuf`, `readcount`, `callback(err, data)` )    
Transfers the array of bytes `writebuf` to the device signified by `address` with `readcount` bytes.

&#x20;<a href="#api-i2c-read-address-readcount-callback-err-data-" name="api-i2c-read-address-readcount-callback-err-data-">#</a> i2c.<b>read</b> ( `address`, `readcount`, `callback(err, data)` )    
Reads `readcount` bytes from the device with the `address` on the bus.

&#x20;<a href="#api-i2c-write-address-writebuf-callback-err-" name="api-i2c-write-address-writebuf-callback-err-">#</a> i2c.<b>write</b> ( `address`, `writebuf`, `callback(err)` )    
Writes the array of bytes `writebuf` to the device with the `address` on the bus.

### UART
A UART channel.

&#x20;<a href="#api-new-hardware-UART-idx-" name="api-new-hardware-UART-idx-">#</a> new hardware.<b>UART</b> ( [`idx`] )  
Creates a UART channel.

&#x20;<a href="#api-array-number-uart-baudRates-" name="api-array-number-uart-baudRates-">#</a> <i>array&lt;number&gt;</i>&nbsp; uart.<b>baudRates</b>   
An array of valid baud rates supported by the system.  

&#x20;<a href="#api-uart-initialize-onconnected-err-" name="api-uart-initialize-onconnected-err-">#</a> uart.<b>initialize</b> ( `onconnected(err)` )   
Initializes the UART connection.  

&#x20;<a href="#api-uart-setBaudRate-rate-callback-err-" name="api-uart-setBaudRate-rate-callback-err-">#</a> uart.<b>setBaudRate</b> ( `rate`, `callback(err)` )   
Sets the baud `rate` to a valid rate in `baudRates`.

&#x20;<a href="#api-uart-setDataListener-ondata-err-data-" name="api-uart-setDataListener-ondata-err-data-">#</a> uart.<b>setDataListener</b> ( `ondata(err, data)` )   
Set the new data listener function.  

&#x20;<a href="#api-uart-removeDataListener-" name="api-uart-removeDataListener-">#</a> uart.<b>removeDataListener</b>   
Removes datas listener attached to the port.  

&#x20;<a href="#api-uart-write-buf-callback-err-" name="api-uart-write-buf-callback-err-">#</a> uart.<b>write</b> ( `buf`, `callback(err)` )   
Writes a buffer to the UART connection.

### Signal
Signal output via buffers and simple animation protocols. High speed signals are implementation-dependent and use their own signal indexing scheme.

&#x20;<a href="#api-new-hardware-Signal-interface-signalidx-" name="api-new-hardware-Signal-interface-signalidx-">#</a> new hardware.<b>Signal</b> ( `interface`, `signalidx` )    
Creates a signal channel.

&#x20;<a href="#api-number-signal-maxSpeed" name="api-number-signal-maxSpeed">#</a> <i>number</i>&nbsp; signal.<b>maxSpeed</b>  
The maximum speed (in MHz) at which a signal can be emitted.

&#x20;<a href="#api-number-signal-idleBit-0-" name="api-number-signal-idleBit-0-">#</a> <i>number</i>&nbsp; signal.<b>idleBit</b> = 0   
The bit, truthy for HIGH and otherwise LOW, to be output while there is no signal. This value is writeable.  

&#x20;<a href="#api-signal-initialize-onconnected-err-" name="api-signal-initialize-onconnected-err-">#</a> signal.<b>initialize</b> ( `onconnected(err)` )   
Initializes the signal connection.

&#x20;<a href="#api-signal-setClockSpeed-MHz-callback-err-" name="api-signal-setClockSpeed-MHz-callback-err-">#</a> signal.<b>setClockSpeed</b> ( `MHz`, [`callback(err)`] )   
Set the signal output speed from `0` to `maxSpeed`.  

&#x20;<a href="#api-signal-stop-callback-err-" name="api-signal-stop-callback-err-">#</a> signal.<b>stop</b> ( [`callback(err)`] )   
Stop an ongoing signal.  

&#x20;<a href="#api-signal-loop-buf-onrepeat-err-" name="api-signal-loop-buf-onrepeat-err-">#</a> signal.<b>loop</b> ( `buf`, [`onrepeat(err)`] )   
Repeat the buffered signal.  

&#x20;<a href="#api-signal-send-buf-onfinished-err-" name="api-signal-send-buf-onfinished-err-">#</a> signal.<b>send</b> ( `buf`, [`onfinished(err)`] )   
Send a signal, calling the callback when completed.  

&#x20;<a href="#api-signal-queue-buf-onfinished-err-" name="api-signal-queue-buf-onfinished-err-">#</a> signal.<b>queue</b> ( `buf`, [`onfinished(err)`] )   
Queue a signal for when the current signal completes.  


## License

MIT