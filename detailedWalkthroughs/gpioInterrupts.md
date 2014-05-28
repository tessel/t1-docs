#External GPIO Pin Interrupts API

External interrupts are used for getting updated from other sensors or the environment that something has changed. It allows the processesor to work on other tasks until the state of a pin is altered at which point hardware processes take over and handle the interrupt.

You'll notice that they were designed to work in the same manner as traditional Node EventEmitter APIs.
 

There are five different GPIO interrupt modes to work with:

- Level Triggers:
  * `'high'` called as soon as a pin is high (may be immediately). Can only be watched for with the `once` method. Attempt to call `on` with a level interrupt will execute the Error Routine (See Error Routine below)
  * `'low'` called as soon as a pin is low (may be immediately). Can only be watched for with the `once` method. Attempt to call `on` with a level interrupt will execute the Error Routine (See Error Routine below)
- Edge Triggers:
  * `'rise'` called when the state of a pin switches from low to high. Can be used with either `on` or `once`.
  * `'fall'` called when the state of a pin switches from high to low. Can be used with either `on` or `once`.
  * `'change'` called on either `'rise'` or `'fall'` event.

## Parameters
A pin emission event has the following parameters:
```.js
pin.on('change', function(time, trigger));
```
Where `time` is the number of milliseconds since Tessel booted and `trigger` is the actual trigger of the interrupt (eg. `'rise'`) which is generally only used for the `'change'` event.

## Seven maximum Interrupts
There are seven maximum GPIO interrupts to be assigned. **Each interrupt can only support *either* edge triggers or level triggers. A single interrupt can support multiple modes of either type (eg. both `'rise'` and `'fall'`) . Therefore, a single pin can use either 1 or 2 interrupts.** This is important to know so the user can keep track of how many interrupts remain.

The following uses a single interrupt:
```.js
// Edge trigger
pin.on('rise', someFunc(){});

// Edge trigger
pin.on('fall', someOtherFunc(){});
```

But the following needs two separate interrupts:
```.js
// Edge trigger
pin.on('fall', someFunc(){});

// Level Trigger
pin.once('high', someOtherFunc(){});
```

## Watch for a single event:
```.js
var tessel = require('tessel');
var pin = tessel.port['A'].digital[0];

// To watch for a single event continuously:
pin.on('change', someFunc);

// OR

// To watch only once
// (interrupt will be removed if this was the last callback)
pin.once('change', someFunc);

// time is a timestamp (in ms since startup)
// trigger what triggered the interrupt (eg. 'rise'). This is really only 
// useful for the 'change' mode
function someFunc(time, trigger) {}
```

## Stop watching a single event:
```.js

// Remove one callback.
// If it's the only callback, then this interrupt mode will be disabled.
pin.removeListener('change', someFunc);

// OR

// Remove all listeners for the pin, effectively freeing the interrupt
// if this was the only mode we're listening for
pin.removeAllListeners('change');
```

## Watch For Multiple Modes
```.js

// Watch for the fall event
pin.on('fall', someFunc(){});

// AND

// Watch for the high event
pin.once('high', someOtherFunc(){});

// The fall event is still being listened for
pin.removeListener('high', someOtherFunc);
```

## Remove All Listeners 
```.js
// This is guaranteed to free all the listeners on a pin and make the interrupt
// available for a different use.
pin.removeAllListeners();
```
## Removing Change Events
```.js

pin.once('low', someFunc(){});

pin.on('change', someOtherFunc(){});

// Does NOT remove the `'low'` listener
pin.removeAllListeners('change');

```
## Out of Interrupts
In the case that seven interrupts have already been assigned, Tessel will check to see if there are any interrupts available and, if not, will execute the Error Routine (see Error Routine below).
```.js

// Assume seven interrupts already assigned
pin.on('error', function(err) {
  console.log('ERR': err);
}
pin.on('fall', function(err) {});

// Also `console.warn` "WARNING: Attempt to use more than the seven available interrupts"
```

`tessel. getRemainingInterrupts(callback)` will return the number of gpio interrupts remaining. 

## Error Routine
There are two reasons for a pin interrupt registration to fail:
* `on` was called with a level interrupt mode
* Another interrupt attempted to register after all seven interrupts were registered.

In these cases, another interrupt will not be registered. If there is an `error` listener for the pin, an `error` event will be emitted. If not, an Error will be immediately thrown.
