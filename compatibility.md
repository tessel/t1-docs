#Tessel is programmed in JavaScript.
* [JavaScript](#javascript)
* [Node](#node)
* [CoffeeScript](#coffeescript)

##JavaScript

Tessel is programmed in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), which automatically compiles to Lua when you run code on Tessel.

Tessel aims for full JavaScript compatibility, with the exception of `eval()`. If you run into compilation error, please file an issue on our GitHub repo.

Documentation for the JavaScript programming language can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).

##Node
Tessel is currently compatible with the most common and applicable core [Node](http://nodejs.org/about/) libraries. Most non-core libraries should also work however we don't yet support libraries with binary dependencies. If your module is not working, please [file an issue](https://github.com/tessel/runtime/issues)! Greater Node compatibility is an area of active development. 

You can see progress on Node compatibility on [our public Runtime Trello board](https://trello.com/b/p8Berhi1/runtime).

Node library support is prioritized by which libraries are most relevant to Tessel usage. The target Node version is latest Node master.

Documentation for Node can be found [here](http://nodejs.org/api/).

### Supported and Under Development:
* [buffer](http://nodejs.org/api/buffer.html)
* [console](http://nodejs.org/api/console.html)
  - [console.dir](http://nodejs.org/api/console.html#console_console_dir_obj) not implemented yet
  - [console.time](http://nodejs.org/api/console.html#console_console_time_label) not implemented yet
  - [console.timeEnd](http://nodejs.org/api/console.html#console_console_timeend_label) not implemented yet
  - [console.trace](http://nodejs.org/api/console.html#console_console_trace_label) not implemented yet
  - [console.assert](http://nodejs.org/api/console.html#console_console_assert_expression_message) not implemented yet
* [crypto](http://nodejs.org/api/crypto.html)
  - Most of the Node library is not yet supported. The methods that ARE implemented are:
   * [randomBytes](http://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback)
   * [pseudoRandomBytes](http://nodejs.org/api/crypto.html#crypto_crypto_pseudorandombytes_size_callback)
   * [createHmac](http://nodejs.org/api/crypto.html#crypto_crypto_createhmac_algorithm_key)
* [dgram](http://nodejs.org/api/dgram.html)
 - [Event:'listening'](http://nodejs.org/api/dgram.html#dgram_event_listening) not implemented yet
 - [Event:'close'](http://nodejs.org/api/dgram.html#dgram_event_close) not implemented yet
 - [Event:'error'](http://nodejs.org/api/dgram.html#dgram_event_error) not implemented yet
 - [socket.address](http://nodejs.org/api/dgram.html#dgram_socket_address) not implemented yet
 - [socket.setBroadcast](http://nodejs.org/api/dgram.html#dgram_socket_setbroadcast_flag) not implemented yet
 - [socket.setTTL](http://nodejs.org/api/dgram.html#dgram_socket_setttl_ttl) not implemented yet
 - [socket.setMulticastTTL](http://nodejs.org/api/dgram.html#dgram_socket_setmulticastttl_ttl) not implemented yet
 - [socket.setMulticastLoopback](http://nodejs.org/api/dgram.html#dgram_socket_setmulticastloopback_flag) not implemented yet
 - [socket.addMembership](http://nodejs.org/api/dgram.html#dgram_socket_addmembership_multicastaddress_multicastinterface) not implemented yet
 - [socket.dropMembership](http://nodejs.org/api/dgram.html#dgram_socket_dropmembership_multicastaddress_multicastinterface) not implemented yet
 - [socket.unref](http://nodejs.org/api/dgram.html#dgram_socket_unref) not implemented yet
 - [socket.ref](http://nodejs.org/api/dgram.html#dgram_socket_unref) not implemented yet
* [dns](http://nodejs.org/api/dns.html)
 - Most of the Node library is not yet supported. The method that IS implemented is:
  [resolve](http://nodejs.org/api/dns.html#dns_dns_resolve_domain_rrtype_callback)
* [events](http://nodejs.org/api/events.html)
* [fs](http://nodejs.org/api/fs.html) — builtin
 - Async and sync versions of file/directory permissions/owner related functions are not yet implemented (chown, fchown, lchown, chmod, fchmod, lchmod)
 - Symlink related functions are not yet implemented (link, symlink, readlink, unlink)
 - File/Directory watching related methods not supported (watchFile, unwatchFile, watch)
 - Timestamp related functions not supported (utimes, futimes)
* [fs](http://nodejs.org/api/fs.html) — sdcard's [fatfs](https://github.com/natevw/fatfs) instances
  - Note that *instances* of this "module" come from sdcard getFilesystems option (or method call)
  - fs.*Sync methods not implemented
  - [fs.rename](http://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback) not implemented yet
  - [fs.unlink](http://nodejs.org/api/fs.html#fs_fs_unlink_path_callback) not implemented yet
  - [fs.rmdir](http://nodejs.org/api/fs.html#fs_fs_rmdir_path_callback) not implemented yet
  - [fs.watchFile](http://nodejs.org/api/fs.html#fs_fs_watchfile_filename_options_listener) not implemented yet
  - [fs.unwatchFile](http://nodejs.org/api/fs.html#fs_fs_unwatchfile_filename_listener) not implemented yet
  - [fs.watch](http://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener) not implemented yet
* [Globals](http://nodejs.org/api/globals.html)
* [http](http://nodejs.org/api/http.html) / [https](http://nodejs.org/api/https.html)
 - [response.setTimeout](http://nodejs.org/api/http.html#http_response_settimeout_msecs_callback) not implemented yet
 - [sever.setTimeout](http://nodejs.org/api/http.html#http_server_settimeout_msecs_callback) not implemented yet
 - [server.timeout](http://nodejs.org/api/http.html#http_server_timeout) not implemented yet
 - [request.setTimeout](http://nodejs.org/api/http.html#http_request_settimeout_timeout_callback) not implemented yet
 - [request.setNoDelay](http://nodejs.org/api/http.html#http_request_setnodelay_nodelay) not implemented yet
 - [request.setSocketKeepAlive](http://nodejs.org/api/http.html#http_request_setsocketkeepalive_enable_initialdelay) not implemented yet
* [modules](http://nodejs.org/api/modules.html)
* [net](http://nodejs.org/api/net.html)
 - Some socket options may not be possible to configure (at least on a per-connection basis) with the CC3000 drivers:
 - [socket.setNoDelay](http://nodejs.org/api/net.html#net_socket_setnodelay_nodelay) not implemented, [#342](https://github.com/tessel/runtime/issues/342)
 - [socket.setKeepAlive](http://nodejs.org/api/net.html#net_socket_setkeepalive_enable_initialdelay) not implemented, [#342](https://github.com/tessel/runtime/issues/342)
 - ['allowHalfOpen' socket/server option](http://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener) not implemented yet, [#409](https://github.com/tessel/runtime/issues/409)
 - ['fd' socket option](http://nodejs.org/api/net.html#net_new_net_socket_options) not implemented
 - These are dependent on currently missing runtime support, [#266](https://github.com/tessel/runtime/issues/266):
 - [server.unref](http://nodejs.org/api/net.html#net_server_unref) not implemented yet
 - [server.ref](http://nodejs.org/api/net.html#net_server_ref) not implemented yet
 - [socket.unref](http://nodejs.org/api/net.html#net_socket_unref) not implemented yet
 - [socket.ref](http://nodejs.org/api/net.html#net_socket_ref) not implemented yet
 - These would be welcome contributions if they are needed by anyone:
 - [server.maxConnections](http://nodejs.org/api/net.html#net_server_maxconnections) not implemented yet, [#341](https://github.com/tessel/runtime/issues/341)
 - [server.getConnections](http://nodejs.org/api/net.html#net_server_getconnections_callback) not implemented yet, [#341](https://github.com/tessel/runtime/issues/341)
 - [socket.bufferSize](http://nodejs.org/api/net.html#net_socket_buffersize) not implemented yet, [#339](https://github.com/tessel/runtime/issues/339)
 - [socket.bytesRead](http://nodejs.org/api/net.html#net_socket_localport) not implemented yet, [#339](https://github.com/tessel/runtime/issues/339)
 - [socket.bytesWritten](http://nodejs.org/api/net.html#net_socket_byteswritten) not implemented yet, [#339](https://github.com/tessel/runtime/issues/339)
* [os](http://nodejs.org/api/os.html)
* [path](http://nodejs.org/api/path.html)
* [process](http://nodejs.org/api/process.html)
 - Most of the process library is not yet supported. The methods that ARE implemented are:
   * [stdin](http://nodejs.org/api/process.html#process_process_stdin)
   * [argv](http://nodejs.org/api/process.html#process_process_argv)
   * [exit](http://nodejs.org/api/process.html#process_process_exit_code)
   * [memoryUsage](http://nodejs.org/api/process.html#process_process_memoryusage)
   * [nextTick](http://nodejs.org/api/process.html#process_process_nexttick_callback)
* [punycode](http://nodejs.org/api/punycode.html)
* [querystring](http://nodejs.org/api/querystring.html)
* [smalloc](http://nodejs.org/api/smalloc.html)
* [stream](http://nodejs.org/api/stream.html)
* [sys](http://nodejs.org/api/sys.html)
* [timers](http://nodejs.org/api/timers.html)
* [tracing](http://nodejs.org/api/tracing.html)
* [url](http://nodejs.org/api/url.html)
* [util](http://nodejs.org/api/util.html)
 - [format](http://nodejs.org/api/util.html#util_util_format_format) not implemented yet
 - [debug](http://nodejs.org/api/util.html#util_util_debug_string) not implemented yet
 - [error](http://nodejs.org/api/util.html#util_util_error) not implemented yet
 - [puts](http://nodejs.org/api/util.html#util_util_puts) not implemented yet
 - [print](http://nodejs.org/api/util.html#util_util_print) not implemented yet
 - [log](http://nodejs.org/api/util.html#util_util_log_string) not implemented yet
 - [inspect](http://nodejs.org/api/util.html#util_util_inspect_object_options) not implemented yet
 - [isError](http://nodejs.org/api/util.html#util_util_iserror_object) not implemented yet
 

###Plan to support in the future:
* [assert](http://nodejs.org/api/assert.html)
* [Binary Dependencies](http://nodejs.org/api/addons.html)
* [vm](http://nodejs.org/api/vm.html)
* [child_process](http://nodejs.org/api/child_process.html)
* [readline](http://nodejs.org/api/readline.html)
* [repl](http://nodejs.org/api/repl.html)
* [string_decoder](http://nodejs.org/api/string_decoder.html)
* [tls](http://nodejs.org/api/tls.html)
* [tty](http://nodejs.org/api/tty.html)
* [debugger](http://nodejs.org/api/debugger.html)
* [zlib](http://nodejs.org/api/zlib.html)

###No plans to support:
* [cluster](https://www.npmjs.org/package/cluster)
* [domain](http://nodejs.org/api/domain.html)

##CoffeeScript
Tessel plans to eventually support [CoffeeScript](http://coffeescript.org/).

(Tessel can currently run pre-compiled CoffeeScript into [JavaScript](#javascript).) 
