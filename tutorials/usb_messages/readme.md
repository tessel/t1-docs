# USB communication between Tessel and Node on your PC

In addition to loading code, you can also use the USB connection to Tessel to pass data between your Tessel and Node.js on your PC. Combine your Tessel's easy access to hardware and your computer's processing power to do things neither device can do alone.

Messages are JavaScript objects. It uses [structured clone](https://github.com/tcr/structured-clone), which beyond JSON, supports cyclic structures and  `Buffer`, `RegExp`, and `Date` objects.

We've built an example for you to expand on:

```
git clone https://github.com/tessel/docs.git
cd docs/tutorials/usb_messages
npm install
node host.js
```
The directory structure looks like:

```
./
  /host.js         -- script that runs on the computer
  /package.json
  /node_modules    -- npm modules for the computer
    /tessel        -- the Tessel host-side USB module
  /device          -- this entire directory will be deployed to Tessel
    /package.json
    /node_modules  -- all the libs that run ON Tessel go here (camera, ambient, IR, etc.)
    /device.js     -- the main script that runs on Tessel
                   -- other JS files for Tessel go here
```

Both Tessel and Node run JS, but you don't want all your host-side code on the Tessel. The host and device each have their own `node_modules` for npm packages. Only `devices/` is sent to the Tessel, because it has its own `package.json`.

The `tessel` command line tool functionality is also exposed as a library.
`host.js`   uses that library to take the place of `tessel run`, and not only
deploys your code to the Tessel, but also communicates with it.

The Tessel code, `device/index.js`, simply demonstrates sending and receiving messages.

To try this example, run `node host.js`. It sends the device-side code on the Tessel as it starts.

## Multiple Tessels on one computer
**Note only works on Linux & Mac due to Windows hotplug issues**

This deploys the same script to multiple Tessels and listens for output from each one.

```
git clone https://github.com/tessel/docs.git
cd docs/tutorials/usb_messages
npm install
node multi_host.js
``` 
