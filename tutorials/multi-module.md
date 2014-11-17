extends layout

block content
  .row
    .large-12.columns.fre-container
      h1 Multiple Modules
      p Plug in multiple modules to your Tessel for more interactions!
      p Put the BLE and Accelerometer Modules together for an activity tracking app, or
        |  a Climate Module and a Relay Module together to build an internet-connected thermostat.
        |  Or maybe you're getting creative with the RFID, Servo, and Ambient modules all at once.
      p Whatever you're making, here are some tips for working with multiple modules on Tessel.
      
      h2 Loading multiple modules
      p We recommend you use the community-created module <code>tesselate</code>.
        |  This module loads all of your modules and returns them as an object when they're all ready.
        |  Check out its usage docs <a href="https://www.npmjs.org/package/tesselate">here</a>.
      p For example, try 
      
      h3 Why use <code>tesselate</code>? What if I don't want to?
      p You may have noticed that each module example tells you to wait for an <code>on('ready')</code> event.
        |  This ensures your code doesn't run before the hardware has acknowledged that it is powered on and ready to go.
      p However, when you use multiple modules, waiting for ready events can cause a race condition if you're not careful.
      p You might be tempted to write something like this:
      pre.prettyprint
        code.
          var tessel = require('tessel);
          var relay = require('relay-mono').use(tessel.port['A']);
          var climate = require('climate-si7020').use(tessel.port['B']);
          
          relay.on('ready', function () {
            climate.on('ready', function () {
              // Do something with relay and climate
            });
          });
          
      p And it might work! But only if the climate module's ready event occurs after the relay module's event.
      p This is exactly the sort of async problem Node programmers run into all the time, and your bonus challenge is to figure out how to make this work consistently.
      p But if you'd rather skip the exercise, <code>tesselate</code> is a nifty little solution:

      pre.prettyprint
        code.
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
      p
        i Now make something and post about it on the <a href="//tessel.io/projects">Projects Page</a>!
