# Debugging Tessel

You can debug Tessel by soldering [JTAG headers](https://s3.amazonaws.com/technicalmachine-assets/doc+pictures/hardware_design_docs/TM-00-04-ports.png) to the board and using a JTAG debugger. This tutorial asummes you are using a [Bus Blaster](http://www.seeedstudio.com/depot/Bus-Blaster-v3-p-1415.html) and an associated [JTAG 20 -> 10 pin adapter](http://www.digikey.com/product-detail/en/ARM-JTAG-20-10/1188-1016-ND/3471401).

## Setup
1. Install OpenOCD. You need version >= 0.8.0.
  * This version is not in Ubuntu 14.04, but the [packages from Ubuntu Utopic work fine there](https://launchpad.net/ubuntu/+source/openocd)
  * `brew install open-ocd` installs >= 0.8.0.

1. Acquire a configuration script for your Bus Blaster. Included in the firmware repo is `tools/tessel-busblaster.cfg`.

1. Plug the JTAG cable into the Bus Blaster's adapter board and the Tessel. Pin one is towards the USB port; the cable goes over the center of the board.

1. Run

  ```
  arm-none-eabi-gdb out/Release/tessel-firmware.elf -ex 'target remote | openocd -c "gdb_port pipe;" -f tools/tessel-busblaster.cfg'
  ```
  (adjust paths as appropriate) to launch gdb.

## GDB commands

### Basics
  * `c` - continue
  * `ctrl-c` - stop
  * `p expr` - print the value of the C expression `expr`
  * `bt` - stack backtrace
  * `s` - step instruction, goes into calls
  * `n` - next instruction, skips over calls
  * `fin` - run until return from function
  * `break function` - break at the beginning of a function (can also pass `file.c:line`)
  * `delete 1` - delete the first breakpoint
  * `tbreak` - break only once

### Hardware
  * `mon reset` - Reset Tessel and all on-chip peripherals (like the reset button)
  * `mon soft_reset_halt` - Reset the CPU only

## Other notes

* Make sure your `.elf` file matches the firmware on the Tessel. Otherwise the position information will be wrong and calls will crash.
* LPC1800 SPIFI Flash is functional from OpenOCD, but I don't recommend using it. Flash Tessel with the bootloader (`make arm-deploy`) before running GDB.
* The ROM confuses JTAG on reset. If you `c` and then `ctrl-c`, it recovers. To debug the very beginning of execution, use

  ```
  mon soft_reset_halt
  tbreak main
  c
  ```

## Troubleshooting

**OS X:** If you are getting a `libusb` error, you may need to disable some system drivers in order for OpenOCD to work. Run `kextstat | grep -i ftdi`. If any drivers are listed, you need to run either `sudo kextunload -bundle com.apple.driver.AppleUSBFTDI` and/or `sudo kextunload -bundle com.FTDI.driver.FTDIUSBSerialDriver`. For a long-term solution for configuring this, see <http://alvarop.com/2014/01/using-busblaster-openocd-on-osx-mavericks/>.
