# Multiple Modules

Plug in multiple modules to your Tessel for more interactions!

Put the BLE and Accelerometer Modules together for an activity tracking app,
or a Climate Module and a Relay Module together to build an internet-connected thermostat.
Or maybe you're getting creative with the RFID, Servo, and Ambient modules all at once.


Whatever you're making, here are some tips for working with multiple modules on Tessel.

## Loading multiple modules

We recommend you use the community-created npm package <code>tesselate</code>.
This package loads all of your modules and returns them as an object when they're all ready.
Check out its usage docs <a href="https://www.npmjs.org/package/tesselate">here</a>.

For example, if you wanted to build something involving climate and relay, with `tesselate`, it might look like this:

```js
require('tesselate') ({
  modules: {
    A: ['relay-mono', 'relay'],
    B: ['climate-si7020', 'climate']
  }
}, function (tessel, modules) {
  // Function called when all modules are ready
  var relay = modules.relay;
  var climate = modules.climate;
  // Do something with relay and climate
});
```

### Why use <code>tesselate</code>? What if I don't want to?

You may have noticed that each module example tells you to wait for an <code>on('ready')</code> event.
This ensures your code doesn't run before the hardware has acknowledged that it is powered on and ready to go.

However, when you use multiple modules, waiting for ready events can cause a race condition if you're not careful.

You might be tempted to write something like this:

```js
var tessel = require('tessel');
var relay = require('relay-mono').use(tessel.port['A']);
var climate = require('climate-si7020').use(tessel.port['B']);

relay.on('ready', function () {
  climate.on('ready', function () {
    // Do something with relay and climate
  });
});
```

And it might work! But only if the climate module's ready event occurs after the relay module's event.

This is exactly the sort of async problem Node programmers run into all the time, and **your bonus challenge** is to figure out how to make this work consistently.

But if you'd rather skip the exercise, <code>tesselate</code> is a nifty little solution.

*Now make something and post about it on the <a href="//tessel.io/projects">Projects Page</a>!*
