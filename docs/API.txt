# Tessel

Tessel is the root object for each of the different ports on the device.

```js
var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port
gpio.digital[1].writeSync(1);  // turn digital pin #1 high
```


map<Port> tessel.port = {}
A list of ports available on Tessel. Keys for this are `"A"`, `"B"`, `"C"`, `"D"`, or `"GPIO"`.

array<Pin> tessel.led = []
An array of LEDs available on the Tessel board (1&ndash;4). These are [`Pin` objects](#pins).

```js
// Toggle an LED every 200ms 
(function blink (value) {
	tessel.led[1].writeSync(value);
	setTimeout(blink, 200, !value);
})(true)
```

# Pins

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

string port.id
The unique ID of this port. On Tessel, this would be one of `"A"`, `"B"`, `"C"`, `"D"`, or `"GPIO"`.


array<number> port.digital = []
An array of which pins are digital inputs/outputs.

array<number> port.analog = []
An array of which pins are analog inputs/outputs.

array<number> port.pwm = []
An array of which pins are PWM outputs (may overlap analog array).

array<number> port.pin = []
An array of all pins on the port. You can differentiate them by their `.type` and `.isPWM` attributes.


new port.Pin ( `pin`, `dir` or `initialOutput` )
Create and return `pin` object. If `dir` is "input" or "output", the direction is set to that value immediately. Otherwise, the pin is written to with the value of `initialOutput`. 

string pin.type
"digital" or "analog".

boolean pin.isPWM
Whether the `pin.type` is set to `"analog"` and output type is PWM (thus not true analog).

boolean pin.readable
Whether the pin is readable.

boolean pin.writeable
Whether the pin is writeable.

number pin.resolution
Digital pins: 1. Analog pins: ADC resolution of output pins (e.g. 1024 for Tessel).

string pin.direction
"output" or "input".

pin.setInput( [callback(err)] )
Set `pin` to be an input. Sets `err` if the pin cannot be used as an input. 

pin.setOutput ( [`initial`], [callback(err)] ) 
Set `pin` to be an output. Sets `err` if the pin cannot be used as an output.  


pin.write ( `value`, [`callback(err)`] ) 
Write the `value` to an output pin. Digital pins: output is set HIGH if `value` is truthy, otherwise LOW. Analog pins: `value` is a float that sets the analog output value. Sets `err` if the pin cannot be used as a digital output or is not configured as an output.

pin.writeSync ( `value` )
Synchronous version of `pin.write`. Throws on error.

pin.read ( `callback(err, value)` ) 
Read a digital `value` from a digital input pin. `1` is returned if the value is HIGH, otherwise `0` if LOW. Sets `err` if the pin cannot be used as a digital input or is not configured as an input. An error is given to the callback if the pin cannot be used as a digital input or is not configured as an input.

pin.readSync () -> number
Synchronous version of `pin.read`. Throws on error.


pin.watch ( [type,] callback(err, time) )  
Sets a listener for a signal edge on `pin`. `type` can be one of "rise", "fall", "both", or omitted (analogous to "both"). Watched events registers events on the `pin` object, with the same `type` as the event.

pin.unwatch ( [type,] listener )
Removes the listener for a signal.



# SPI

A SPI channel.

```js
var port = tessel.port['A'];
var spi = new port.SPI({
	clockSpeed: 4*1000*1000, // 4MHz
	cpol: 1, // polarity
	cpha: 0, // clock phase
});
spi.on('ready', function () {
	spi.transfer(new Buffer([0xde, 0xad, 0xbe, 0xef]), function (err, rx) {
		console.log('buffer returned by SPI slave:', rx);
	})
})
```

new port.SPI ( [options] ) 
Creates a SPI object. Options is an object specifying any of the following:

* **channel** (optional) &mdash; An optional numeric index for selecting a SPI channel. Defaults to the first (or only) SPI channel.
* **clockSpeed** (default `100000`) &mdash; SPI clock speed in Hz.
* **cpol** (default `0`) &mdash; Clock polarity. Options are 0 or 1, or 'low' and 'high'.
* **cpha** (default `0`) &mdash; Clock phase. Options are 0 or 1, or 'first' and 'second'.
* **dataMode** (default `0`) &mdash; An alternative to defining **cpol** and **cpha** explicitly, you can [use mode numbers](http://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus#Mode_numbers).
* **bitOrder** (default `"msb"`) &mdash; Bit order, most significant bit first or least. Options are 'msb' or 'lsb'.
* **frameMode** (default `"normal"`) &mdash; SPI frame format. Only one format is supported at the moment, `"normal"`.
* **chipSelect** (default `null`) &mdash; Pin to use as a default chip select pin. If a pin is specified, this pin is toggled in master mode whenever data is to be sent/received on the bus.
* **chipSelectActive** (default `"low"`) &mdash; If a **chipSelect** pin is specified, this defines the polarity of the CS line when *active*.
* **role** (default `master`) &mdash; Determines the role the SPI channel plays, either "master" or "slave". (Slave currently not supported.)

/*

spi.setClockSpeed ( mhz, [callback(err)] ) 
Set the SPI output speed to the number `mhz`.

spi.setCPOL ( `cpol`, [`callback(err)`] ) 
Set CPOL (SPI polarity). 

spi.setCPHA ( `cpha`, [`callback(err)`] ) 
Set CPHA (SPI bit significance).

*/

spi.transfer ( txbuf, callback(err, rxbuf) )
Transfers a Buffer `txbuf` to the slave and receives a response in `rxbuf`. 

spi.transferSync ( txbuf ) -> Buffer
Synchronous version of `spi.transfer`. Throws on error.

spi.receive ( len, callback(err, rxbuf) ) 
Reads `len` bytes from a slave.

spi.receiveSync ( len ) -> Buffer
Synchronous version of `spi.receive`. Throws on error.

spi.send ( txbuf, callback(err) ) 
Sends a Buffer `txbuf` to the slave.

spi.sendSync ( txbuf )
Synchronous version of `spi.send`. Throws on error.

spi -> emits "ready"
Emitted when the connection has begun. Code should wait until the "ready" event is fired before performing operations.


# I2C

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

new port.I2C ( address, options, [idx] )  
Creates an I2C channel for a device of a specific `address`. Multiple I2C channels can be used in parallel. Options is an object specifying any of the following:

* **role** (default `master`) &mdash; Determines the role the I2C channel plays, either "master" or "slave".

i2c.transfer ( txbuf, [rxbuf,] callback(err, rxbuf) )
Transfers a Buffer `txbuf` to the client and receives a response in `rxbuf`. If `rxbuf` is passed in, it is used as the receive buffer. Otherwise, a new buffer is allocated.

i2c.transferSync ( txbuf ) -> Buffer
Synchronous version of `i2c.transfer`. Throws on error.

i2c.receive ( len, [rxbuf,] callback(err, rxbuf) ) 
Reads `len` bytes from a client. If `rxbuf` is passed in, it is used as the receive buffer. Otherwise, a new buffer is allocated.

i2c.receiveSync ( len ) -> Buffer
Synchronous version of `i2c.receive`. Throws on error.

i2c.send ( txbuf, callback(err) ) 
Sends a Buffer `txbuf` to the client.

i2c.sendSync ( txbuf )
Synchronous version of `i2c.send`. Throws on error.

i2c -> emits "ready"
Emitted when the connection has begun. Code should wait until the "ready" event is fired before performing operations.


# UART

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

new port.UART ( [`idx`[, `options`]] ) implements DuplexStream
Creates a UART channel. Defaults: `{"baudrate": 9600, "dataBits": 8, "parity": "even", "stopBits": 2}`


array<number> uart.baudRates = []
An array of valid baud rates supported by the system.  
 

uart.setBaudRate ( `rate`, `callback(err)` ) 
Sets the baud `rate` to a valid rate in `baudRates`.

uart.setDataBits ( `bits`, `callback(err)` ) 
Sets the number of data `bits` to the number 5, 6, 7, or 8.

uart.setStopBits ( `bits`, `callback(err)` ) 
Sets the number of data `bits` to the number 1 or 2.

uart.setParity ( `parity`, `callback(err)` ) 
Sets the `parity` to the value "none", "odd", or "even".


uart.write ( `buf`, `callback(err)` ) 
Writes a buffer to the UART connection.

uart.writeSync ( `buf` ) 
Synchronous version of `uart.write`. Throws on error.


uart -> emits "ready"
Emitted when the connection has begun. Code should wait until the "ready" event is fired before performing operations.

uart -> emits "data"
Data that arrives over the UART channel is sent as a Node.js stream.


# Signal [Not yet implemented]

Signal output via buffers and simple animation protocols. High speed signals are implementation-dependent and use their own signal indexing scheme.

new port.Signal ( `interface`, `signalidx` )  
Creates a signal channel.

number signal.maxSpeed
The maximum speed (in MHz) at which a signal can be emitted.

number signal.idleBit = 0 
The bit, truthy for HIGH and otherwise LOW, to be output while there is no signal. This value is writeable.  


signal.initialize ( `onconnected(err)` ) 
Initializes the signal connection.

signal.setClockSpeed ( `MHz`, [`callback(err)`] ) 
Set the signal output speed from `0` to `maxSpeed`.  

signal.stop ( [`callback(err)`] ) 
Stop an ongoing signal.  

signal.loop ( `buf`, [`onrepeat(err)`] ) 
Repeat the buffered signal.  

signal.send ( `buf`, [`onfinished(err)`] ) 
Send a signal, calling the callback when completed.  

signal.queue ( `buf`, [`onfinished(err)`] ) 
Queue a signal for when the current signal completes.  
