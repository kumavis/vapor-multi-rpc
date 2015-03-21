var express = require('express')

module.exports = function(){

  var app = express()

  app.set('port', 3001)
  app.use(express.static(__dirname + '/vapor'))

  app.get('/*', function(request, response) {
    response.send('floor-oh-floor?: '+request.originalUrl)
  })

  app.listen(app.get('port'), function() {
    console.log("Vapor is running at localhost:" + app.get('port'))
  })

}