var fs = require('fs');

var data = fs.readFileSync('./api.txt', 'utf-8');
var readme = fs.readFileSync('./README.md', 'utf-8');

function safeify (str) {
  return str.replace(/[^\w]+/g, '-');
}

var lines = data.split(/\n+/).filter(function (n) { return !n.match(/^\s*$/); });

var out = [];

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  if (line.match(/^#/)) {
    out.push('##' + line + '\n' + lines[++i] + '\n');
  } else {
    out.push('&#x20;<a href="#api-' + safeify(line) + '" name="api-' + safeify(line) + '">#</a> ' + line.replace(/^(array([<>\w]*)|number|string)/, function (str) {
      return '<i>' + str.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</i>&nbsp;'
    }).replace(/\.(\w+)/, '.<b>$1</b>') + '  ');
    out.push(lines[++i] + '\n');
  }
}

var readme = readme.replace(/## API(.|[\r\n])+\n## /, '## API\n\n' + out.join('\n') + '\n\n## ');
fs.writeFileSync('./README.md', readme);