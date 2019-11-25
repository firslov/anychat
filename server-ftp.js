var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

// Serve up public folder
var serve = serveStatic('static/public', {
	'index': false
})

// Create server
var server = http.createServer(function onRequest(req, res) {
	serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(4000)