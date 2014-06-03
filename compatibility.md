#Tessel is programmed in JavaScript.
* [JavaScript](#javascript)
* [Node](#node)
* [CoffeeScript](#coffeescript)

##JavaScript

Tessel is programmed in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), which automatically compiles to Lua when you run code on Tessel.

Tessel aims for full JavaScript compatibility, with the exception of `eval()`. If you run into compilation error, please file an issue on our Github repo.

Documentation for the JavaScript programming language can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).

##Node
Tessel is currently compatible with the most common and applicable core [Node](http://nodejs.org/about/) libraries. Most non-core libraries should also work however we don't yet support libraries with binary dependencies. If your module is not working, please email us! Greater Node compatibility is an area of active development. 

Node library support is proioritized by which libraries are most relevant to Tessel usage. 

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
* [fs](http://nodejs.org/api/fs.html)
 - Async and sync versions of file/directory permissions/owner related functions are not yet implemented (chown, fchown, lchown, chmod, fchmod, lchmod)
 - Symlink related functions are not yet implemented (link, symlink, readlink, unlink)
 - File/Directory watching related methods not supported (watchFile, unwatchFile, watch)
 - Timestamp related functions not supported (utimes, futimes)
* [Globals](http://nodejs.org/api/globals.html)
* [http](http://nodejs.org/api/http.html)
 - [response.writeContinue](http://nodejs.org/api/http.html#http_response_writecontinue) not implemented yet
 - [response.setTimeout](http://nodejs.org/api/http.html#http_response_settimeout_msecs_callback) not implemented yet
 - [response.headersSent](http://nodejs.org/api/http.html#http_response_headerssent) not implemented yet
 - [response.sendDate](http://nodejs.org/api/http.html#http_response_senddate) not implemented yet
 - [response.addTrailers](http://nodejs.org/api/http.html#http_response_addtrailers_headers) not implemented yet
 - [http.agent](http://nodejs.org/api/http.html#http_class_http_agent) not implemented yet
 - [Global Agent](http://nodejs.org/api/http.html#http_http_globalagent) not implemented yet.
 - [server.maxHeadersCount](http://nodejs.org/api/http.html#http_server_maxheaderscount) not implemented yet
 - [sever.setTimeout](http://nodejs.org/api/http.html#http_server_settimeout_msecs_callback) not implemented yet
 - [server.timeout](http://nodejs.org/api/http.html#http_server_timeout) not implemented yet
 - [Event:'upgrade'](http://nodejs.org/api/http.html#http_event_upgrade_1) not implemented yet
 - [Event:'continue'](http://nodejs.org/api/http.html#http_event_continue) not implemented yet
  - [request.abort](http://nodejs.org/api/http.html#http_request_abort) not implemented yet
 - [request.setTimeout](http://nodejs.org/api/http.html#http_request_settimeout_timeout_callback) not implemented yet
 - [request.setNoDelay](http://nodejs.org/api/http.html#http_request_setnodelay_nodelay) not implemented yet
 - [request.setSocketKeepAlive](http://nodejs.org/api/http.html#http_request_setsocketkeepalive_enable_initialdelay) not implemented yet
* [https](http://nodejs.org/api/https.html)
 - [http.agent](http://nodejs.org/api/https.html#https_class_https_agent) not implemented yet
 - [Global Agent](http://nodejs.org/api/https.html#https_https_globalagent) not implemented yet.
* [modules](http://nodejs.org/api/modules.html)
* [net](http://nodejs.org/api/net.html)
 - [net.createConnections](http://nodejs.org/api/net.html#net_net_createconnection_options_connectionlistener) not implemented yet
 - [net.createConnection](http://nodejs.org/api/net.html#net_net_createconnection_port_host_connectlistener) not implemented yet
 - [server.address](http://nodejs.org/api/net.html#net_server_address) not implemented yet
 - [server.unref](http://nodejs.org/api/net.html#net_server_unref) not implemented yet
 - [server.ref](http://nodejs.org/api/net.html#net_server_ref) not implemented yet
 - [server.maxConnections](http://nodejs.org/api/net.html#net_server_maxconnections) not implemented yet
 - [server.getConnections](http://nodejs.org/api/net.html#net_server_getconnections_callback) not implemented yet
 - [socket.bufferSize](http://nodejs.org/api/net.html#net_socket_buffersize) not implemented yet
 - [socket.setEncoding](http://nodejs.org/api/net.html#net_socket_setencoding_encoding) not implemented yet
 - [socket.pause](http://nodejs.org/api/net.html#net_socket_pause) not implemented yet
 - [socket.resume](http://nodejs.org/api/net.html#net_socket_resume) not implemented yet
 - [socket.setTimeout](http://nodejs.org/api/net.html#net_socket_settimeout_timeout_callback) not implemented yet
 - [socket.setNoDelay](http://nodejs.org/api/net.html#net_socket_setnodelay_nodelay) not implemented yet
 - [socket.setKeepAlive](http://nodejs.org/api/net.html#net_socket_setkeepalive_enable_initialdelay) not implemented yet
 - [socket.address](http://nodejs.org/api/net.html#net_socket_address) not implemented yet
 - [socket.unref](http://nodejs.org/api/net.html#net_socket_unref) not implemented yet
 - [socket.ref](http://nodejs.org/api/net.html#net_socket_ref) not implemented yet
 - [socket.remoteAddress](http://nodejs.org/api/net.html#net_socket_remoteaddress) not implemented yet
 - [socket.remotePort](http://nodejs.org/api/net.html#net_socket_remoteport) not implemented yet
 - [socket.localAddress](http://nodejs.org/api/net.html#net_socket_localaddress) not implemented yet
 - [socket.localPort](http://nodejs.org/api/net.html#net_socket_localport) not implemented yet
 - [socket.bytesRead](http://nodejs.org/api/net.html#net_socket_localport) not implemented yet
 - [socket.bytesWritten](http://nodejs.org/api/net.html#net_socket_byteswritten) not implemented yet
 - [Event:'timeout'](http://nodejs.org/api/net.html#net_event_timeout) not implemented yet
 - [Event:'drain'](http://nodejs.org/api/net.html#net_event_drain) not implemented yet
 - [Net.isIP](http://nodejs.org/api/net.html#net_net_isip_input) not implemented yet
 - [Net.isIPV4](http://nodejs.org/api/net.html#net_net_isip_input) not implemented yet
 - [Net.isIPV6](http://nodejs.org/api/net.html#net_net_isip_input) not implemented yet
 
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
 - [url.format](http://nodejs.org/api/url.html#url_url_format_urlobj) not yet implemented
  - [url.resolve](http://nodejs.org/api/url.html#url_url_resolve_from_to) not yet implemented
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
Tessel supports [CoffeeScript](http://coffeescript.org/).

(Tessel pre-compiles CoffeeScript into [JavaScript](#javascript).) 
