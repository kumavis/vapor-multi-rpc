var express = require('express')

module.exports = function(){

  var app = express()

  app.set('port', (3000))
  app.use(express.static(__dirname + '/public'))

  app.get('/*', function(request, response) {
    response.send('originalUrl: '+request.originalUrl)
  })

  // app.get('/web', function(request, response) {
  //   response.send('Path not being trimmed...')
  // })

  app.listen(app.get('port'), function() {
    console.log("Web server is running at localhost:" + app.get('port'))
  })

}