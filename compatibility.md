#Tessel is programmed in JavaScript.
[JavaScript](https://github.com/tessel/docs/blob/master/compatibility.md#tessel-is-programmed-in-javascript) | [Node](https://github.com/tessel/docs/blob/master/compatibility.md#node) | [Coffeescript](https://github.com/tessel/docs/blob/master/compatibility.md#coffeescript)

Tessel is programmed in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), which automatically compiles to Lua when you run code on Tessel.

Tessel aims for full JavaScript compatibility, with the exception of `eval()`. If you run into compilation error, please file an issue on our Github repo.

Documentation for the JavaScript programming language can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).

##Node
Tessel is currently compatible with the most common and applicable [Node](http://nodejs.org/about/) libraries. Greater Node compatibility is an area of active development.

Documentation for Node can be found [here](http://nodejs.org/api/).

###Supported (not exhaustive):
* [assert](http://nodejs.org/api/assert.html)
* [buffer](http://nodejs.org/api/buffer.html)
* [console](http://nodejs.org/api/console.html)
* [constants](http://nodejs.org/api/constants.html)
* [crypto](http://nodejs.org/api/crypto.html)
* [dgram](http://nodejs.org/api/dgram.html)
* [dns](http://nodejs.org/api/dns.html)
* [events](http://nodejs.org/api/events.html)
* [freelist](http://nodejs.org/api/freelist.html)
* [fs](http://nodejs.org/api/fs.html)
* [http](http://nodejs.org/api/http.html)
* [https](http://nodejs.org/api/https.html)
* [module](http://nodejs.org/api/module.html)
* [net](http://nodejs.org/api/net.html)
* [os](http://nodejs.org/api/os.html)
* [path](http://nodejs.org/api/path.html)
* [punycode](http://nodejs.org/api/punycode.html)
* [querystring](http://nodejs.org/api/querystring.html)
* [smalloc](http://nodejs.org/api/smalloc.html)
* [stream](http://nodejs.org/api/stream.html)
* [string_decoder](http://nodejs.org/api/string_decoder.html)
* [sys](http://nodejs.org/api/sys.html)
* [timers](http://nodejs.org/api/timers.html)
* [tls](http://nodejs.org/api/tls.html)
* [tracing](http://nodejs.org/api/tracing.html)
* [url](http://nodejs.org/api/url.html)
* [util](http://nodejs.org/api/util.html)
* [async](https://www.npmjs.org/package/async)
* [colors](https://www.npmjs.org/package/colors)
* [underscore](https://www.npmjs.org/package/underscore)

###Support under development:
* [vm](http://nodejs.org/api/vm.html)
* [child_process](http://nodejs.org/api/child_process.html)
* [readline](http://nodejs.org/api/readline.html)
* [repl](http://nodejs.org/api/repl.html)
* [tty](http://nodejs.org/api/tty.html)
* [debugger](http://nodejs.org/api/debugger.html)
* [zlib](http://nodejs.org/api/zlib.html)

###No plans to support:
* [cluster](https://www.npmjs.org/package/cluster)
* [domain](http://nodejs.org/api/domain.html)

##Coffeescript
Tessel supports Coffeescript.
