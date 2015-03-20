var express = require('express')
var bodyParser = require('body-parser')
var treeify = require('treeify').asTree

module.exports = function(){

  var app = express()

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded())

  app.set('port', 3000)
  app.use(express.static(__dirname + '/public'))

  app.post('/submit', function(request, response) {
    console.log(treeify(request.body, true))
    // response.send('request: '+Object.keys(request))
    response.redirect('/admin')
  })

  app.get('/*', function(request, response) {
    response.send('floor-oh-floor?: '+request.originalUrl)
  })

  app.listen(app.get('port'), function() {
    console.log("Web server is running at localhost:" + app.get('port'))
  })

}