# Running Tessel from a Battery
 Tessel can be unplugged from your computer and powered from alternative power sources, like a USB battery.

## Deploying Code to Tessel

While Tessel is connected to the computer, you can push code into Tessel's Flash memory with the following command:

```sh
tessel push script.js
```
(Try it with blinky.js from [here](http://start.tessel.io/blinky) if you just want to test it out.)

Once the push command completes, you can disconnect Tessel from your computer and connect it to a different power source.

*(You can read more about pushing vs running code on Tessel [here](http://start.tessel.io/usage).)*

## Powering Tessel

For the simplest power solution, all you need is a USB charger of some kind:

<img src=https://s3.amazonaws.com/technicalmachine-assets/doc+pictures/tessel-battery.jpg width=40%>
<img src=https://s3.amazonaws.com/technicalmachine-assets/doc+pictures/tessel-plug.jpg width=40%>

*USB battery* | *USB wall adapter*

(There are various other ways to power your Tessel as well. You can read about them [here](https://github.com/tessel/hardware/blob/master/powering-tessel.md).)

Once you've pushed your code to Tessel's Flash, plug in your Tessel to power.

Tessel should boot up and immediately start running your code.

*Make something cool? Show it off on the [Projects Page](//projects.tessel.io)!*
