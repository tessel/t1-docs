# Getting Started with BLE + Tessel

This guide is meant to be suitable for a Bluetooth novice. If you find any part of this guide hard to understand or inaccurate, let us know! We'd love to fix that. We hope that after reading this you'll understand what is and is not possible with BLE, as well as know when to properly refer to a BLE device as an iBeacon.

## Contents
* [Introduction](#introduction)
  * [Comparison to Classic Bluetooth](#comparison-to-classic-bluetooth)
  * [BLE Roles](#ble-roles)
    * [Central vs Peripheral](#central-vs-peripheral)
    * [Client vs Server](#client-vs-server)
    * [Beacons](#beacons)
* [Generic Attribute Profiles](#generic-attribute-profiles)
  * [Characteristics](#characteristics)
  * [Services](#services)
  * [UUIDs](#uuids)
  * [Tessel's GATT Profile](#tessels-gatt-profile)
* [Advertisements](#advertisements)
  * [Advertising packet data](#advertising-packet-data)
  * [Finding the right device](#finding-the-right-device)
  * [iBeacons](#ibeacons)
  * [Advertising Examples](#advertising-examples)
* [Connecting](#connecting)
  * [Scan for Peripherals](#scan-for-peripherals)
  * [Security](#security)
  * [Connection Examples](#connection-examples)
* [Transferring Data](#transferring-data)
  * [Service Discovery](#service-discovery)
  * [Updating a local GATT database](#updating-a-local-gatt-database)
  * [Updating a remote GATT database](#updating-a-remote-gatt-database)
  * [Subscribing to changes on a remote GATT database](#subscribing-to-changes-on-a-remote-gatt-database)
  * [Data Transfer Examples](#data-transfer-examples)
* [Testing and Debugging](#testing-and-debugging)
  * [LightBlue](#lightblue)
  * [Noble](#noble)
* [Links](#links)

## Introduction
Bluetooth Low Energy (BLE/Bluetooth 4.0/Bluetooth Smart) is the most recent incarnation of Bluetooth technology put out by the Bluetooth SIG (the organization that maintains the specification). It is designed for applications in which transferring small amounts of data at a relatively low speed makes sense, and low power consumption is necessary. It is important to understand that BLE is not at all backwards compatible with older versions of Bluetooth.

### Comparison to Classic Bluetooth
 -- Coming soon

### BLE Roles
The BLE specification allows a device to take on various roles that define the specific actions the device may be capable of.

#### Central vs Peripheral
The role of the central device is that of master. The central device searches for and establishes a connection with one or more peripheral devices.

The role of the peripheral device is that of slave. The peripheral device advertises its connect-ability, as well as any services it might provide. The central can use that data to decide if it should connect to the peripheral or not.

#### Client vs Server
In a typical connection, the central device will take on the role of client - requesting and sending data from and to one or more server devices.

Peripheral devices will typically take on the role of server. Servers keep a database of attributes that a connected client can write to, and read or subscribe to changes from.

#### Beacons
A beacon is a specific implementation of a peripheral device that does not act as a server. All of the data a central device needs from a beacon is broadcast through the advertisement, so there is no need to connect to request the data. It is also important not to confuse any generic BLE beacon with iBeacons.

## Generic Attribute Profiles
Generic Attribute Profiles (GATT Profiles) are used to define the hierarchical structure of the database a server uses to store the data it makes available to clients. A profile consists of **services**, each of which may contain multiple **characteristics**. The core specification has a small set of [pre-defined profiles](https://developer.bluetooth.org/gatt/profiles/Pages/ProfilesHome.aspx), however the specification does allow you to create your own.

### Characteristics
A characteristic represents one data attribute that a client can access. Each characteristic can store only a single value at a time. Each characteristic can have different access permissions such as read, write, and notify.

### Services
A service is used to group a category of characteristics. All characteristics must belong to a service.

### UUIDs
Every service and every characteristic must be assigned its own Universally Unique Identifier (UUID). This UUID is how devices will look for and recognize if another device supports a particular attribute. There is a set of reserved 16-bit and 32-bit UUIDs outlined in the core specification that have a predefined or reserved use across both services and characteristics. The list of profiles linked above makes use of this reserved space. If you are looking to create your own profile, the best way to get UUIDs is through the command line tool `uuidgen` if you are on OS X or Linux, or through a simple online service like http://www.uuidgen.com/.

### Tessel's GATT Profile
Below, we show a portion of the Tessel's GATT profile, which has two unique services. One service is for sharing the BLE module's firmware version, and the other is for sending and receiving data.

The second service has a total of 12 characteristics which can be used generically for sandboxed design and prototyping of your own services.

```js
{
  "services" : [
        {
            "uuid" : "08c8c7a06cc511e3981f0800200c9a66"
          , "description" : "Tessel Firmware Information"
          , "characteristics" : [
                {
                  "uuid" : "50888c106cc511e3981f0800200c9a66"
                , "id" : "c_tessel_firmware_version"
                , "description" : "Firmware Version"
                , "value" : "1.0.1"
              }
            ]
        }
      , {
            "uuid" : "d752c5fb13804cd5b0efcac7d72cff20"
          , "id" : "data_transceiver"
          , "description" : "Data Transceiving"
          , "characteristics" : [
              {
                  "uuid" : "883f1e6b76f64da187eb6bdbdb617888"
                , "id" : "c_trans_0"
                , "description" : "Transceiver Value 0"
                , "properties" : ["read", "write", "indicate", "notify"]
                , "length" : "255"
              }
              .
              .
              . // The full service contains 12 generic characteristics
              .
              .
              , {
                  "uuid" : "4a0efa07e1814a7fbd72094df3e97132"
                , "id" : "c_trans_11"
                , "description" : "Transceiver Value 11"
                , "properties" : ["read", "write", "indicate", "notify"]
                , "length" : "255"
                }
            ]
        }
  ]
}
```

You can find a JSON version of the Tessel's entire GATT Profile, including omitted services and characteristics, [in the `ble-ble113a` library](https://github.com/tessel/ble-ble113a/blob/master/lib/profile.json). Please note that this is just a description of the GATT profile, which is actually defined in the firmware of the BLE module. Making changes to the GATT profile on the module requires creating a modified version of the firmware and uploading it to the module. A guide for doing this is coming soon.

## Advertisements
In order to form a connection between two devices, the peripheral device must broadcast an advertisement for the central device to see. An advertisement packet contains the perihperal device's address, as well as a device-configurable section of data that can contain various kinds of data. A scanning central device can also request a **scan response** from a peripheral, which has the same format as an advertisement, but can contain different, additional data. Think of a scan response as a second advertisement that can be sent upon request.

### Advertising packet data
The type of data an advertisement can contain is strictly defined by the core specification and a full list of available data types can be found [here](https://www.bluetooth.org/en-us/specification/assigned-numbers/generic-access-profile). Fortunately, we have put together an [npm module called `bleadvertise`](https://www.npmjs.org/package/bleadvertise) to help you create and decode advertising data packets in a more semantic manner. Some of the more common data types to put in the advertisement are **Flags** (which is more or less mandatory), **Incomplete List of 128-bit Service UUIDs**, either **Short Local Name** or **Complete Local Name**, as well as **Manufacturer Specific Data** which is used in iBeacons. The maximum length an advertising data packet can be is 32 bytes, so this is an important consideration in designing what kinds of information to put in the advertisement and/or scan response.

### Finding the right device
When a central device is looking for a specific device or specific type of device, it has a few options in terms of what to look for in an advertisement to determine whether or not to connect. The two most common pieces of advertising data that are examined are the device address, and the complete or incomplete list of supported services. Sometimes the address is not the best way to keep track of a device, because many devices use what is known as a **random address** which will change relatively frequently, and in this case, other information in the advertisement should be used to pick a device.

### iBeacons
While any peripheral device can be a BLE beacon, and can beacon any data it wants to, there is now a very popular type of beacon specification created by Apple called the iBeacon. iBeacons are meant to be used for location-based applications, where high accuracy is important (i.e. inside a grocery store). The advertisement packet for an iBeacon is relatively simple consisting of a 128-bit location UUID followed by 2-Byte Major region code and 2-Byte Minor region code, marked as **Manufacturer Specific Data**. You can read more about the specification and licensing on [Apple's developer website](https://developer.apple.com/ibeacon/).

### Advertising Examples

The following example will show you how to set up a Tessel with a custom advertisement.

```js
var tessel = require('tessel');
var bleLib = require('ble-ble113a');
var bleadvertise = require('bleadvertise');

var packet = {
  flags: [0x02, 0x04], // Connectable, BLE only
  incompleteUUID128 : ['08c8c7a06cc511e3981f0800200c9a66'], // Tessel Firmware Version Service UUID
  shortName : 'Tessel'
}

var ad = bleadvertise.serialize(packet);

var ble = bleLib.use(tessel.port['A'], function(){
  ble.setAdvertisingData(ad, function(){
    ble.startAdvertising();
    console.log('Now advertising');
  });
});
```

That's it! We'll come back and add more to this later, once we learn about receiving connection events from a central device.

The example for creating an iBeacon is similar, but uses slightly different data.

```js
var tessel = require('tessel');
var bleLib = require('ble-ble113a');
var bleadvertise = require('bleadvertise');

var uuid = 'D9B9EC1F392543D080A91E39D4CEA95C'; // Apple's example UUID
var major = '01';
var minor = '10';

var iBeaconData = new Buffer(uuid+major+minor, 'hex'); // Create data Buffer

var packet = {
  flags: [0x04], // BLE only
  mfrData : iBeaconData
}

var ad = bleadvertise.serialize(packet);

var ble = bleLib.use(tessel.port['A'], function(){
  ble.setAdvertisingData(ad, function(){
    ble.startAdvertising();
    console.log('Beaconing');
  });
});
```
Since beacons generally aren't meant to connect to other devices, this is pretty much everything you need to make a beacon. Of course, if you want to beacon something besides a static value, you'll need to make some changes, but that's the gist of it.


## Connecting
Now that we understand how peripherals let central devices know they're available, how does the central find them and initiate the connection?

### Scan for Peripherals
The first step in discovering advertising peripherals is with a device scan. In the scanning process, the central will listen for advertisements and report when it finds one. On most platforms, there will be scanning options that let you filter discovered peripherals by the service UUIDs in their advertisements, and also prevent reporting of duplicate devices. Once you have discovered a suitable device to connect to, just send a connect command and you're ready to start exchanging data!

### Security
 -- Coming soon

### Connection Examples
First let's see what our code looks like on a Tessel acting as a central device that wants to connect to another Tessel acting as a peripheral. Let's assume that  the peripheral is advertising the same packet from our first advertisement example above.

```js
var tessel = require('tessel');
var bleLib = require('ble-ble113a');

var serviceUUID = ['08c8c7a06cc511e3981f0800200c9a66']; // UUID to filter for
var ble = bleLib.use(tessel.port['A'], function(){
  ble.startScanning(serviceUUID); // Start the scanning process
  ble.on('discover', function(peripheral){ // Catch the discover event
    peripheral.connect(); // Connect to this device
  });
  ble.on('connect', function(peripheral){ // Catch the connect event
    console.log('Connected to', peripheral.address.toString());
  });
});
```

As you can see we have two events we can listen for that let us know when a new device has been discovered or connected to.The connect event works for both central and peripheral devices, so we can go back to our advertisement example and add a listener for a connect event.

```js
var tessel = require('tessel');
var bleLib = require('ble-ble113a');
var bleadvertise = require('bleadvertise');

var packet = {
  flags: [0x02, 0x04], // Connectable, BLE only
  incompleteUUID128 : ['08c8c7a06cc511e3981f0800200c9a66'], // Tessel Firmware Version Service UUID
  shortName : 'Tessel'
}

var ad = bleadvertise.serialize(packet);

var ble = bleLib.use(tessel.port['A'], function(){
  ble.setAdvertisingData(ad, function(){
    ble.startAdvertising();
    console.log('Now advertising');
  });
  ble.on('connect', function(central){
    console.log('Connected to central device');
  });
});
```

When the connection is established the central will automatically stop scanning, and the peripheral will stop advertising. Since the central can handle connections with multiple peripherals, you can start scanning again and look for another device, if needed.


## Transferring Data
Once we have established a connection, we can start transferring data back and forth between our devices. This is where the terms client and server become relevant again. For this tutorial let's assume our central will play the role of client, and the peripheral will be the server. With BLE all data is read from and written to the server's GATT database, which is that data store who's structure is defined by the GATT profile, discussed above.

### Service Discovery
In order for a client to read and write characteristics on a remote server, it first needs to know which services and characteristics are available. To get this information, the client can request the server send over a list of all of its services and characteristics. Part of this service discovery includes a short 1-byte **handle** value for each characteristic. Once the client has the handle, it will use that instead of the 16-byte UUID for each exchange. This handle will be unique on different devices for characteristics with the same UUID, so it is always necessary to do a service discovery in order to get the proper handle, even if you already know the UUID.

### Updating a local GATT database
Since the GATT database lives on the server, it should always have direct access to the data being exchanged. The way this is handled will vary by platform and device, but most devices that support server mode should have methods for directly updating and reading values in the GATT database.

### Updating a remote GATT database
Once the client has access to the handle for the characteristic it needs to read or write to, doing so is pretty straightforward. Again, any reasonable platform should expose methods for reading/writing methods through its API. At this point it probably also important to mention that you should make sure the permissions on the characteristic you are trying to access allow your desired operation. On the Tessel, all of the Tessel-specific characteristics can be read, and all of the characteristics in the Transceiver service can be written and subscribed to, as well.

### Subscribing to changes on a remote GATT database
For some applications, you don't want to periodically check if a remote value has updated, but would rather get a notification when it has, and only then read the value. BLE allows this through two similar mechanisms. A client can set up either **notifications** or **indications** on a particular characteristic, assuming the server permissions allow it. Once a client subscribes to notifications, any time the server makes a change to the subscribed characteristic, it will let the client know, along with a short preview of the data. If the entire piece of data does not fit in the notification, the client can then send a read request for the rest. An indication works the same way, except the client must send a message back to the server, acknowledging that it received the indication.

### Data Transfer Examples
Let's go ahead and add to our earlier connection example, and make our two devices exchange data. First we'll set up our central as a client by adding a service discovery request, looking for the first transceiver characteristic, and then subscribe to notifications.

```js
var tessel = require('tessel');
var bleLib = require('ble-ble113a');

var options = { serviceUUIDs : ['08c8c7a06cc511e3981f0800200c9a66'] }; // UUID to filter for
var characteristicUUID = ['883f1e6b76f64da187eb6bdbdb617888'] // Characteristic we will write to
var ble = bleLib.use(tessel.port['A'], function(){
  ble.startScanning(options); // Start the scanning process
  ble.on('discover', function(peripheral){ // Catch the discover event
    peripheral.connect();
  });
  ble.on('connect', function(peripheral){
    console.log('Connected to', peripheral.address.toString());
    peripheral.discoverCharacteristics(characteristicUUID, function(err, characteristic) {
      if (characteristic.length){
        characteristic[0].notify(true);
        characteristic[0].on('notification', function(data){
          console.log('Got notification', data.toString());
        });
      }
    });
  });
});
```

And now we'll update our peripheral example with some corresponing server functionality. We'll need to set it up to listen for when the client subscribes to a characteristic. Once that happens, we can periodically update the value and the client should automatically receive notifications.

```js
var tessel = require('tessel');
var bleLib = require('ble-ble113a');
var bleadvertise = require('bleadvertise');

var packet = {
  flags: [0x02, 0x04], // Connectable, BLE only
  incompleteUUID128 : ['08c8c7a06cc511e3981f0800200c9a66'], // Tessel Firmware Version Service UUID
  shortName : 'Tessel'
}

var ad = bleadvertise.serialize(packet);

var ble = bleLib.use(tessel.port['B'], function(){
  ble.setAdvertisingData(ad, function(){
    ble.startAdvertising();
    console.log('Now advertising');
  });
  ble.on('connect', function(central){
    console.log('Connected to central device');
  });
  ble.on( 'remoteNotification', function(connection, index){ // Catch when remote subscribes
    console.log('Notifications started');
    var count = 0;
    setInterval(function(){
      ble.writeLocalValue(index, new Buffer( count.toString() )); // Write to [index] transceiver value
      count++;
    }, 2000);
  });
});
```

## Testing and Debugging
When working with BLE you might encounter an issue that you realize you have no way to resolve, especially if you are using a device which you cannot make any changes to. The following are some of the most helpful that we've found in working with Bluetooth.

### LightBlue
LightBlue is an OS X and iOS application that allows you to see and connect to BLE devices, as well as run a service discovery, and make read/write/notify requests. This is great if you are working with a peripheral device and want to see it from the perspective of a central device.

### Noble
Noble is a Node library which allows you to access the BLE capabilities of newer Mac Books as well as Linux laptops with the appropriate hardware. Noble allows you to set up your laptop as a central device, and its companion library, Bleno, allows you to set up the computer as a peripheral.

## Links
* [ble-ble113a library on Github](https://github.com/tessel/ble-ble113a)
* [Noble](https://github.com/sandeepmistry/noble)
* [More on GATT Profiles](https://developer.bluetooth.org/TechnologyOverview/Pages/GATT.aspx)
* [Advertisement data types](https://www.bluetooth.org/en-us/specification/assigned-numbers/generic-access-profile)
* [Bluetooth 4.1 Core Specification](https://www.bluetooth.org/en-us/specification/adopted-specifications)
