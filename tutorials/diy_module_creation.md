# Creating Your Own Tessel Module
## What Is a Module?
One of the main goals of the Tessel platform is "connected hardware as easy as npm install." This is accomplished with our [pre-defined modules][modules_page] which abstract away the electronic complexities and make working with hardware literally plug and play.  

Each module provides a clearly defined hardware capability and can be connected to one of the 4 ports on the Tessel. Currently there are [14 modules available][modules_page] covering a wide range of capabilities. These first-party modules are the simplest way to start interacting with external hardware. In addition to the first-party modules there are a number of [third-party modules][third_party_modules] that have been created by the Tessel community. These are npm libraries built for specific pieces of hardware and can be integrated into your project with a little know-how.

But what if your project needs functionality that can't be provided by one of the existing first or third-party modules? You make your own, of course. This guide will walk you through the basics of creating your own Tessel module using our new proto-module boards.

### A Quick Note of Encouragement

Making your own module might seem like an overwhelming task best left to those who know things like Ohm's Law, how to solder, and why licking a 9V doesn't feel very good. But while having some electronics knowledge doesn't hurt, it's not a hard and fast prerequisite. If you know how to program, you are smart enough to figure out the basic concepts and make awesome things happen. Just trust us and read on.

## Module Design Philosophy

Before you venture into the world of custom module creation we need to cover some basics that will help guide you along the way.

Every module created for the Tessel involves 5 parts:

  1. Power
  2. Communication
  3. Software
  4. Documentation
  5. Sharing

If you understand how each of these fit into the module creation process, you will be well on your way to creating your own custom module. Let's start with power.

### Power
When dealing with anything in electronics, whether it be sensors, displays, buttons, or servos, you have to provide power. Everything needs a power source, and Tessel modules are no exception. In its simplest form, you can think of a power source as two connections; a positive voltage and a ground connection. These connections are provided on each Tessel port as seen in the image below.

<h1 style="text-align:center;"><img src="https://www.dropbox.com/s/l4ya1tzydjj1pl6/power_zoomed.jpg?dl=1" /></h1>

<p style="text-align:center;"><em>Power connections on Tessel's Port B</em></p>

The main Tessel board [can be powered several ways][power_options], but regardless of how you provide power to the main board it ultimately turns that source into 3.3V. That's the native "voltage language" of the Tessel. It likes to speak 3.3V to everything if possible.

One of the nice things about the proto-module is that the 3.3V and ground connections are exposed as two rails that run along each side of the module as seen below. This allows you to easily power your module components.

<h1 style="text-align:center;"><img src="https://www.dropbox.com/s/z3cp6mfyppwjc4b/diymod_power.jpg?dl=1" /></h1>

<p style="text-align:center;"><em>Proto-module power rails</em></p>

### Special Considerations
If all of the components on your custom module operate at 3.3V, then your power design is extremely simple. You just use the 3.3V and ground rails and connect your components accordingly ([custom screen module](screen_example) below is a good example). Sometimes, however, you may encounter a situation where 3.3V is not what you need, like in the case of the [servo module][servo_module].

Many servos like to operate at 5V. That's their native "voltage language" and so the 3.3V provided by the Tessel isn't ideal and, in many cases, just won't work. Servos can also draw a lot of current, which may overwhelm the Tessel's power supply. To solve this problem, you'll notice that the servo module has a DC barrel jack on it that allows you to plug in a 5V adapter to provide sufficient power to the connected servos.

<h1 style="text-align:center;"><img src="https://www.dropbox.com/s/5ysijbkmrgtzmki/servo_jack_identified.jpg?dl=1" /></h1>

<p style="text-align:center;"><em>DC Barrel Jack on the Servo Module</em></p>

From the [servo module schematic](http://design-files.tessel.io.s3.amazonaws.com/2014.06.06/Modules/Servo/TM-03-03.pdf) we can see that communication is accomplished with the normal I2C lines which operate at 3.3V but servo power is provided via J2 which is the barrel jack.

This guide isn't meant to be a comprehensive power reference, but we just want to point out that if you have any components on your custom module that work outside of the 3.3V realm you will [need to design for it][level_shifting]. To simplify your module design, we recommend using 3.3V components where possible.

### The Power Warnings
Here are some items to remember when working with power in electronics.
  * **ALWAYS** unplug your Tessel before making or altering connections.
  * Don't mix voltages unless you know what you're doing. For example, if you put 5V on any of the module pins, you can ruin your Tessel.
  * Never connect the positive voltage directly to ground. This is called a [short circuit](http://en.wikipedia.org/wiki/Short_circuit) and can ruin components and your day.
  * Always exercise caution and verify that you have hooked everything up correctly before plugging in your Tessel.

## Communication

Once you have decided how you are going to power your custom module, it's time to decide how the main Tessel board will talk to it. In the world of web communication, there are standards like HTTP, HTTPS, and FTP that allow different systems to talk to each other in well-defined ways. The same concept exists in the hardware world and the Tessel supports four standard communication protocols for talking to modules.

  * [GPIO][comm_gpio]
  * [SPI][comm_spi]
  * [I2C][comm_i2c]
  * [UART][comm_uart]

Because the Tessel [does most of the heavy lifting][hardware_api] for all of these, you don't need to be an expert to use them in your custom module. However, if you'd like to learn a little more, we've [provided a simple overview of each][comm_protocols].

### So Which Communication Protocol Should I Use?
Knowing that there are four communication options available to you, which should you use for your custom module? The good news is that this will usually be decided for you based on the type of module you are creating. For example, most [PIR sensor modules][pir_project] will set a pin high when motion is detected, which can be read with a simple digital input (GPIO). The same applies to sensors. For example, the Si7005 temperature and humidity sensor on the [Climate Module][climate_module] communicates via the [I2C protocol][comm_i2c]. Usually sensors will only support one protocol– so the decision is easy, you use that one.

You will find some modules that support both SPI and I2C, and either will work just fine with the Tessel. As a general rule of thumb, we recommend you favor the SPI protocol in these scenarios as it eliminates the risk of I2C address collisions with other connected I2C modules.

## Software

Once you have the power and communication all worked out and connected, it's time to start writing JavaScript to talk to your module. This is where the open-source nature of the Tessel really comes in handy. We've already used all of the possible communication protocols in [our modules][modules_page] and the [code is free to look at][tessel_github] and copy.

Design an API for working with your module so that it's easy for others to integrate into their projects. As a general rule, top priority is intuitive interaction. Second priority is exposing as many features as you can. You can find a lot of great information about organizing your project and writing an API in [Making a Tessel-style Library for Third-Party Hardware][third_party_doc].

## Documentation and Sharing

Once you have a working module it's time to share the good news with everyone so other people can build amazing things with your work. We recommend doing a few things to share it with the community as outlined below. This helps create a consistent feel across all Tessel modules, whether they are official modules or submitted by the community.

### Create A Git Repo
Having your code in a git repo and available online makes it easy for others to grab your code and start using it in their projects. To help you get started we've created a template repository that you can use as a starting point.

[Custom Module Git Repo Template][repo_template]

### Document It
You may have just created the world's most amazing Tessel module but how is anybody going to know about it or use it? Once you've hashed out the API and everything is working, it's important to document its use so others can easily apply your work to their projects. The best way to do this is to use the [README template][readme_template], which includes things like how to install the module, example usage, and API information.

### Publish Your Code on NPM
Once your git repo is ready and you've documented your module, this step is really easy and makes your module fit the Tessel motto of "connected hardware as easy as npm install." If you've never published code to NPM before, you can get started with just four lines of code (run in a shell window).

    npm set init.author.name "Your Name"
    npm set init.author.email "you@example.com"
    npm set init.author.url "http://yourblog.com"

    npm adduser

This sets up your NPM author info. Now you're ready to create your package.json file. There is one in the repo template but we suggest creating it by running npm init from within the project directory.

```
npm init
```

Edit your package.json file to include a name, version, and description. We also highly recommend adding "tessel" as a keyword so that other Tessel users can easily find your work. Most of the package.json file is self-explanatory and follows the [npm package.json standard][package_json_standard] with the exception of the **hardware** member.

<h1 style="text-align:center;"><img src="https://www.dropbox.com/s/ckcm98rafsh0sc4/package_hardware_section.png?dl=1" /></h1>

<p style="text-align:center;"><em>**hardware** section of package.json</em></p>

This is a Tessel-specific item that you must add manually and is a list of files and folders in your project that you would like to exclude when code is pushed to your Tessel.

Once your package.json file is complete you're ready to publish your code. Run the following command from the top level directory of your project.

    npm publish ./

### Create a Project Page
The [Tessel Projects page][tessel_projects] is a way to share your module directly with the Tessel community. You simply provide a few pieces of information, a picture, and can even use your README.md file from your Git repo as the contents.

### Submit Your Module
We're always looking to add modules to our [third-party module list][third_party_modules] so if you'd like your custom module to be listed at [tessel.io/modules][tessel_modules] then fill out this form and we'd be happy to review it.

[Third-Party Module Submission Form][module_submission]

A great example of using this module-creation pattern can be found in [Making a Tessel-style Library for Third-Party Hardware][third_party_doc]

## Your First Custom Module
So now that we've described the pattern for making a custom module, let's walk through creating a very simple module using that pattern. The Tessel has a spare button on the main board, but maybe you'd like to add one as a module. Kelsey did [a great writeup on adding a button to the GPIO bank](https://projects.tessel.io/projects/a-button-on-tessel) so let's use her work to take it one step further using a proto-module.

### Power
You might not think of a button as needing power and you're right, sort of. While the button itself doesn't need power to function we can connect our button in such a way that it uses the power connections to create high and low states on a GPIO pin. GPIO pins on the Tessel will always read high or truthy with nothing connected because internally (inside the main Tessel chip) they are pulled up to the 3.3V supply. That's our positive connection. The other power connection is ground, which we'll connect to one side of our button. It doesn't matter which side because a button is just a momentary switch that creates and breaks a connection. You can't hook it up backward. We'll get to connecting the other side of the button in a minute.

### Communication
As mentioned above, normally your communication protocol is determined by your module. In the case of a button, we use a GPIO pin because we want to read the state of the button. Each port on the Tessel has 3 pins that can serve this purpose, and you are free to pick any one you like because it doesn't matter.

<h1 style="text-align:center;"><img src="https://s3.amazonaws.com/technicalmachine-assets/tutorials/communication-protocols/gpio_blowout.jpg" /></h1>

<p style="text-align:center"><em>GPIO pins available on a Tessel module port: G1, G2, and G3</em></p>

I'm going to choose G1, which is what I will hook up to the other side of the button. When the button is not pressed, our input pin will read high or true. Remember that it's connected internally to our 3.3V power connection. When we press it, we are making a connection between our GPIO pin and ground, which will cause a low state to be present on the input pin. This is what the design looks like.

<h1 style="text-align:center;"><img src="https://www.dropbox.com/s/aezvhlapciedyhs/switch_schematic.png?dl=1" /></h1>

<p style="text-align:center"><em>Schematic of button connections</em></p>

<h1 style="text-align:center;"><img src="https://www.dropbox.com/s/4bf42ubqzyulchs/button_module_angle.jpg?dl=1" width=300 /></h1>

<p style="text-align:center"><em>Soldered together on a proto-module board.</em></p>

Don't let the soldering part scare you. Soldering components like this onto a proto-module is really not that hard. If you've never soldered before don't be intimidated by it. You can definitely learn how. [This tutorial from Sparkfun](https://learn.sparkfun.com/tutorials/how-to-solder---through-hole-soldering) is a great place to start.

Let's go ahead and plug our module into Port A. **Remember to never make connections while your Tessel is powered up. Always unplug it first.**

### Software
With everything hooked up, it's time to write some Javascript. Actually, we're going to reuse the code from Kelsey and modify it just a bit. Since she followed the style guidelines and shared her work on NPM we actually don't have to write the bulk of the code. She's even provided a [Quick Start guide](https://github.com/Frijol/tessel-button#quick-start-i-just-want-a-button) in her documentation, so we'll use that.

  1. Install the tessel-gpio-button package. This will allow us to reuse Kelsey's work.

    ```npm install tessel-gpio-button```

  2. Create a file named **myButton.js** and copy her Quick Start code into it. It should look like this:
```js
    // examples/button.js
    // Count button presses

    var tessel = require('tessel');
    var buttonLib = require('../');
    var myButton = buttonLib.use(tessel.port['GPIO'].pin['G3']);

    var i = 0;

    myButton.on('ready', function () {
      myButton.on('press', function () {
        i++;
        console.log('Press', i);
      });

      myButton.on('release', function () {
        i++;
        console.log('Release', i);
      });
    });
```


This almost works right out of the box. We just need to make two small adjustments. Do you see them? First, to include her module we won't use "require('../')." Instead we'll include the module directly with require('tessel-gpio-button'). Second, she hooked her button up to the G3 pin on the GPIO bank but we've hooked our proto-module up to Port A and used the G1 pin. So all we have to change is the line where _myButton_ is defined. We'll change it to be:
```js
var myButton = buttonLib.use(tessel.port['A'].pin['G1']);
```

Save your changes and test it out.

```
tessel run myButton.js
```

Every time you push your button it should log to the console.

Congratulations! You just created your first custom module for the Tessel.

<h1 style="text-align:center;"><img src="https://www.dropbox.com/s/fosfc2tod786vzo/button_attached.jpg?dl=1" /></h1>

<p style="text-align:center"><em>Custom button module connected to the Tessel</em></p>

### Documentation and Sharing
We sort of cheated on our first module because Kelsey had already created an NPM package that we could reuse so there wasn't really anything to document or share. We just created the physical module and plugged it in. There is nothing wrong with that. In fact, the less code you have to write, the better. This is a great example of how taking the time to document and share your work benefits the entire community.

What we can do though is create [a project page]() showing how we took Kelsey's button to the next level in the form of a plug-in module.

[Custom Button Module Project Page]()

## Custom Screen Module
Now that you have a simple module under your belt, it's time to level up. To date, the module that people have requested the most is a screen module. Displays are tricky because they come in so many flavors. There are simple 7-segment displays, LCD displays, OLEDs, resistive touchscreens, capacitive touchscreens, and more. This is a great use case for a custom module.

One of the popular screen modules in embedded projects is the Nokia 5110 because of its simple interface and low cost. Let's see how we'd create a module for it by following the same pattern as before. For this example we'll use the [Nokia 5110 breakout from Sparkfun](https://www.sparkfun.com/products/10168) but you could also use the [Adafruit version of the screen](https://www.adafruit.com/products/338) or just try to snag one [on Ebay](http://www.ebay.com/sch/i.html?_from=R40&_trksid=p2050601.m570.l1313.TR6.TRC1.A0.H0.Xnokia+5110&_nkw=nokia+5110&_sacat=0)

<h1 style="text-align:center;"><img src="https://www.dropbox.com/s/cbbvhlaufomlzpv/nokia5110.png?dl=1" /></h1>

<p style="text-align:center"><em>Nokia 5110 Graphic LCD</em></p>

### Power
The 5110 has a listed power supply range of 2.7V to 3.3V, which means any voltage in between (inclusive) is sufficient to power the screen. Since the Tessel ports have a 3.3V supply pin we don't have to do anything special to hook it up. All we need to do is connect the screen VCC, or positive pin, to a 3.3V rail on the proto-module and the GND on the screen to a GND rail. Because of the screen's size, we'll use one of the double-wide proto-modules this time, even though we'll only use a single port to connect everything.

<h1 style="text-align:center;"><img src="https://www.dropbox.com/s/iim4g8aocek26bv/doublewide_module.jpg?dl=1" /></h1>

<p style="text-align:center"><em>Double-Wide Proto-Module</em></p>

### Communication
Just like in the button example, the communication protocol for the screen has already been chosen for us. The Nokia 5110 uses a slightly modified version of [SPI][link to SPI section in other doc] to communicate with a parent controller, namely the Tessel in our case. In addition to the normal SPI protocol, the 5110 has an extra pin involved (**D/C**) that tells the screen whether the data we are sending via SPI is a special command or actual screen data. The D/C pin is controlled by a simple high or low signal which is a perfect job for one of the GPIO pins. The following table shows all of the communication connections available on our screen and how we'll attach them to the Tessel port.

| Nokia 5110 Pin | Proto-Module Connetion                   |
|----------------|------------------------------------------|
| SCE            | G1                                       |
| RST            | Connected to 3.3V through 10K resistor   |
| D/C            | G2                                       |
| MOSI           | MOSI                                     |
| SCLK           | SCK                                      |
| LED            | Connected to G3 through 330 ohm resistor |

#### Design Note
The Nokia 5110 has 4 connections that can utilize GPIO pins for functionality. The D/C (data/command) and SCE (chip select) pins have to be used to get data to the screen. That leaves just one GPIO pin on the port with RST and LED left unconnected. You have a few options here.

  1. Wire RST to 3.3V through a 10K resistor which prevents you from resetting the screen in code. This allows you to control the backlight with the free GPIO pin.
  2. Wire LED to 3.3V through a 330 ohm resistor (to limit current) which will permanently turn on the backlight. This leaves a GPIO free that can be used to reset the screen via Javascript.
  3. Since we're using the double-wide, you could use a GPIO pin from the adjacent port and have use of both LED and RST
  4. Connect SCE (chip select) to ground, which frees up a GPIO so you can control both LED and RST. Holding the chip select low, however, makes it so that **no other SPI device** (including other Tessel modules that use SPI e.g., the Camera module) can be connected to the Tessel on any other port.

I decided to go with option 1 because there isn't really a need to reset the screen in most cases and it allows control of the backlight with a GPIO pin. This is another great thing about custom modules. You can design it however you want to fit your project needs. I hooked everything up using the [Graphic LCD Hookup Guide](https://learn.sparkfun.com/tutorials/graphic-lcd-hookup-guide).

And here is what the module looks like soldered to the double-wide proto-module.

<h1 style="text-align:center;"><img src="https://www.dropbox.com/s/zea90ijemlejcma/screen_soldered.jpg?dl=1" /></h1>

<p style="text-align:center"><em>Nokia 5110 soldered to a large proto-module board</em></p>

### Software
With the screen hooked up it's time to start writing code. We'll follow the pattern found in the [Git Repo Template][repo_template] and start by creating a directory called **tessel-Nokia5110** and cd into that directory. Next, we'll create **index.js** which is where we'll write our API using [the example index.js template](https://github.com/tessel/style/blob/master/Templates/index.js) as a guide.

Because this screen is so popular there are lots of code examples and libraries online for interacting with it. We don't need to reinvent the wheel. We just want to control the screen with Javascript so we took a [simple Arduino library](http://dlnmh9ip6v2uc.cloudfront.net/datasheets/LCD/Monochrome/Nokia_5110_Example.pde) for this screen and [ported it to Javascript](link to Github project).

Our API is very simple and exposes just one event and a few methods.

####Event
Nokia5110.**on**('ready', callback(err, screen)) - Emitted when the screen object is first initialized

####Methods
Nokia5110.**gotoXY**(x,y,[callback(err)]) - Sets the active cursor location to (x,y)

Nokia5110.**character**(char, [callback(err)]) - Writes a single character to the display

Nokia5110.**string**(data, [callback(err)]) - Writes a string to the display

Nokia5110.**bitmap**(bitmapData, [callback(err)]) - Draws a monochrome bitmap from _bitmapData_

Nokia5110.**clear**([callback(err)]) - Clears the display

Nokia5110.**setBacklight**(state) - Turns the backlight on if _state_ is truthy, off otherwise

### Documentation
Now that the module is connected up and the software is working, it's time to document its use. We can't stress enough how important this is and it really only takes a few minutes once you've defined everything. Just think of all the times you've needed a piece of code and found a beautifully documented example that had you up and running in minutes. Share that love with others when you create your own modules, no matter how trivial you think they are. In our case, we'll take the [template README.md file][readme_template] and [add some notes for getting started as well as document our API]().

We'll also create an **examples** folder to show how the module can be used.

### Sharing
Now it's time to share our new creation with the world by:

  * Creating a [git repo and pushing the code online](https://github.com/sidwarkd/tessel-nokia5110)
  * [Publishing the module to NPM](https://www.npmjs.org/package/tessel-nokia5110)
  * Creating a [project page]() for it
  * Submitting it to the [third-party module list][third_party_modules]

<h1 style="text-align:center;"><img src="https://www.dropbox.com/s/ucushe30nbx40yc/screen_connected.jpg?dl=1" /></h1>

<p style="text-align:center"><em>Finished screen module</em></p>

###Resource List
We've covered a lot in this tutorial. Here is a list of key resources to help you along the way.

README.md Template - https://github.com/tessel/style/blob/master/module_RM_template.md

[third_party_modules]: https://tessel.io/modules#third-party
[tessel_github]: https://github.com/tessel
[hardware_api]: https://tessel.io/docs/hardwareAPI
[repo_template]: https://github.com/tessel/style/tree/master/Templates
[package_json_standard]: https://www.npmjs.org/doc/files/package.json.html
[readme_template]: https://github.com/tessel/style/blob/master/module_RM_template.md
[tessel_projects]: https://projects.tessel.io/projects
[module_submission]: https://docs.google.com/a/hardlysoftware.com/forms/d/1Zod-EjAIilRrCJX0Nt6k6TrFO-oREeBWMdBmNMw9Zxc/viewform
[tessel_modules]: https://tessel.io/modules
[third_party_modules]: https://tessel.io/modules#third-party
[level_shifting]: https://learn.sparkfun.com/tutorials/voltage-dividers
[modules_page]: https://tessel.io/modules
[power_options]: asdf
[servo_module]: asdf
[comm_gpio]: #
[comm_spi]: #
[comm_i2c]: #
[comm_uart]: #
[comm_protocols]: #
[pir_project]: https://projects.tessel.io/projects/pir
[climate_module]: https://tessel.io/modules#module-climate
[third_party_doc]: https://github.com/tessel/docs/blob/master/tutorials/make-external-hardware-library.md
