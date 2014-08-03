# Making a Tessel-style Library for External Hardware

There's a lot of existing hardware from Seeed, Adafruit, and elsewhere that can be used with Tessel. Though it's not that difficult to hack together a project based on the hardware API docs, making an npm module for the hardware is a nice way to interface cleanly with the hardware, and reuse a custom API across projects.

This tutorial walks you through the process to go from a piece of hardware to a Tessel-style npm module.

For this tutorial, I used a PIR motion detector from Adafruit.

## Understanding your hardware
Before you start, it would be a good idea to check out Tessel's [hardware docs](tessel.io/docs/hardware) and [hardware api docs](tessel.io/docs/hardwareAPI). These two documents will give you a good idea of Tessel's capabilities and available interfaces.
As a general rule, anything that can be used with an Arduino can also be used with a Tessel.

Tessel can:

* Read and write digital signals (3.3V when on)
* Write PWM signals
* Read analog signals
* Communicate over SPI
* Communicate over I2C
* Communicate over UART
* Provide 5V power
* Provide 3.3V power

For the PIR sensor, I needed one 3.3V digital signal pin and 5V of power. It will typically say what you need on the manufacturer's page, straight out or on a datasheet. Adafruit typically says these things in the [description field](http://www.adafruit.com/products/189#description-anchor) of a product page, as does [Seeed](http://www.seeedstudio.com/depot/PIR-Motion-sensor-module-p-74.html).

## Setting up the repo

## Connecting your hardware to Tessel

How to do it
How to write instructions

## Establishing communication

## Writing an API

## Writing an example

## Writing the docs

## Writing tests

## Publishing
Good tutorial for npm

Publish to tools doc