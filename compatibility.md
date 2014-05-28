#Tessel is programmed in JavaScript.

Tessel is programmed in JavaScript, which should compile invisibly into Lua.

Tessel aims for full JavaScript compatibility, with the exception of `eval()`. If you run into compilation error, please file it.

##Node
Tessel is currently compatible with the most common and applicable Node libraries. Greater Node compatibility is an area of active development.

Supported (not exhaustive):
* all built-in node modules
* async
* colors
* underscore

Support under development:
* vm
* child_process
* readline
* repl
* tty
* debugger
* zlib

Not supported:
* cluster
* domains

##Coffeescript
Tessel supports Coffeescript.
