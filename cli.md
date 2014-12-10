#Tessel CLI

Tessel CLI is the command line interface for the Tessel microcontroller (http://tessel.io).
[[CLI source.](https://github.com/tessel/cli)]

* [Installation](#installation)
* [Commands](#commands)
* [Code Deploy Process](#deploying)
* [REPL](#repl)

##Installation

Node.js is a prerequisite for installing the Tessel command line. You can install it from the official website, or if you have brew installed:

```sh
brew install node
```

Once Node.js is installed, run this installation script from your terminal:

```sh
npm install -g http://s3.amazonaws.com/builds.tessel.io/cli/tessel-cli-current.tar.gz
```

##Commands

#####`tessel <filename>`
#####`tessel list`
#####`tessel logs`
#####`tessel push <filename> [options]`
Push a file and its containing directory into flash memory (persists across power cycles). For more information about what files/folders are sent to Tessel, see the [deploying](#deploying) section. 
Options:
* `-a, --args`      Arguments to passin as process.argv
* `-q, --quiet`     [Tessel] Hide tessel deployment messages
* `-m, --messages`  [Tessel] Forward stdin as child process messages
* `-l, --logs`      [Tessel] Stay connected and print logs
* `-s, --single`    [Tessel] Push a single script file to Tessel
* `-h, --help`      Show usage for tessel push

#####`tessel run <filename> [options]`
Run a script and its containing directory temporarily without writing it to flash. For more information about what files/folders are sent to Tessel, see the [deploying](#deploying) section. 
Options:
* `-a, --args`          Arguments to passin as process.argv
* `-i, --interactive`   Enter the REPL
* `-q, --quiet`         [Tessel] Hide tessel deployment messages
* `-m, --messages`      [Tessel] Forward stdin as child process messages
* `-l, --logs`          [Tessel] Stay connected and print logs
* `-s, --single`        [Tessel] Push a single script file to Tessel
* `-u --upload-dir`     Directory where uploads from process.sendfile should be saved
* `-v, --version`       Print tessel-node's version
* `-h, --help`          Show usage for tessel push

#####`tessel repl`
Interactive JavaScript shell - see [REPL docs below](#REPL)
#####`tessel wifi -n <ssid> -p <password> [-s <security (wep/wpa/wpa2 by default)>]`
Connects to wifi
#####`tessel wifi -n <ssid>`
Connects to a wifi network without a password
#####`tessel wifi -l`
See current wifi status
#####`tessel stop`
#####`tessel pack <filename>`
Creates a tarball of all the files that would be sent over to Tessel. This is helpful for checking what files may be too large or missing from any particular script. 
#####`tessel check <filename>`
Dumps tessel binary code
#####`tessel dfu-restore [tag]`
Uploads new firmware in DFU mode.
No tag given: list available tags
Relative or absolute filepath: push a local binary to tessel
#####`tessel blink`
Run test script to make LEDs blink back and forth
#####`tessel update <filepath|url>`
Updates tessel to the newest released firmware localed at filepath or url.
#####`tessel update [options]`
Updates tessel's firmware
Options:
* `-l, --list`   List firmware versions
* `-w, --wifi`   Optional version of CC3000 wifi firmware to install
* `-b, --build`  Optional build of the firmware version (does not update wifi)
* `-f, --force`  Forcibly reload firmware onto Tessel
* `-d, --dfu`    Apply firmware update to device in DFU mode

#####`tessel debug [script]`
Runs through debug script and uploads logs
#####`tessel version`
Show version of CLI
#####`tessel version --board`
Show version of the connected Tessel

##Deploying
When a host computer deploys code to Tessel (either via the `run` or `push` command), the host computer bundles up the entire "project directory" and sends it to the Tessel. The CLI must wrap up all the dependencies (node_modules and subfolders) before sending the project over  because the Tessel has no mechanism for fetching them from the host computer once the script has initiated on Tessel. The CLI defines the root of a "project directory" as the highest level folder that contains a node_modules folder or a package.json (note: if you pass the -s flag, only a single file is sent). This means that when `tessel run` or `tessel push` is called, the CLI will traverse up the directory tree until it finds a folder that matches that criteria. It will not bundle the home folder of a filesystem because it's probably greater than the 32MB available on Tessel.

If you're having trouble figuring out which files are being sent to Tessel, use the `tessel pack` command.   

##REPL
*Source: [tessel-repl](https://github.com/tessel/cli/blob/master/src/commands.js) or [tessel-run](https://github.com/tessel/cli/blob/master/bin/tessel-run.js) with the interactive flag set.*

Tessel has a REPL, an interactive JavaScript shell. Enter the REPL by running `tessel repl`.

Require tessel as usual with `var tessel = require('tessel')`

Now play! Try `tessel.led[1].toggle()` to turn one of the LEDs on or off.

Tessel REPL is under development; feel free to [contribute](https://github.com/tessel/contribution-guide).
