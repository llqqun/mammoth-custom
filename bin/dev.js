var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var { createServer } = require('http-server')

var b = watchify(browserify({
  entries: 'lib/index.js',
  standalone: 'mammoth',
  cache: {},
  packageCache: {}
}))

b.on('update', bundle);
b.on('log', (msg) => console.log(
`${new Date().toISOString()} ${msg}
app run at http://localhost:8080/browser-demo/

`))

function bundle () {
  b.bundle()
    .on('error', console.error)
    .pipe(fs.createWriteStream('mammoth.browser.js'))
}

function server () {
  createServer().listen(8080)
}


server()
bundle();