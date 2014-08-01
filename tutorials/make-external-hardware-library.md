# Making a Tessel-style Library for External Hardware

There's a lot of existing hardware from Seeed, Adafruit, and elsewhere that can be used with Tessel. Though it's not that difficult to hack together a project based on the hardware API docs, making an npm module for the hardware is a nice way to interface cleanly with the hardware, and reuse a custom API across projects.

This tutorial walks you through the process to go from a piece of hardware to a Tessel-style npm module.

For this tutorial, I used a PIR motion detector from Adafruit.

## Choosing your hardware
Before you start, it would be a good idea to check out Tessel's [hardware docs](tessel.io/docs/hardware) and [hardware api docs](tessel.io/docs/hardwareAPI). These two documents will give you a good idea of Tessel's capabilities and available interfaces.

Tessel can:

* Read and write digital signals
* Write PWM signals
* Read analog signals
* Communicate over SPI
* Communicate over I2C
* Communicate over UART

As a general rule, anything that can be used with an Arduino can also be used with a Tessel.

