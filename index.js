#!/usr/bin/env node

process.stdout.write('>.> wait for it... ');

setInterval(function () {
  process.stdout.write('\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b<.< wait for it... ')
}, 1000);

setTimeout(function () {
  setInterval(function () {
    process.stdout.write('\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b>.> wait for it... ')
  }, 1000);
}, 500);