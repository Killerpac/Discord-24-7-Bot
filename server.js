var http = require('http');
var port = process.env.PORT || 8080;
//create a server object:
require('./nino')
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(port); //the server object listens on port 8080