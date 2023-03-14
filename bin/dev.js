const fs = require('fs');
const browserify = require('browserify');
const watchify = require('watchify');
const http = require('http-server');

var b = watchify(
  browserify({
      entries: 'lib/index.js',
      standalone: 'mammoth',
      cache: {},
      packageCache: {}
  })
);

b.on('update', bundle);
b.on('log', (msg) =>
  console.log(
    `${new Date().toISOString()} ${msg}
app run at http://localhost:8086/browser-demo/

`
  )
);

function bundle() {
    b.bundle().on('error', console.error).pipe(fs.createWriteStream('mammoth.browser.js'));
}

function server() {
    http.createServer().listen(8086);
}

server();
bundle();
