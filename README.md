# Tessel API Documentation

Here is documentation for Tessel's hardware APIs.

<!--markdocs-->
<!--generated by https://github.com/tcr/markdocs-->

### Tessel
You can import Tessel into your project by using `var tessel = require('tessel')`.

```js
var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port
gpio.digital[1].writeSync(1);  // turn digital pin #1 high
```

&#x20;<a href="#api-array-Port-tessel-port-" name="api-array-Port-tessel-port-">#</a> <i>array&lt;Port&gt;</i>&nbsp; tessel<b>.port</b> = []  
A list of ports available on Tessel.

&#x20;<a href="#api-array-Pin-tessel-led-" name="api-array-Pin-tessel-led-">#</a> <i>array&lt;Pin&gt;</i>&nbsp; tessel<b>.led</b> = []  
An array of Pins available on the Tessel board.

### Pins
GPIO access for digital and analog signal lines. Each port exposes its available GPIO lines through the `.pin`, `.digital`, `.analog`, and `.pwm` arrays.

```js
var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port
gpio.digital.map(function (pin, i) {
	console.log('Value of digital pin', i, '=', pin.readSync());
})
gpio.analog.map(function (pin, i) {
	console.log('Value of analog pin', i, '=', pin.readSync() * pin.resolution, '/', pin.resolution);
})
```

&#x20;<a href="#api-array-number-port-digital-" name="api-array-number-port-digital-">#</a> <i>array&lt;number&gt;</i>&nbsp; port<b>.digital</b> = []  
An array of which pins are digital inputs/outputs.

&#x20;<a href="#api-array-number-port-analog-" name="api-array-number-port-analog-">#</a> <i>array&lt;number&gt;</i>&nbsp; port<b>.analog</b> = []  
An array of which pins are analog inputs/outputs.

&#x20;<a href="#api-array-number-port-pwm-" name="api-array-number-port-pwm-">#</a> <i>array&lt;number&gt;</i>&nbsp; port<b>.pwm</b> = []  
An array of which pins are PWM outputs (may overlap analog array).

&#x20;<a href="#api-array-number-port-pin-" name="api-array-number-port-pin-">#</a> <i>array&lt;number&gt;</i>&nbsp; port<b>.pin</b> = []  
An array of all pins on the port. You can differentiate them by their `.type` and `.isPWM` attributes.

&#x20;<a href="#api-new-port-Pin-pin-dir-or-initialOutput-" name="api-new-port-Pin-pin-dir-or-initialOutput-">#</a> <i>new</i>&nbsp; port<b>.Pin</b> ( pin, dir *or* initialOutput )  
Create and return `pin` object. If `dir` is "input" or "output", the direction is set to that value immediately. Otherwise, the pin is written to with the value of `initialOutput`. 

&#x20;<a href="#api-string-pin-type" name="api-string-pin-type">#</a> <i>string</i>&nbsp; pin<b>.type</b>  
"digital" or "analog".

&#x20;<a href="#api-boolean-pin-isPWM" name="api-boolean-pin-isPWM">#</a> <i>boolean</i>&nbsp; pin<b>.isPWM</b>  
Whether the `pin.type` is set to `"analog"` and output type is PWM (thus not true analog).

&#x20;<a href="#api-boolean-pin-readable" name="api-boolean-pin-readable">#</a> <i>boolean</i>&nbsp; pin<b>.readable</b>  
Whether the pin is readable.

&#x20;<a href="#api-boolean-pin-writeable" name="api-boolean-pin-writeable">#</a> <i>boolean</i>&nbsp; pin<b>.writeable</b>  
Whether the pin is writeable.

&#x20;<a href="#api-number-pin-resolution" name="api-number-pin-resolution">#</a> <i>number</i>&nbsp; pin<b>.resolution</b>  
Digital pins: 1. Analog pins: ADC resolution of output pins (e.g. 1024 for Tessel).

&#x20;<a href="#api-string-pin-direction" name="api-string-pin-direction">#</a> <i>string</i>&nbsp; pin<b>.direction</b>  
"output" or "input".

&#x20;<a href="#api-pin-setInput-callback-err-" name="api-pin-setInput-callback-err-">#</a> pin<b>.setInput</b>( [callback(err)] )  
Set `pin` to be an input. Sets `err` if the pin cannot be used as an input. 

&#x20;<a href="#api-pin-setOutput-initial-callback-err-" name="api-pin-setOutput-initial-callback-err-">#</a> pin<b>.setOutput</b> ( [initial], [callback(err)] )   
Set `pin` to be an output. Sets `err` if the pin cannot be used as an output.  

&#x20;<a href="#api-pin-write-value-callback-err-" name="api-pin-write-value-callback-err-">#</a> pin<b>.write</b> ( value, [callback(err)] )   
Write the `value` to an output pin. Digital pins: output is set HIGH if `value` is truthy, otherwise LOW. Analog pins: `value` is a float that sets the analog output value. Sets `err` if the pin cannot be used as a digital output or is not configured as an output.

&#x20;<a href="#api-pin-writeSync-value-" name="api-pin-writeSync-value-">#</a> pin<b>.writeSync</b> ( value )  
Synchronous version of `pin.write`. Throws on error.

&#x20;<a href="#api-pin-read-callback-err-value-" name="api-pin-read-callback-err-value-">#</a> pin<b>.read</b> ( callback(err, value) )   
Read a digital `value` from a digital input pin. `1` is returned if the value is HIGH, otherwise `0` if LOW. Sets `err` if the pin cannot be used as a digital input or is not configured as an input. An error is given to the callback if the pin cannot be used as a digital input or is not configured as an input.

&#x20;<a href="#api-pin-readSync-number" name="api-pin-readSync-number">#</a> pin<b>.readSync</b> () &rarr; <i>number</i>  
Synchronous version of `pin.read`. Throws on error.

&#x20;<a href="#api-pin-watch-type-callback-err-time-" name="api-pin-watch-type-callback-err-time-">#</a> pin<b>.watch</b> ( [type,] callback(err, time) )    
Sets a listener for a signal edge on `pin`. `type` can be one of "rise", "fall", "both", or omitted (analogous to "both"). Watched events registers events on the `pin` object, with the same `type` as the event.

&#x20;<a href="#api-pin-unwatch-type-listener-" name="api-pin-unwatch-type-listener-">#</a> pin<b>.unwatch</b> ( [type,] listener )  
Removes the listener for a signal.

### SPI
A SPI channel.

```js
var port = tessel.port['A'];
var spi = new port.SPI()
spi.setClockSpeed(4*1000*1000) // 4MHz
spi.setCPOL(1) // polarity
spi.setCPHA(0) // bit significance
spi.on('ready', function () {
	spi.transfer(new Buffer([0xde, 0xad, 0xbe, 0xef]), function (err, rx) {
		console.log('buffer returned by SPI slave:', rx);
	})
})
```

&#x20;<a href="#api-new-port-SPI-idx-options-" name="api-new-port-SPI-idx-options-">#</a> <i>new</i>&nbsp; port<b>.SPI</b> ( [idx,] [options] )   
Creates a SPI channel. `idx` is an optional index for selecting a SPI port, defaulting to 0. (On Tessel, there is only one SPI channel per port.)

&#x20;<a href="#api-spi-setClockSpeed-mhz-callback-err-" name="api-spi-setClockSpeed-mhz-callback-err-">#</a> spi<b>.setClockSpeed</b> ( mhz, [callback(err)] )   
Set the SPI output speed to the number `mhz`.

&#x20;<a href="#api-spi-setCPOL-cpol-callback-err-" name="api-spi-setCPOL-cpol-callback-err-">#</a> spi<b>.setCPOL</b> ( cpol, [callback(err)] )   
Set CPOL (SPI polarity). 

&#x20;<a href="#api-spi-setCPHA-cpha-callback-err-" name="api-spi-setCPHA-cpha-callback-err-">#</a> spi<b>.setCPHA</b> ( cpha, [callback(err)] )   
Set CPHA (SPI bit significance).

&#x20;<a href="#api-spi-transfer-txbuf-rxbuf-callback-err-rxbuf-" name="api-spi-transfer-txbuf-rxbuf-callback-err-rxbuf-">#</a> spi<b>.transfer</b> ( txbuf, [rxbuf,] callback(err, rxbuf) )  
Transfers a Buffer `txbuf` to the client and receives a response in `rxbuf`. If `rxbuf` is passed in, it is used as the receive buffer. Otherwise, a new buffer is allocated.

&#x20;<a href="#api-spi-transferSync-txbuf-Buffer" name="api-spi-transferSync-txbuf-Buffer">#</a> spi<b>.transferSync</b> ( txbuf ) &rarr; <i>Buffer</i>  
Synchronous version of `spi.transfer`. Throws on error.

&#x20;<a href="#api-spi-receive-len-rxbuf-callback-err-rxbuf-" name="api-spi-receive-len-rxbuf-callback-err-rxbuf-">#</a> spi<b>.receive</b> ( len, [rxbuf,] callback(err, rxbuf) )   
Reads `len` bytes from a client. If `rxbuf` is passed in, it is used as the receive buffer. Otherwise, a new buffer is allocated.

&#x20;<a href="#api-spi-receiveSync-len-Buffer" name="api-spi-receiveSync-len-Buffer">#</a> spi<b>.receiveSync</b> ( len ) &rarr; <i>Buffer</i>  
Synchronous version of `spi.receive`. Throws on error.

&#x20;<a href="#api-spi-send-txbuf-callback-err-" name="api-spi-send-txbuf-callback-err-">#</a> spi<b>.send</b> ( txbuf, callback(err) )   
Sends a Buffer `txbuf` to the client.

&#x20;<a href="#api-spi-sendSync-txbuf-" name="api-spi-sendSync-txbuf-">#</a> spi<b>.sendSync</b> ( txbuf )  
Synchronous version of `spi.send`. Throws on error.

### I2C
An I2C channel.

```js
var port = tessel.port['A'];
var slaveAddress = 0xDE;
var i2c = new port.I2C(slaveAddress)
i2c.on('ready', function () {
	i2c.transfer(new Buffer([0xde, 0xad, 0xbe, 0xef]), function (err, rx) {
		console.log('buffer returned by I2C slave ('+slaveAddress.toString(16)+'):', rx);
	})
})
```

&#x20;<a href="#api-new-port-I2C-address-idx-" name="api-new-port-I2C-address-idx-">#</a> <i>new</i>&nbsp; port<b>.I2C</b> ( address, [idx] )    
Creates an I2C channel for a device of a specific `address`. Multiple I2C channels can be used in parallel.

&#x20;<a href="#api-i2c-use-onconnected-err-" name="api-i2c-use-onconnected-err-">#</a> i2c<b>.use</b> ( onconnected(err) )    
Initializes the I2C channel.

&#x20;<a href="#api-i2c-transfer-txbuf-rxbuf-callback-err-rxbuf-" name="api-i2c-transfer-txbuf-rxbuf-callback-err-rxbuf-">#</a> i2c<b>.transfer</b> ( txbuf, [rxbuf,] callback(err, rxbuf) )  
Transfers a Buffer `txbuf` to the client and receives a response in `rxbuf`. If `rxbuf` is passed in, it is used as the receive buffer. Otherwise, a new buffer is allocated.

&#x20;<a href="#api-i2c-transferSync-txbuf-Buffer" name="api-i2c-transferSync-txbuf-Buffer">#</a> i2c<b>.transferSync</b> ( txbuf ) &rarr; <i>Buffer</i>  
Synchronous version of `i2c.transfer`. Throws on error.

&#x20;<a href="#api-i2c-receive-len-rxbuf-callback-err-rxbuf-" name="api-i2c-receive-len-rxbuf-callback-err-rxbuf-">#</a> i2c<b>.receive</b> ( len, [rxbuf,] callback(err, rxbuf) )   
Reads `len` bytes from a client. If `rxbuf` is passed in, it is used as the receive buffer. Otherwise, a new buffer is allocated.

&#x20;<a href="#api-i2c-receiveSync-len-Buffer" name="api-i2c-receiveSync-len-Buffer">#</a> i2c<b>.receiveSync</b> ( len ) &rarr; <i>Buffer</i>  
Synchronous version of `i2c.receive`. Throws on error.

&#x20;<a href="#api-i2c-send-txbuf-callback-err-" name="api-i2c-send-txbuf-callback-err-">#</a> i2c<b>.send</b> ( txbuf, callback(err) )   
Sends a Buffer `txbuf` to the client.

&#x20;<a href="#api-i2c-sendSync-txbuf-" name="api-i2c-sendSync-txbuf-">#</a> i2c<b>.sendSync</b> ( txbuf )  
Synchronous version of `i2c.send`. Throws on error.

### UART
A UART channel.

```js
var port = tessel.port['A'];
var uart = new port.UART({
	baudrate: 115200
})
uart.on('ready', function () {
	uart.write('ahoy hoy\n')
	uart.on('data', function (data) {
		console.log('received:', data);
	})

	// UART objects are streams!
	// pipe all incoming data to stdout:
	uart.pipe(process.stdout);
})
```

&#x20;<a href="#api-new-port-UART-idx-options-implements-DuplexStream" name="api-new-port-UART-idx-options-implements-DuplexStream">#</a> <i>new</i>&nbsp; port<b>.UART</b> ( [idx[, options]] ) implements DuplexStream  
Creates a UART channel. Defaults: `{"baudrate": 9600, "dataBits": 8, "parity": "even", "stopBits": 2}`

&#x20;<a href="#api-array-number-uart-baudRates-" name="api-array-number-uart-baudRates-">#</a> <i>array&lt;number&gt;</i>&nbsp; uart<b>.baudRates</b> = []  
An array of valid baud rates supported by the system.  

&#x20;<a href="#api-uart-setBaudRate-rate-callback-err-" name="api-uart-setBaudRate-rate-callback-err-">#</a> uart<b>.setBaudRate</b> ( rate, callback(err) )   
Sets the baud `rate` to a valid rate in `baudRates`.

&#x20;<a href="#api-uart-setDataBits-bits-callback-err-" name="api-uart-setDataBits-bits-callback-err-">#</a> uart<b>.setDataBits</b> ( bits, callback(err) )   
Sets the number of data `bits` to the number 5, 6, 7, or 8.

&#x20;<a href="#api-uart-setStopBits-bits-callback-err-" name="api-uart-setStopBits-bits-callback-err-">#</a> uart<b>.setStopBits</b> ( bits, callback(err) )   
Sets the number of data `bits` to the number 1 or 2.

&#x20;<a href="#api-uart-setParity-parity-callback-err-" name="api-uart-setParity-parity-callback-err-">#</a> uart<b>.setParity</b> ( parity, callback(err) )   
Sets the `parity` to the value "none", "odd", or "even".

&#x20;<a href="#api-uart-emits-data-" name="api-uart-emits-data-">#</a> uart &rarr; <i>emits "data"</i>  
Set the new data listener function.  

&#x20;<a href="#api-uart-write-buf-callback-err-" name="api-uart-write-buf-callback-err-">#</a> uart<b>.write</b> ( buf, callback(err) )   
Writes a buffer to the UART connection.

&#x20;<a href="#api-uart-writeSync-buf-" name="api-uart-writeSync-buf-">#</a> uart<b>.writeSync</b> ( buf )   
Synchronous version of `uart.write`. Throws on error.

### Signal [Not yet implemented]
Signal output via buffers and simple animation protocols. High speed signals are implementation-dependent and use their own signal indexing scheme.

&#x20;<a href="#api-new-port-Signal-interface-signalidx-" name="api-new-port-Signal-interface-signalidx-">#</a> <i>new</i>&nbsp; port<b>.Signal</b> ( interface, signalidx )    
Creates a signal channel.

&#x20;<a href="#api-number-signal-maxSpeed" name="api-number-signal-maxSpeed">#</a> <i>number</i>&nbsp; signal<b>.maxSpeed</b>  
The maximum speed (in MHz) at which a signal can be emitted.

&#x20;<a href="#api-number-signal-idleBit-0-" name="api-number-signal-idleBit-0-">#</a> <i>number</i>&nbsp; signal<b>.idleBit</b> = 0   
The bit, truthy for HIGH and otherwise LOW, to be output while there is no signal. This value is writeable.  

&#x20;<a href="#api-signal-initialize-onconnected-err-" name="api-signal-initialize-onconnected-err-">#</a> signal<b>.initialize</b> ( onconnected(err) )   
Initializes the signal connection.

&#x20;<a href="#api-signal-setClockSpeed-MHz-callback-err-" name="api-signal-setClockSpeed-MHz-callback-err-">#</a> signal<b>.setClockSpeed</b> ( MHz, [callback(err)] )   
Set the signal output speed from `0` to `maxSpeed`.  

&#x20;<a href="#api-signal-stop-callback-err-" name="api-signal-stop-callback-err-">#</a> signal<b>.stop</b> ( [callback(err)] )   
Stop an ongoing signal.  

&#x20;<a href="#api-signal-loop-buf-onrepeat-err-" name="api-signal-loop-buf-onrepeat-err-">#</a> signal<b>.loop</b> ( buf, [onrepeat(err)] )   
Repeat the buffered signal.  

&#x20;<a href="#api-signal-send-buf-onfinished-err-" name="api-signal-send-buf-onfinished-err-">#</a> signal<b>.send</b> ( buf, [onfinished(err)] )   
Send a signal, calling the callback when completed.  

&#x20;<a href="#api-signal-queue-buf-onfinished-err-" name="api-signal-queue-buf-onfinished-err-">#</a> signal<b>.queue</b> ( buf, [onfinished(err)] )   
Queue a signal for when the current signal completes.  

<!--/markdocs-->

## License

MIT


<!--
Inspiration!
https://github.com/fivdi/onoff
https://github.com/rwaldron/johnny-five
https://github.com/jgautier/firmata
-->