# Expose a C function up to JS userspace

This tutorial goes over how to expose a C function to JS where the user can interact with it via any JS function.

The function will pass this simple test case:

```js
var tessel = require('tessel');
console.log("Can Tessel add?", 3 == tessel.add(1, 2));
```

1. Clone down the [tessel/t1-firmware](https://github.com/tessel/t1-firmware) repo.
2. Set up the firmware according to the [tessel/t1-firmware readme](https://github.com/tessel/t1-firmware/blob/master/README.md). 
3. Open up `src/tessel.c`. Add these lines

	```c
	uint32_t tessel_add(uint32_t x, uint32_t y)
	{
		return x + y;
	}
	```
5. Add this function to the header file. Open up `src/tessel.h` and add

	```c
	uint32_t tessel_add(uint32_t x, uint32_t y);
	```
6. Add the Lua binding. Open up `src/hw/l_hw.c` and add

	```c
	static int l_hw_add(lua_State* L)
	{
		uint32_t x = (uint32_t)lua_tonumber(L, ARG1);
		uint32_t y = (uint32_t)lua_tonumber(L, ARG1+1);
		lua_pushnumber(L, tessel_add(x, y));
		return 1; // return 0 if the c function doesn't return a value
	}
	```
7. Scroll down to the bottom of `src/hw/l_hw.c` where we're defining all the JS function names in `luaL_reg regs[]` and add in the following entry:
	```c
	{"add", l_hw_add}
	```

	So it should look something like:
	```c
	luaL_reg regs[] = {
		{"add", l_hw_add},
		// spi
		{ "spi_initialize", l_hw_spi_initialize },
		{ "spi_enable", l_hw_spi_enable },
		...
	```

8. Add the JS bindings. Open up `builtin/tessel.js` and find this function:
	```js
	this.deviceId = function(){
  		return hw.device_id();
	};
	```

	Add the following right below it
	```js
	this.add = function(x, y){ // the "this" object is referring to the "tessel" object
  		return hw.add(x, y); // the "add" function here corresponds with the string in the lua binding. That's how we get from C -> Lua -> JS
	}
	```

9. Go back to the main directory of the `firmware` repo and do a `make arm`. You should see an output like this

	```
	[183/183] STAMP obj/tessel-firmware.actions_depends.stamp
	arm-none-eabi-size out/Release/tessel-firmware.elf out/Release/tessel-boot.elf out/Release/tessel-otp.elf
   	text	   data	    bss	    dec	    hex	filename
 	824912	   3576	  24660	 853148	  d049c	out/Release/tessel-firmware.elf
  	30848	   2260	   3232	  36340	   8df4	out/Release/tessel-boot.elf
   	6100	  34272	     36	  40408	   9dd8	out/Release/tessel-otp.elf
	```

	This outputs the [elf file](http://en.wikipedia.org/wiki/Executable_and_Linkable_Format) for hardware debugging.

10. Now go to `out/Release/` and do an `ls`. You should see the following

	```
	build.ninja              tessel-cc3k-patch.bin    tessel-firmware.bin.cpgz
	gen                      tessel-cc3k-patch.elf    tessel-firmware.elf
	obj                      tessel-erase.bin         tessel-firmware.hex
	tessel-boot.bin          tessel-erase.elf         tessel-otp.bin
	tessel-boot.elf          tessel-firmware.bin      tessel-otp.elf
	```

	Here's what each of those do:
	* `tessel-boot`: bootloader for Tessel. Also writes the Tessel version number (04) in [otp](http://en.wikipedia.org/wiki/One-time_programmable).
	* `tessel-cc3k-patch`: updates the firmware for the [CC3000 wifi chip](http://processors.wiki.ti.com/index.php/CC3000) on Tessel. Current version is 1.28.
	* `tessel-erase`: erases all JS user code on Tessel.
	* `tessel-firmware`: the firmware for Tessel. This was just changed this to add the '.add' function.

11. Overwrite the Tessel firmware with the new firmware you just built. In the `Release` directory:

	`tessel update ./tessel-firmware.bin`
	Don't forget that `./` before tessel-firmware. It specifies a local path. Otherwise `tessel update` will look for firmware patches on our build server.

12. Now run the test code you have for this function and it should pass.

If you want to revert back to the original Tessel firmware, just run a `tessel update --force` which will force Tessel to update to the newest release version.
