// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

// The `tessel` module built-in to the Tessel firmware for access to hardware
var tessel = require('tessel');

//When a message is received from the computer, this event triggers.
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