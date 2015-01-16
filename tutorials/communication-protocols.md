#Tessel Module Communication Protocols
Each of the four ports on the Tessel exposes ten pins for use in creating custom modules. Two of the pins are for power (3.3V and ground) and the other eight are digital pins that can be used to communicate with your module.

All eight communication pins speak in terms of simple on/off states, but only three of them (the GPIO pins) are meant to be controlled manually. The rest, when grouped in pre-defined ways, are capable of encoding complex messages by having their state rapidly toggled in accordance with various protocols. It's a lot like [Morse code](http://en.wikipedia.org/wiki/Morse_code), but for electronics.

In embedded electronics, there are four common protocols and Tessel [supports them all in JavaScript](https://tessel.io/docs/hardwareAPI).

  * [GPIO](#gpio)
  * [SPI](#spi)
  * [I2C](#i2c)
  * [UART](#uart)

This guide will provide a brief overview of the protocols and cover some of the strengths and weaknesses of each.

##Quick Reference
Most of the time, you will choose your protocol based on the parts you are using when designing your module. Other things to consider are the pins you have available, as well as your communication speed requirements. The following table can be used as a quick reference for the more detailed explanations of each protocol below.

| Protocol 	|          # Pins Required          	    |               Supported Ports               	|            Max Speed            	| Example Modules 	|
|:--------:	|:---------------------------------:	    |:-------------------------------------------:	|:-------------------------------:	|:---------------:	|
| GPIO     	|          **1** (G1,G2 or G3)          	| A,B,C,D                                     	| 1kHz                            	| [All Modules](https://tessel.io/modules)                	|
| SPI      	| **3+** (MOSI, MISO, SCK + 1 GPIO pin) 	| A,B,C,D                                     	| 25MBit/s                        	| <a href="https://github.com/tessel/ambient-attx4"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/ambient.png" height="30px"/></a> <a href="https://github.com/tessel/audio-vs1053b"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/audio.png" height="30px"/></a> <a href="https://github.com/tessel/camera-vc0706"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/camera.png" height="30px"/></a> <a href="https://github.com/tessel/sdcard"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/sdcard.png" height="30px"/></a> <a href="https://github.com/tessel/rf-nrf24"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/nrf.png" height="30px"/></a> <a href="https://github.com/tessel/ir-attx4"><img src="https://projects.tessel.io/img/modules/infrared.svg" height=30/></a>               	|
| I2C      	|          **2** (SCL and SDA)          	| A,B (shared bus I2C1) C,D (shared bus I2C0) 	| I2C0 - 1Mbit/s I2C1 - 400kbit/s 	| <a href="https://github.com/tessel/accel-mma84"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/accelerometer.png" height=30/></a> <a href="https://github.com/tessel/climate-si7005"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/climate.png" height=30/></a> <a href="https://github.com/tessel/rfid-pn532"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/rfid.png" height=30/></a> <a href="https://github.com/tessel/servo-pca9685"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/servo.png" height=30/></a>                	|
| UART     	|           **2** (TX and RX)           	| A,B,D - hardware C - software               	| 8Mbit/s                         	|  <a href="https://github.com/tessel/ble-ble113a"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/ble.png" height=30/></a> <a href="https://github.com/tessel/camera-vc0706"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/camera.png" height=30/></a> <a href="https://github.com/tessel/gps-a2235h"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/gps.png" height=30/></a> <a href="https://github.com/tessel/gprs-sim900"><img src="https://s3.amazonaws.com/technicalmachine-assets/technical-io/modules/gprs.png" height=30/></a>             	|

##A Note on Level Shifting
All of the diagrams and discussions below regarding communication protocols assume that the hardware modules you are communicating with operate at 3.3V, just like the Tessel.

If you have a device on your custom module that operates at 5V, 1.8V, or any other non-3.3V voltage, be careful! Directly connecting components with different operating voltages can damage the Tessel and/or your device.

You can use devices which operate at different voltages by employing a technique called 'level shifting'. Sparkfun has a [nice writeup on voltage dividers and level shifting][level_shifting] that can be used as a starting point.

The easiest way to avoid this complication is by trying to find module components that natively work at 3.3V.

<a name="gpio"></a>
##GPIO
**Pros:** Simple, Requires a single pin

**Cons:** Not good for sending complex data

By far the simplest form of communication is via General Purpose Input/Output (GPIO). GPIO isn't really a 'protocol'. It is a rudimentary form of communication where you manually (in code) turn a pin on and off or read its state.

Each port on the Tessel exposes three GPIO pins that can serve as a digital input or output and are marked as G1, G2, and G3.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/gpio_blowout.jpg" /></h1>

<p style="text-align:center"><em>GPIO pins available on a Tessel module port: G1, G2, and G3</em></p>

By default, Tessel's GPIO pins are configured to be inputs.

####Input
When acting as a digital input, a pin can be queried in software and will return a value indicating the current state of the pin: high (1 or true) or low (0 or false).

The following code snippet is an example of querying the G1 pin on port A.

```js
var tessel = require('tessel'); // Import tessel
var portA = tessel.port['A']; // Select Port A
var myInputPin = portA.pin['G1']; // Assign the G1 pin to a variable

var pinState = myInputPin.read(); // Query the state of the pin
```

This is great for connecting things like [switches, buttons][button_post], and even [motion detectors][pir_project]. Just remember that the Tessel can only handle signals that are 3.3V or lower.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/product+pics/2014+05+15+production+modules/microsd.jpg" height="200px"/></h1>

<p style="text-align:center"><em>The [MicroSD Card Module][sd_module] uses a GPIO pin acting as an input to detect whether a card is inserted or not.</em></p>

#####Determining digital state– a note for the curious:

It's pretty clear that if an input pin sees 3.3V it would be interpreted as a high state and if the pin is connected to ground it would recognize that as a low state. But what if the pin senses something in between, like 2V?

Your first thought might be that a high state is anything 1.65V (halfway between 0 and 3.3) or higher, and anything lower than that would be considered the low state. However, this is not always the case.

The high/low threshold is always determined by the main processor. In the case of the Tessel, that's the LPC1830. The documentation on the LPC1830 tells us that the Tessel will consider an input to be high if it is at least 70% of the Tessel's supply voltage (VDD) which is 3.3V. It also tells us that any signal that is 30% of VDD or lower is guaranteed to be read as a low state. That means anything 2.31V (referenced as VIH) or higher would be considered high, and anything .99V (referenced as VIL) or lower is guaranteed to be interpreted as a low state.

What about the voltages between .99V and 2.31V? The read behavior is undefined and you are not guaranteed to get an accurate result. That's one reason why it's important to make sure that any module you connect to a Tessel input pin provides a high voltage that is between VIH and 3.3V and a low voltage between ground and VIL.

[More GPIO example code and information][gpio_code_example]

####Output
When acting as a digital output, a pin can be set to one of two states: high (on/1/true) or low (off/0/false).
High means the main Tessel board will set that pin to be 3.3V and low means it will set it to 0V.

Digital output is useful for connected hardware that understands simple on/off states. The following code snippet shows how you can set the state of the G2 pin on port B.

```js
var tessel = require('tessel'); // Import tessel
var portB = tessel.port['B']; // Select Port B
var myOutputPin = portB.pin['G2']; // Assign the G2 pin to a variable

// Set the pin state with ones and zeroes
myOutputPin.output(1); // Set the pin high
myOutputPin.output(0); // Set the pin low

// Or use booleans
myOutputPin.output(false);
myOutputPin.output(true);
```

Some examples of using a GPIO pin as an output are [simple LEDs][led_example] and for turning appliances on and off with a [relay][relay_module].

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/320px-5mm_Red_LED.jpg" /></h1>

<p style="text-align:center"><em>An output pin is perfect for controlling an LED. Image is licensed under the [Creative Commons Attribution-Share Alike 2.0 Generic](http://creativecommons.org/licenses/by-sa/2.0/deed.en) license.</em></p>

[More GPIO example code and information][gpio_code_example]

###Tessel Modules That Use The GPIO Protocol
Every Tessel First party module uses the GPIO protocol in some fashion.
The [MicroSD Card Module][sd_module] uses a digital input to detect state on a module.
The [Accelerometer Module][accel_module] uses a digital input to detect a data interrupt from the sensor.
The [Relay Module][relay_module] uses digital outputs to turn things on and off.

<a name="spi"></a>
##SPI
**Pros:** Fast, supports multiple devices on a single bus, allows two-way communication

**Cons:** Requires at least 3 pins

SPI stands for [Serial Peripheral Interface][spi_wikipedia]. The SPI protocol allows data to be exchanged one byte at a time between the Tessel and a module via two communication lines.
This is great for transferring data like sensor readings or sending commands to a module.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/spi_blowout.jpg" /></h1>

<p style="text-align:center"><em>SPI pins SCK, MISO, and MOSI on Port B of the Tessel</em></p>

The SPI protocol is known as a Master/Slave protocol, which means that there is always a single master device which controls the flow of communication with one or more slave devices. Think of the master as a traffic cop. It directs all of the connected slave devices so they know when it's their turn to communicate.

When you are creating modules, the Tessel will always act as the master device, and your custom module will be a slave device.

The SPI protocol requires a minimum of three signal connections and usually has four (this is in addition to the power connections). The following diagram shows the connections (arrows indicate flow of data).

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/Simple_SPI.png" /></h1>

<p style="text-align:center"><em>The red lines constitute the shared bus connections used for talking to the slave devices. The green wire is the shared bus connection used by the slaves to talk to the master. The blue line is the chip select for signaling each slave individually.</em></p>


####SCK
This is the clock signal that keeps the Tessel and the module synchronized while transferring data. The two devices need to have a mutual understanding of how fast data is to be transferred between them.
This is sometimes referred to as the baud or bitrate.
The clock signal provides that reference signal for the devices to use when exchanging data.

Without a clock signal to synchronize the devices, the devices would have no way to interpret the signal on the data lines.

One bit of data is transferred with each clock cycle (see the diagram below).

####MOSI
MOSI stands for **M**aster **O**ut **S**lave **I**n and is the connection used by the Tessel to send data to the module. It's on this line that the Tessel will encode its data.

####MISO
MISO stands for **M**aster **I**n **S**lave **O**ut and is the connection used by the module to send data to the Tessel.

####SS or CS
This line, normally referred to as the **Slave Select (SS)** or **Chip Select (CS)** line, is used by the master device to notify a specific slave device that it is about to send data. We normally call it CS, but you may see it either way in datasheets and other references.

When you create a Tessel module which uses the SPI protocol, the CS connection will be handled by one of the GPIO pins (G1, G2, G3) on the Tessel port.

In the SPI protocol, the SCK, MOSI, and MISO connections are shared between all of the slave devices on a given SPI bus. For example, if you connect the MicroSD Card, Camera, and nRF24 modules to the Tessel at the same time, they will all be using the same SCK, MOSI, and MISO lines from the main Tessel chip.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/Multi_SPI.png" /></h1>


When the Tessel needs to send data to the Camera Module, the MicroSD and nRF24  will see that data but should just ignore it. To accomplish this, the Tessel will pull the CS line that is connected to the Camera Module low and leave the CS line high for the MicroSD and nRF24 modules. This lets the camera know that it is the active module and should pay attention.

The following diagram shows how the various pins in the SPI protocol are toggled to create meaningful data. In this case, the master sends the ASCII character 'S', and the slave responds with 'F'.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/spi_diagram.jpg" /></h1>

<p style="text-align:center"><em>Timing diagram of SPI data exchange. Modified [image](https://dlnmh9ip6v2uc.cloudfront.net/assets/c/7/8/7/d/52ddb2dcce395fed638b4567.png) from Sparkfun is [CC BY-NC-SA 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/)</em></p>

Remember that the master initiates all communication. When it is ready, the first thing it will do is pull the CS/SS pin low to let the slave device know that a data transmission is about to begin.
The master holds this pin low for the duration of the data exchange as seen in the diagram above.

With the CS/SS pin low, the master will start to toggle the clock pin (SCK) while simultaneously controlling the MOSI to represent the bits of information it wishes to send to the slave.
The numbers in green on the diagram above delineate each bit in the byte being transferred.

It sounds complicated, but remember that the Tessel takes care of all of this pin manipulation for you. All you have to do is write some Javascript like this code snippet, which demonstrates the use of the SPI protocol on port A.

```js
var portA = tessel.port['A'];
var spi = new portA.SPI({
  clockSpeed: 4000000 // 4MHz
});

spi.transfer(new Buffer([0xde, 0xad, 0xbe, 0xef]), function (err, rx) {
  console.log('buffer returned by SPI slave:', rx);
});
```

[More SPI example code and information][spi_code_example]

###Tessel Modules That Use The SPI Protocol
[Ambient][ambient_index], [Audio][audio_index], [Camera][camera_index], [Micro SD][sd_index], [nRF24][nrf_index], and [Infrared][ir_index]

<a name="i2c"></a>
##I2C
**Pros:** Only requires 2 pins, multiple devices on a single bus, allows two-way communication

**Cons:** Devices can have address conflicts, not as fast as SPI

I2C stands for [Inter-Integrated Circuit][i2c_wikipedia] and is pronounced "I squared C", "I two C" or "I-I-C". I2C is a protocol that allows one device to exchange data with one or more connected devices through the use of a single data line and clock signal.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/i2c_blowout.jpg" /></h1>

<p style="text-align:center"><em>I2C pins SCL and SDA on Port B of the Tessel</em></p>

I2C is a Master/Slave protocol, which means that there is always a single master device which controls the flow of communication with one or more slave devices.

I2C only requires two communication connections:

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/Simple_I2C.png" /></h1>


####SCL
This is the clock signal that keeps the Tessel and the module synchronized while transferring data. The two devices need to have a mutual understanding of how fast data is to be transferred between them. This is sometimes referred to as the baud or bitrate. The clock signal provides that reference signal for the devices to use when exchanging data. Without a clock signal to synchronize the devices, they would have no way to interpret the signal on the data lines.

####SDA
This is the data line used for exchanging data between the master and slaves. Instead of having separate communication lines for the master and slave devices, they both share a single data connection. The master coordinates the usage of that connection so that only one device is "talking" at a time.

Since multiple slave devices can use the same SDA line, the master needs a way to distinguish between them and talk to a single device at a time. The I2C protocol uses the concept of **device addressing** to coordinate traffic on the data line.

Every single I2C device connected to the Tessel will have an internal address that cannot be the same as any other module connected to the Tessel. This address is usually determined by the device manufacturer and listed in the datasheet. Sometimes you can configure the address through device-specific tweaks defined by the manufacturer. The Tessel, as the master device, needs to know the address of each slave and will use it to notify a device when it wants to communicate with it before transferring data.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/Multi_I2C.png" /></h1>

<p style="text-align:center"><em>Flow of data between Tessel and multiple I2C devices.</em></p>

The following diagram illustrates how the SDA and SCL pins are toggled when transferring data with the I2C protocol.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/i2c_modified_timing.png" /></h1>

To begin a data transaction, the master creates what is called a start condition by pulling the SDA pin low before the SCL pin.

The master then broadcasts the address of the device it wishes to communicate with by sending each bit of the 7 bit address. Notice the clock signal (SCL) is toggled for each bit. This toggling is how the slaves know when to read each bit of the address so they can determine with which device the master wants to communicate.

Right after the address, the master sends a read/write bit which signals whether it will be sending data to the slave or reading data from the slave.

After broadcasting the address, the master either transmits data to the slave or sends the address of a register (internal storage) on the slave from which it wishes to retrieve data.

Finally, the master will issue a stop condition on the bus by pulling SCL high, followed by SDA.

It's a little complicated, but the Tessel takes care of all the details for you. Using the I2C pins on port A looks like this:

```js
var tessel = require('tessel'); // import tessel
var portA = tessel.port['A']; // use Port A
var slaveAddress = 0xDE; // This is the address of the attached module/sensor
var i2c = new portA.I2C(slaveAddress)

i2c.send(new Buffer([0xde, 0xad, 0xbe, 0xef]), function (err) {
  console.log("I'm done sending the data");
  // Can also use err for error handling
})
```

[More I2C example code and information][i2c_code_example]

###Tessel Modules That Use The I2C Protocol
[Accelerometer][accel_index], [Climate][climate_index], [RFID][rfid_index], and [Servo][servo_index]

<a name="uart"></a>
##UART
**Pros:** Widely supported, allows two-way communication

**Cons:** Can't share communication lines, slower than SPI and I2C

UART stands for [Universal Asynchronous Receiver/Transmitter][uart_wikipedia] and is really just a fancy way of referring to a serial port. It is really easy to understand as it only requires two lines: a transmission line (**TX**) and a receiving line (**RX**). The Tessel sends data to connected modules on the TX line and gets data back on the RX line.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/uart_blowout.jpg" /></h1>

<p style="text-align:center"><em>UART pins TX and RX on Port B of the Tessel</em></p>

###TX
Used by the Tessel to send data to the module.

###RX
Used by the module to send data to the Tessel.

When using a UART, it's important to remember that the communication lines cannot be shared between modules. In fact, because of this, each Tessel port needs its own RX and TX line from the main Tessel chip (LPC1830) as seen below.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/UART_Connections.jpg" /></h1>

<p style="text-align:center;"><em>Only ports A, B, and D have dedicated UART lines from the LPC1830.</em></p>

Since the LPC1830 doesn't have 4 UARTs, only Ports A, B, and D have a hardware UART. A software UART can be implemented on Port C but is beyond the scope of this guide. If you need to use a UART for communication we recommend using Port A, B or D.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/uart_example.jpg" /></h1>

<p style="text-align:center;"><em>A UART data transmission.</em></p>

UART transmissions begin with a start bit where the appropriate line (TX or RX) is pulled low by the sending party. Then 5 to 8 data bits are sent. The diagram above shows a scenario where 8 bits are sent.

Following the data, an optional [parity bit](http://en.wikipedia.org/wiki/Parity_bit) is sent, followed by 1 or 2 stop bits, where the sending module pulls the pin high.

For this protocol to work, the sender and receiver have to agree on a few things.

  1. How many data bits are sent with each packet (5 to 8)?
  2. How fast should the data be sent? This is know as the baud rate.
  3. Is there a parity bit after the data, and is it high or low?
  4. How many stop bits will be sent at the end of each transmission?

When you want to interact with a specific module via UART, the answers to these questions are found in the module's datasheet. Using that information you can configure the UART in Javascript like this:

```js
var port = tessel.port['A'];
var uart = new port.UART({
  dataBits: 8,
  baudrate: 115200,
  parity: "none",
  stopBits: 1
});

uart.write('Hello UART');
```

[More example code using a UART][uart_code_example]

###Tessel Modules That Use a UART
[BLE][ble_index], [Camera][camera_index], [GPS][gps_index], and [GPRS][gprs_index]




[led_example]: http://start.tessel.io/blinky
[relay_module]: https://tessel.io/modules#module-relay
[sd_module]: https://tessel.io/modules#module-sdcard
[climate_module]: https://tessel.io/modules#module-climate
[ambient_module]: https://tessel.io/modules#module-ambient
[accel_module]: https://tessel.io/modules#module-accelerometer
[ble_module]: https://tessel.io/modules#module-ble
[gps_module]: https://tessel.io/modules#module-gps
[spi_wikipedia]: http://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus
[i2c_wikipedia]: http://en.wikipedia.org/wiki/I%C2%B2C
[uart_wikipedia]: http://en.wikipedia.org/wiki/Universal_asynchronous_receiver/transmitter
[level_shifting]: https://learn.sparkfun.com/tutorials/voltage-dividers
[spi_code_example]: https://tessel.io/docs/hardwareAPI#spi
[gpio_code_example]: https://tessel.io/docs/hardwareAPI#pins
[i2c_code_example]: https://tessel.io/docs/hardwareAPI#i2c
[uart_code_example]: https://tessel.io/docs/hardwareAPI#uart
[pir_project]: https://projects.tessel.io/projects/pir
[button_post]: https://projects.tessel.io/projects/a-button-on-tessel
[ambient_index]: https://github.com/tessel/ambient-attx4
[audio_index]: https://github.com/tessel/audio-vs1053b
[camera_index]: https://github.com/tessel/camera-vc0706
[sd_index]: https://github.com/tessel/sdcard
[nrf_index]: https://github.com/tessel/rf-nrf24
[accel_index]: https://github.com/tessel/accel-mma84
[climate_index]: https://github.com/tessel/climate-si7005
[rfid_index]: https://github.com/tessel/rfid-pn532
[servo_index]: https://github.com/tessel/servo-pca9685
[ble_index]: https://github.com/tessel/ble-ble113a
[gps_index]: https://github.com/tessel/gps-a2235h
[gprs_index]: https://github.com/tessel/gprs-sim900
[ir_index]: https://github.com/tessel/ir-attx4
