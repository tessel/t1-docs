## Spi Locks and Raw Transfers

For most applications, the typical spi transfer method is ideal:
```.js
spi.transfer(someData, function(err, receivedData) {
  ...
});
```

But occasionally, a finicky piece of hardware will require very specific timing on SPI communication. Specifically, it may want to have full control over the SPI bus.

Most hardware APIs don't use asynchronous JavaScript so they don't have this fun challenge. We pity them.

Each module port on Tessel shares the same SPI CLK, MISO, and MOSI lines. Unique GPIOs on each port are used as chip selects so peripherals know when they are being addressed. However, some hardware may not use a chip select pin or it may have some other reason that it needs the SPI Bus to remain perfectly calm except when talking to it.

For that reason, we've have a locking implementation. A SPI Lock will retain control of the SPI Bus so you can immediately transfer whatever data needs to be transfered and all requests from other ports will be queued until the lock is released.

As an example, let's say we have a module on port A that needs all of it's communication to be done in a lock. We would do it like so:

```.js
var tessel = require('tessel');
var spi = tessel.port['A'].SPI();

function SPITransfer(data, callback) {
  
  // Request a lock
  // Callback called when lock received
  spi.lock(function(err, lock) {

    // Complete the transfer (skips the entire queue)
    lock.rawTransfer(data, function(err, rxdata) {

      // Release the lock when you're done
      lock.release( function() {

        // Call the callback with return data
        callback(err, rxdata);
      });
    });
  });
}
```

Locks queue on top of each other as well so you can have locks waiting for locks waiting for locks. Use them wisely.
