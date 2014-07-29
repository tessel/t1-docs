# USB communication between Tessel and Node on your PC

In addition to loading code, you can also use the USB connection to Tessel to pass data between your Tessel and Node.js on your PC. Combine your Tessel's easy access to hardware and your computer's processing power to do things neither device can do alone.

Both Tessel and Node run JS, but you don't want all your host-side code on the Tessel. To keep your code and modules separate between the computer and the Tessel, we'll put the Tessel code in a subdirectory. The host and device each have their own `node_modules` for npm packages.

```.sh
mkdir node_modules
mkdir device
mkdir device/node_modules
```

The `tessel` command line tool can also function as a library. You'll write a Node script that takes the place of `tessel run`, and not only deploys your code to the Tessel, but also communicates with it. Install the library with:

```.sh
npm install tessel
```

After setting this up, your directory structure will look like:

```
./
  /host.js         -- script that runs on the computer
  /node_modules    -- npm modules for the computer
    /tessel        -- the Tessel host-side USB module
  /device          -- this entire directory will be deployed to Tessel
    /node_modules  -- all the libs that run ON Tessel go here (camera, ambient, IR, etc.)
    /device.js     -- the main script that runs on Tessel
                   -- other JS files for Tessel go here
```
---

Here's the code that runs on the PC. Put it in `host.js`.

~~~.js
var tessel = require('tessel');

var script =  require.resolve('./device/index.js');

var opts = {
  stop: true, // stop existing script, if any
  serial: process.env.TESSEL_SERIAL, // serial number (`undefined` picks the first one)
};

var args = [];
 
tessel.findTessel(opts, function(err, device) {
    if (err) throw err;
    
    device.run(script, args, {}, function () {
          // Connect Tessel stdout / stderr to the console
          device.stdout.resume();
          device.stdout.pipe(process.stdout);
          device.stderr.resume();
          device.stderr.pipe(process.stderr);
 
          var count = 0;
 
          setInterval(function(){
            device.send({count:count++, data: {obj: 'demo'}})
          }, 4000);
          
          device.on('message', function (m) {
            console.log('[PC] Message from Tessel:', m);
          });
 
          // Stop on Ctrl+C.
          process.on('SIGINT', function() {
            // Try to stop the process on the Tessel
            device.stop();

            setTimeout(function () {
              // But if that fails, just exit
              logs.info('Script aborted');
              process.exit(131);
            }, 200);
          });
 
          // When the script on Tessel exits, shut down
          // USB communications and exit
          device.once('script-stop', function (code) {
            device.close(function () {
              process.exit(code);
            });
          });
    });
});
~~~

When we `require('tessel')` here, this is not the same as the `tessel` module for hardware access on the Tessel itself. This module is the library for Tessel USB communication.

`tessel.findTessel` finds a Tessel connected to this computer and connects to it. 

Once we've found a Tessel, we tell it to run our script. This works just like `tessel run` and bundles the `device/` directory. It bundles only `device/` and not the host code because `device/` has its own `node_modules`.

With the script running, we connect the stdout and stderr of the process running on Tessel to the console, so that our `console.log` messages show.

`device.send(msg)` sends an object to Tessel. It supports JSON compatible objects as messages, with the addition that `Buffer`s, `Date`s and cyclic data structures are also handled properly.

`device.on('message', function (msg) { ... })` receives an event when an object is received from Tessel.

The end of the file contains the code to exit cleanly when you Ctrl-C or if the Tessel script ends.

---

The code that runs on Tessel is very simple. Put it in `device/index.js`

~~~.js
var tessel = require('tessel');

// When we receive a message from the PC
process.on('message', function(msg) {
  console.log("[Tessel] Message from PC:", msg);
});

var counter = 0;

// Every 5 seconds...
setInterval(function() {
  // Send a message to the computer
  process.send({count: counter++});
}, 5000);

// Keep the event loop alive 
process.ref();
~~~

When a message is received from the computer, the `process.on('message', function(msg) {` event triggers.
  
To send a message to the computer, call `process.send(msg)`

---

To try this example, run `node host.js`. It runs the device-side code on the Tessel as it starts.

Code examples in this document are placed in the [public domain](http://creativecommons.org/publicdomain/zero/1.0/).
