# Tools for Tessel

A collection of tools for use with Tessel. Community-created or built by Technical Machine. Please feel free to add to this list. See the [style guide](https://github.com/tessel/style#api-formatting) for formatting.

### Contents

* [Tutorials](#tutorials)
* [Software tools](#software-tools)
* [Hardware libraries](#hardware-libraries)
* [Contributing](#contributing)


### Tutorials

#### Communications

&#x20;<a href="#api-USB-message-passing-https-github-com-tessel-docs-tree-master-tutorials-usb_messages" name="api-USB-message-passing-https-github-com-tessel-docs-tree-master-tutorials-usb_messages">#</a> [USB message passing]( https://github.com/tessel/docs/tree/master/tutorials/usb_messages )  
USB communication between Tessel and Node on your PC.

&#x20;<a href="#api-Getting-started-with-BLE-https-github-com-tessel-docs-blob-master-tutorials-ble-getting-started-md" name="api-Getting-started-with-BLE-https-github-com-tessel-docs-blob-master-tutorials-ble-getting-started-md">#</a> [Getting started with BLE]( https://github.com/tessel/docs/blob/master/tutorials/ble-getting-started.md )  
A guide to Bluetooth Low Energy for beginners, particularly flavored for Tessel.

&#x20;<a href="#api-External-GPIO-Pin-Interrupts-API-https-github-com-tessel-docs-blob-master-tutorials-gpio-interrupts-md" name="api-External-GPIO-Pin-Interrupts-API-https-github-com-tessel-docs-blob-master-tutorials-gpio-interrupts-md">#</a> [External GPIO Pin Interrupts API]( https://github.com/tessel/docs/blob/master/tutorials/gpio-interrupts.md )  
External interrupts are used for getting updated from other sensors or the environment that something has changed. It allows the processesor to work on other tasks until the state of a pin is altered at which point hardware processes take over and handle the interrupt.

&#x20;<a href="#api-SPI-Locks-and-Raw-Transfers-https-github-com-tessel-docs-blob-master-tutorials-raw-spi-md" name="api-SPI-Locks-and-Raw-Transfers-https-github-com-tessel-docs-blob-master-tutorials-raw-spi-md">#</a> [SPI Locks and Raw Transfers]( https://github.com/tessel/docs/blob/master/tutorials/raw-spi.md )  
Tutorial on SPI communication.

#### Firmware

&#x20;<a href="#api-Expose-a-C-function-up-to-JS-userspace-https-github-com-tessel-docs-blob-master-tutorials-c-to-js-md" name="api-Expose-a-C-function-up-to-JS-userspace-https-github-com-tessel-docs-blob-master-tutorials-c-to-js-md">#</a> [Expose a C function up to JS userspace]( https://github.com/tessel/docs/blob/master/tutorials/c-to-js.md )  
This tutorial goes over how to expose a C function to JS where the user can interact with it via any JS function.

&#x20;<a href="#api-Debugging-Tessel-https-github-com-tessel-docs-blob-master-tutorials-debug-using-busblaster-md" name="api-Debugging-Tessel-https-github-com-tessel-docs-blob-master-tutorials-debug-using-busblaster-md">#</a> [Debugging Tessel]( https://github.com/tessel/docs/blob/master/tutorials/debug-using-busblaster.md )  
You can debug Tessel by soldering JTAG headers to the board and using a JTAG debugger. This tutorial asummes you are using a Bus Blaster and an associated JTAG 20 -> 10 pin adapter.


#### Hardware

&#x20;<a href="#api-Powering-Tessel-https-tessel-io-docs-power" name="api-Powering-Tessel-https-tessel-io-docs-power">#</a> [Powering Tessel]( https://tessel.io/docs/power )  
Powering Tessel through an external power source

&#x20;<a href="#api-Adding-a-Wifi-Antenna-https-tessel-io-docs-antenna" name="api-Adding-a-Wifi-Antenna-https-tessel-io-docs-antenna">#</a> [Adding a Wifi Antenna]( https://tessel.io/docs/antenna )  
How to add a Wifi antenna to Tessel to improve Wifi reception

&#x20;<a href="#api-Connecting-Arduino-and-Tessel-https-github-com-tessel-docs-blob-master-tutorials-connect-arduino-tessel-md" name="api-Connecting-Arduino-and-Tessel-https-github-com-tessel-docs-blob-master-tutorials-connect-arduino-tessel-md">#</a> [Connecting Arduino and Tessel]( https://github.com/tessel/docs/blob/master/tutorials/connect-arduino-tessel.md )  
This is a tutorial for how to pass data back and forth between an Arduino and a Tessel.


### Software tools

#### Development tools

&#x20;<a href="#api-tiny-router-https-www-npmjs-org-package-tiny-router" name="api-tiny-router-https-www-npmjs-org-package-tiny-router">#</a> [tiny-router]( https://www.npmjs.org/package/tiny-router )  
A simple routing library targeting embedded system where every byte counts

&#x20;<a href="#api-tesselate-https-www-npmjs-org-package-tesselate" name="api-tesselate-https-www-npmjs-org-package-tesselate">#</a> [tesselate]( https://www.npmjs.org/package/tesselate )  
A dependency injector for tessel modules, abstracting away the need to nest multiple ‘ready’ listeners and callbacks within each other, or use promises or generators (or multiple, internal loaded flags)

&#x20;<a href="#api-avr-isp-https-www-npmjs-org-package-avr-isp" name="api-avr-isp-https-www-npmjs-org-package-avr-isp">#</a> [avr-isp]( https://www.npmjs.org/package/avr-isp )  
Library to allow Tessel to act as an AVR In-System Programmer

&#x20;<a href="#api-grunt-tessel-https-www-npmjs-org-package-grunt-tessel" name="api-grunt-tessel-https-www-npmjs-org-package-grunt-tessel">#</a> [grunt-tessel]( https://www.npmjs.org/package/grunt-tessel )  
Grunt tasks to aid tessel development

&#x20;<a href="#api-mockfs-https-github-com-Olegas-node-mockfs" name="api-mockfs-https-github-com-Olegas-node-mockfs">#</a> [mockfs]( https://github.com/Olegas/node-mockfs )  
Virtual in-memory file system accessible through native FS module

&#x20;<a href="#api-tesselbot-https-www-npmjs-org-package-tesselbot" name="api-tesselbot-https-www-npmjs-org-package-tesselbot">#</a> [tesselbot]( https://www.npmjs.org/package/tesselbot )  
A chainable tessel rebot made for building simple apps easier

#### Multi-language support
&#x20;<a href="#api-lua-tessel-https-www-npmjs-org-package-lua-tessel" name="api-lua-tessel-https-www-npmjs-org-package-lua-tessel">#</a> [lua-tessel]( https://www.npmjs.org/package/lua-tessel )  
A CLI that enables the scripting of a Tessel device in Lua

&#x20;<a href="#api-Rust-on-Tessel-https-github-com-kevinmehall-rust-tessel" name="api-Rust-on-Tessel-https-github-com-kevinmehall-rust-tessel">#</a> [Rust on Tessel]( https://github.com/kevinmehall/rust-tessel )  
Examples of the Rust language running on Tessel

#### Libraries

&#x20;<a href="#api-cylon-tessel-https-www-npmjs-org-package-cylon-tessel" name="api-cylon-tessel-https-www-npmjs-org-package-cylon-tessel">#</a> [cylon-tessel]( https://www.npmjs.org/package/cylon-tessel )  
Cylon.js is a JavaScript framework for robotics and physical computing using Node.js

&#x20;<a href="#api-Plotly-example-https-gist-github-com-alexander-daniel-856ccc58c4cda1707ab2" name="api-Plotly-example-https-gist-github-com-alexander-daniel-856ccc58c4cda1707ab2">#</a> [Plotly example]( https://gist.github.com/alexander-daniel/856ccc58c4cda1707ab2 )  
Tessel + Plotly streaming example

&#x20;<a href="#api-m2x-tessel-https-www-npmjs-org-package-m2x-tessel" name="api-m2x-tessel-https-www-npmjs-org-package-m2x-tessel">#</a> [m2x-tessel]( https://www.npmjs.org/package/m2x-tessel )  
AT&T M2X API client for node.js based Tessel


### Hardware libraries

Beyond the [modules](tessel.io/modules), libraries and examples for connecting with Tessel.

&#x20;<a href="#api-pir-https-www-npmjs-org-package-pir" name="api-pir-https-www-npmjs-org-package-pir">#</a> [pir]( https://www.npmjs.org/package/pir )  
Node library for a PIR motion detector

&#x20;<a href="#api-tessel-ht16k33-https-www-npmjs-org-package-tessel-ht16k33" name="api-tessel-ht16k33-https-www-npmjs-org-package-tessel-ht16k33">#</a> [tessel-ht16k33]( https://www.npmjs.org/package/tessel-ht16k33 )  
Use the Adafruit HT16K33 LED Backpack with your Tessel

&#x20;<a href="#api-tessel-button-https-www-npmjs-org-package-tessel-button" name="api-tessel-button-https-www-npmjs-org-package-tessel-button">#</a> [tessel-button]( https://www.npmjs.org/package/tessel-button )  
API to provide more feedback / options to the single tessel 'config' button

&#x20;<a href="#api-neopixels-https-www-npmjs-org-package-neopixels" name="api-neopixels-https-www-npmjs-org-package-neopixels">#</a> [neopixels]( https://www.npmjs.org/package/neopixels )  
Library to run a strand of neopixels from Tessel

&#x20;<a href="#api-ir-codes-https-www-npmjs-org-package-ir-codes" name="api-ir-codes-https-www-npmjs-org-package-ir-codes">#</a> [ir-codes]( https://www.npmjs.org/package/ir-codes )  
Generates signal buffers for different infrared device manufacturers


### Contributing

&#x20;<a href="#api-Technical-Machine-contribution-guide-https-github-com-tessel-contribution-guide" name="api-Technical-Machine-contribution-guide-https-github-com-tessel-contribution-guide">#</a> [Technical Machine contribution guide]( https://github.com/tessel/contribution-guide )  
A thorough explanation of how the Tessel software architecture works as a whole, descriptions of the individual pieces, and the processes for contributing code

&#x20;<a href="#api-Technical-Machine-style-guide-https-github-com-tessel-style" name="api-Technical-Machine-style-guide-https-github-com-tessel-style">#</a> [Technical Machine style guide]( https://github.com/tessel/style )  
Defines style for Technical Machine code, docs, and directories, particularly Tessel modules

&#x20;<a href="#api-RFC-category-on-the-Tessel-forums-https-forums-tessel-io-category-rfc" name="api-RFC-category-on-the-Tessel-forums-https-forums-tessel-io-category-rfc">#</a> [RFC category on the Tessel forums]( https://forums.tessel.io/category/rfc )  
Technical Machine & community members request comments on APIs and projects