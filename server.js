var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);



   var filename = "." + parsedUrl.pathname + ".json";
   fs.readFile(filename, 'utf8', function(err, data) {



  if (err) {
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end("Bad gateway error");
    } 

    response.writeHead(200, {'Content-Type': 'text/html'});
    listingData = JSON.parse(data);
    response.write(JSON.stringify(listingData));
    return response.end();



});

};

server = http.createServer(requestHandler);

server.listen(port, function() {
  //once the server is listening, this callback function is executed
  console.log('Server listening on: http://127.0.0.1:' + port);
});

