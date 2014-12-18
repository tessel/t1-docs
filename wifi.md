#Connect Tessel to Wifi
Tessel has Wifi built into the main board ([CC3000](http://www.ti.com/lit/ds/symlink/cc3000.pdf)).

##Connecting to a network

Tessel can only connect to 802.11b/g networks using channels 1 through 11. The Wifi chip does not support 802.11n or channels 12 - 14. If you are having trouble connecting, make sure the router has b/g mode enabled and isn't using channels 12, 13, or 14.

To connect to a new network, enter in your command line (without brackets)

```.sh
tessel wifi -n [network name] -p [password] -s [security type*]
```

The security type flag is optional; default is wpa2.


Tessel is connected to Wifi when the yellow status light is on. Tessel saves network credentials and tries to reconnect automatically on startup- the yellow light blinks, and then either goes steady (connected) or turns solid red (failed to connect).

You can run `tessel wifi -l` to see connection status and the IP address of your Tessel.

<img src='https://s3.amazonaws.com/technicalmachine-assets/fre+assets/wifi.JPG'>

##Wifi Commands
```sh
tessel wifi -n <ssid> -p <password> [-s <security (wep/wpa/wpa2 by default)>]
```
Connects to wifi

```sh
tessel wifi -n <ssid>
```
Connects to a wifi network without a password

```sh
tessel wifi -l
```
See current wifi status

```sh
tessel wifi -d
```
Disconnect from any currently connected network and forget the credentials

##Example
Here is an example of requesting a website over Tessel's Wifi connection:

Save the following code in a file called wifi.js:

```js
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

```sh
tessel run wifi.js
```
Watch Tessel ping the website in your console!


##Connecting to Wifi from JS
Access Wifi from JS, including connection/dropping events, SmartConfig settings, WLAN settings, and finding available networks.

Access through:

```js
var wifi = require('wifi-cc3000');
```

###Methods:

&#x20;<a href="#api-wifi-connect-wifiSettings-callback-err-res" name="api-wifi-connect-wifiSettings-callback-err-res">#</a> wifi<b>.connect</b>( wifiSettings, [callback(err, res)] )  
Connects to an access point. Takes in an optional callback. The `connected`, `disconnected`, and `timeout` events are emitted. Returns the wifi object.

If there is already another wifi connection being initialized (from the command line, for example), this will error out immediately.

`wifiSettings` is an object that consists of:

```js
{ ssid: // this can either be a string or a buffer
  , password: // this can either be a string or a buffer. Use a buffer if you need to pass in hex.
  , security: defaults to wpa2 
  , timeout: defaults to 20s
}
```

`res` contains the following:

```js
res.ip;
res.gateway;
res.dns;
res.ssid;
res.macAddress; // not exposed yet, will add this when we add firmware support for mac address
```

&#x20;<a href="#api-wifi-isConnected" name="api-wifi-isConnected">#</a> wifi<b>.isConnected</b>()  
Returns `true` if connected, `false` if not connected.

&#x20;<a href="#api-wifi-isBusy" name="api-wifi-isBusy">#</a> wifi<b>.isBusy</b>()  
Returns `true` if the CC3k is currently trying to connect/disconnect. Recommended to wait until the CC3k is not busy before issuing commands. After a request has been made to initiate a connection, the CC3k will be "busy" until it receives a connect or a disconnect call. However, sometimes the CC3k never gets a callback (usually more common with weak wifi strength). It's up to the user to decide whether or not to timeout and ignore the `isBusy`.

&#x20;<a href="#api-wifi-connection" name="api-wifi-connection">#</a> wifi<b>.connection</b>()  
Returns the details of the connection object or null if not connected. Connection object is the same as the result in `wifi.connect`

&#x20;<a href="#api-wifi-reset-callback" name="api-wifi-reset-callback">#</a> wifi<b>.reset</b>( [callback] )  
Returns the wifi object. Does a software reset of the wifi chip. Useful for forcing a fastConnect on boot. Callback is optional.

&#x20;<a href="#api-wifi-disable-callback" name="api-wifi-disable-callback">#</a> wifi<b>.disable</b>( [callback] )  
Returns the wifi object. Turns off the wifi chip. Saves on power. Callback is optional.

&#x20;<a href="#api-wifi-enable-callback" name="api-wifi-enable-callback">#</a> wifi<b>.enable</b>( callback )  
Returns the wifi object. Turns on the wifi chip.

&#x20;<a href="#api-wifi-disconnect-callback" name="api-wifi-disconnect-callback">#</a> wifi<b>.disconnect</b>( callback )  
Disconnects from the network.

&#x20;<a href="#api-wifi-isEnabled" name="api-wifi-isEnabled">#</a> wifi<b>.isEnabled</b>()  
Returns `true` if the CC3k is enabled (powered on, regardless of connection status). Returns `false` if the CC3k is powered off.

####Events

&#x20;<a href="#api-wifi-on-connect-callback-err-res" name="api-wifi-on-connect-callback-err-res">#</a> wifi<b>.on</b>( 'connect', callback(res) )  
Event emitted on connection. `res` contains the following:

```js
res.ip;
res.gateway;
res.dns;
res.ssid;
res.macAddress; // will add when its exposed in firmware
```

&#x20;<a href="#api-wifi-on-disconnect-callback-err" name="api-wifi-on-disconnect-callback-err">#</a> wifi<b>.on</b>( 'disconnect', callback(err) )  
Called when wifi drops.

&#x20;<a href="#api-wifi-on-timeout-callback-err" name="api-wifi-on-timeout-callback-err">#</a> wifi<b>.on</b>( 'timeout', callback(err) )  
Called when the CC3k times out after the `.connect` call.

&#x20;<a href="#api-wifi-on-error-callback-err" name="api-wifi-on-error-callback-err">#</a> wifi<b>.on</b>( 'error', callback(err) )  
The `error` event will be called for any of the following actions:

1. tried to disconnect while not connected
2. tried to disconnect while in the middle of trying to connect
1. tried to initialize a connection without first waiting for a timeout or a disconnect

##Debugging
* Check to see if Tessel is connected to wifi with `tessel wifi -l`. If there is no IP address, you are not connected to Wifi. Try power cycling your Tessel and then run the tessel wifi connection command again.
* Move closer to the router.
* Make sure the router has b/g mode enabled and isn't using channels 12, 13, or 14.

If you're still having trouble, please log your error on the [Wifi forums](http://forums.tessel.io/category/wifi).
