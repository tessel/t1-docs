# Making a Tessel-style Library for External Hardware

There's a lot of existing hardware from Seeed, Adafruit, and elsewhere that can be used with Tessel. Though it's not that difficult to hack together a project based on the hardware API docs, making an npm module for the hardware is a nice way to interface cleanly with the hardware, and reuse a custom API across projects.

This tutorial walks you through the process to go from a piece of hardware to a Tessel-style npm module.

For this tutorial, I used a PIR motion detector from Adafruit.

## Understanding your hardware
Before you start, it would be a good idea to check out Tessel's [hardware docs](tessel.io/docs/hardware) and [hardware api docs](tessel.io/docs/hardwareAPI). These two documents will give you a good idea of Tessel's capabilities and available interfaces.
As a general rule, anything that can be used with an Arduino can also be used with a Tessel. Tessel reads in a maximum of 3.3V, so if your part outputs more than that, don't fry the board!

Tessel can:

* Read and write digital signals (3.3V when high; 0V when low)
* Write PWM signals ("duty cycles")
* Read analog signals
* Communicate over SPI (MISO, MOSI, and SCK)
* Communicate over I2C (SDA and SLC)
* Communicate over UART (TX and RX)
* Provide 5V power
* Provide 3.3V power (a digital pin set to output(1) (high))

For the PIR sensor, I needed one 3.3V digital signal pin and 5V of power. It will typically say what you need on the manufacturer's page, straight out or on a datasheet. Adafruit typically says these things in the [description field](http://www.adafruit.com/products/189#description-anchor) of a product page, as does [Seeed](http://www.seeedstudio.com/depot/PIR-Motion-sensor-module-p-74.html).

## Setting up the repo
Tessel's modules all have the same basic directory. You can see a template for Tessel modules in general on our style guide [here](https://github.com/tessel/style/tree/master/Templates).
You might want to check out the PIR repo set up for development [here](https://github.com/Frijol/PIR/tree/51ce84784f09902868e67f8a6c8e0270c85eb6cb).

Here are notes on some of the key files:

###index.js ([template](https://github.com/tessel/style/blob/master/Templates/index.js))
This file is the driver for the hardware. Here's the basic setup:

* Require util and the event emitter, along with any other dependencies.
* Make a constructor function that instantiates the hardware as an object. Its two arguments are "hardware" and a callback. The function should emit a 'ready' event that returns the object when it is ready.
 * `hardware` specifies where the hardware is connected to Tessel. For modules, it's a port. For external hardware, this will most likely be a port and a pin (e.g. tessel.port['GPIO'].pin['A3']). You should probably also add error handling in case the wrong hardware type is passed in (e.g. just a port when you need a pin) or for specification of the wrong type of pin (you can see which pins are digital, analog and PWM in the examples [here](https://tessel.io/docs/hardwareAPI#pins)). You can check the [PIR code](https://github.com/Frijol/PIR/blob/master/index.js) for examples of this error handling.
 * `callback(err, obj)` should return an error if there are any errors connecting, or if there are no errors, should return the object as its second argument.
* Functions: this is the fun part! What do you want as the API for your hardware? What's useful? What do you want to expose?
For the PIR motion detector, I only have one function, which reads the pin. Most of the useful information is better exposed as events for "movement", "stillness", and "change".
* use function: The standard require for a Tessel module is require('module').use(tessel.port['PORT']). The "use" function takes hardware specification and a callback, and passes them to the object constructor.
* exports: Export the object function and the use function.

###package.json ([template](https://github.com/tessel/style/blob/master/Templates/package.json))
Use `npm init` to generate most of this file.

Other items of note:

* You do not need the `tessel` npm package as a dependency.
* Add a "hardware" section. By default, Tessel pushes the entire directory so that any dependencies are included. With a "hardware" section, you can specify files and folders to ignore when pushing to embedded devices. For our modules, we list "./test" and "./examples".

###examples folder ([template](https://github.com/tessel/style/tree/master/Templates/examples))
You need at least one example. This should show basic functionality of the hardware. [Mine](https://github.com/Frijol/PIR/blob/master/examples/pir.js) waits for a ready event, then logs a message on the emission of "movement" and "stillness" events.
When you require the module, refer to '../' rather than the module name.

###test folder ([template](https://github.com/tessel/style/tree/master/Templates/test))
We use the node module "tinytap" for testing. Every functionality that can be tested without physical interaction should be testable with `tessel run test/*.js`.

###README.md ([template](https://github.com/tessel/style/blob/master/module_RM_template.md))
Your readme is your documentation. For consistency with Tessel modules, check out the template. We use the node module "marktype" to make pretty, linkable API documentation.

## Connecting your hardware to Tessel

Connect your hardware based on the [hardware](https://tessel.io/docs/hardware#pins-and-ports) and [API](https://tessel.io/docs/hardwareAPI#pins) documentation.
Instructions for establishing SPI/UART/I2C are part of the API docs.

At the top of your README, write which pins should be connected to which between the Tessel and the external hardware. A picture of the setup would also be useful.

## Establishing communication

## Writing an API

## Writing an example

## Writing the docs

## Writing tests

## Publishing
Good tutorial for npm

Publish to tools doc