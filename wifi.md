#Connect Tessel to Wifi
Tessel has Wifi built into the main board ([CC3000](http://www.ti.com.cn/cn/lit/ds/symlink/cc3000.pdf)).

##Connecting to a network

Tessel can only connect to 2.4GHz networks.

To connect to a new network, enter in your command line (without brackets)

```.sh
tessel wifi -n [network name] -p [password] -s [security type*]
```

The security type flag is optional; default is wpa2.


Tessel is connected to Wifi when the yellow status light is on. Tessel saves network credentials and tries to reconnect automatically on startup.

Once that yellow light is on, you're connected to Wifi!

<img src='https://s3.amazonaws.com/technicalmachine-assets/fre+assets/wifi.JPG'>

##Wifi Commands
```.sh
tessel wifi -n <ssid> -p <password> [-s <security (wep/wpa/wpa2 by default)>]
```
Connects to wifi

```.sh
tessel wifi -n <ssid>
```
Connects to a wifi network without a password

```.sh
tessel wifi -l
```
See current wifi status

##Example
Here is an example of requesting a website over Tessel's Wifi connection:

Save the following code in a file called wifi.js:

```.js
var http = require('http');

var statusCode = 200;
var count = 1;

setImmediate(function start () {
  console.log('http request #' + (count++))
  http.get("http://httpstat.us/" + statusCode, function (res) {
    console.log('# statusCode', res.statusCode)
    
    var bufs = [];
    res.on('data', function (data) {
      bufs.push(new Buffer(data));
      console.log('# received', new Buffer(data).toString());
    })
    res.on('close', function () {
      console.log('done.');
      setImmediate(start);
    })
  }).on('error', function (e) {
    console.log('not ok -', e.message, 'error event')
    setImmediate(start);
  });
});
```

Run the code on your Tessel by typing this in the terminal:

```.sh
tessel run wifi.js
```
Watch Tessel ping the website in your console!

##Debugging
If you run into errors: First, check to make sure the yellow status light is on. If it is not, you are not connected to Wifi. Try power cycling your Tessel and then run the tessel wifi command again.

If you're still having trouble, please log your error on the [Wifi forums](http://forums.tessel.io/category/wifi).
