// var http = require('http')
// var httpProxy = require('http-proxy')
// var cluster = require('cluster')
// var numCPUs = require('os').cpus().length
// var webServer = require('./web.js')

// if (cluster.isMaster) {

//   console.log('MASTER')

//   // Fork workers.
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork()
//   }

//   cluster.on('exit', function(worker, code, signal) {
//     console.log('worker ' + worker.process.pid + ' died')
//     cluster.fork()
//   })

// } else {

//   webServer()

//   console.log('CHILD')
//   var proxy = httpProxy.createProxyServer({})

//   http.createServer(function(req, res) {
//     // req.headers.host = 'api-target.herokuapp.com'
//     proxy.web(req, res, { target: 'localhost:8080' })
//   }).listen(process.env.PORT || 5000)

// }