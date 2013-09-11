/**
 * By default, support on this module exists only for Firmata.
 */

exports.firmata = function (board) {
  return {
    pinOutput: function (idx) {
      board.pinMode(idx, board.MODES.OUTPUT);
    },
    digitalWrite: function (idx, val) {
      board.digitalWrite(idx, val ? board.HIGH : board.LOW);
    },
    I2C: function (interface, addr) {
      this.initialize = function () {
        board.sendI2CConfig();
      }
      this.transfer = function (send, recv, next) {
        board.sendI2CWriteRequest(addr, send);
        board.sendI2CReadRequest(addr, recv, function (data) {
          next(null, data);
        });
      }
      this.read = function (recv, next) {
        board.sendI2CReadRequest(addr, recv, function (data) {
          next(null, data);
        });
      }
      this.send = function (send, next) {
        board.sendI2CWriteRequest(addr, send);
        setImmediate(next, null);
      }
    }
  }
};