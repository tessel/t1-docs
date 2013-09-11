/**
 * By default, support on this module exists only for Firmata.
 */

var firmata = require('firmata');

function promise () {
  var queue = [], args = null;
  var promise = function (fn) {
    if (promise.delivered) {
      process.nextTick(function () {
        fn.apply(null, args);
      });
    } else {
      queue.push(fn);
    }
  }
  promise.deliver = function () {
    args = arguments, promise.delivered = true;
    queue.splice(0, queue.length).forEach(function (fn) {
      process.nextTick(function () {
        fn.apply(null, args);
      });
    });
  }
  return promise;
}


exports.firmata = function (usbport) {
  var onconnect = promise();

  var board = new firmata.Board(usbport, function () {
    onconnect.deliver();
  });

  return {
    pinOutput: function (idx) {
      onconnect(function () {
        board.pinMode(idx, board.MODES.OUTPUT);
      });
    },
    digitalWrite: function (idx, val) {
      onconnect(function () {
        board.digitalWrite(idx, val ? board.HIGH : board.LOW);
      });
    },
    I2C: function (addr) {
      this.initialize = function () {
        onconnect(function () {
          board.sendI2CConfig();
        });
      }
      this.transfer = function (send, recv, next) {
        onconnect(function () {
          board.sendI2CWriteRequest(addr, send);
          board.sendI2CReadRequest(addr, recv, function (data) {
            next(null, data);
          });
        });
      }
      this.read = function (recv, next) {
        onconnect(function () {
          board.sendI2CReadRequest(addr, recv, function (data) {
            next(null, data);
          });
        });
      }
      this.send = function (send, next) {
        onconnect(function () {
          board.sendI2CWriteRequest(addr, send);
          setImmediate(next, null);
        });
      }
    }
  }
};