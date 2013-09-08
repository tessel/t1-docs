# Hardware API Proposals

**VERSION 0.0.1**

The goal is to define a lightweight spec that, on your JS platform of choice:

```js
var hardware = require('hardware');
```

You can write interoperable code that uses hardware-level protocols, including manipulating GPIOs, SPI/I2C/UART/CAN, and more.

From this level, we can abstract remote protocols (such as Firmata) and move between interoperable systems.


## Bank

A bank of pins.

new hardware.Bank(idx)

Bank.digitalReadPins[]
Bank.digitalWritePins[]
Bank.analogReadPins[]
Bank.analogWritePins[]
Bank.pwmWritePins[]

Bank.setInput(pin)
Bank.setOutput(pin)

void Bank.digitalWrite(value, [function (err)])
bool Bank.digitalReadSync
void Bank.digitalRead(function (err, read))

void Bank.analogWrite(value, [function (err)])
int  Bank.analogReadSync()
void Bank.analogRead(function (err, read))

void Bank.pwmWrite(value, [function (err)])


## SPI

A SPI output.

new hardware.SPI(idx, [bank])

SPI.transfer([cs,] writebuf, readcount, function (err, data))
SPI.read([cs, ]readcount, function (err, data))
SPI.write([cs,] writebuf, function (err))


## I2C

An I2C output.

new hardware.I2C(idx)

I2C.transfer(address, writebuf, readcount, function (err, data))
I2C.read(address, readcount, function (err, data))
I2C.write(address, writebuf, function (err))


