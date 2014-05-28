#Tessel CLI

Tessel CLI is the command line interface for the Tessel microcontroller (http://tessel.io).

##Install
Node.js is a prerequisite for installing the Tessel command line. You can install it from the official website, or if you have brew installed:
```.bash
brew install node
```
Once Node.js is installed, run this installation script from your terminal
```.bash
npm install -g http://s3.amazonaws.com/builds.tessel.io/cli/tessel-cli-current.tar.gz
```

##Commands
#####`tessel <filename>`
#####`tessel list`
#####`tessel logs`
#####`tessel push <filename> [options]`
Push a file into flash memory (persists across power cycles). Request more information with `tessel push --help`
#####`tessel run <filename> [options]`
Run a script temporarily without writing it to flash.
`-s` to push the specified file only (by default, we push the associated files and modules as well)
#####`tessel repl`
Interactive JavaScript shell
#####`tessel wifi -n <ssid> -p <password> [-s <security (wep/wpa/wpa2 by default)>]`
Connects to wifi
#####`tessel wifi -n <ssid>`
Connects to a wifi network without a password
#####`tessel wifi -l`
See current wifi status
#####`tessel stop`
#####`tessel check <filename>`
Dumps tessel binary code
#####`tessel dfu-restore [tag]`
Uploads new firmware in DFU mode.
No tag given: list available tags
Relative or absolute filepath: push a local binary to tessel
#####`tessel blink`
Run test script to make LEDs blink back and forth
#####`tessel update [--list] [-b build] [-u <url>]`
Updates tessel to the newest released firmware. Optionally can list all builds. Can specify by build or url to download the firmware from
#####`tessel debug [script]`
Runs through debug script and uploads logs
#####`tessel version`
Show version of CLI
#####`tessel version --board`
Show version of the connected Tessel
