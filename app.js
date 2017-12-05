
var express = require('express');
var app = express();

global.path = require('path');

var counter = 0;

function sse(req, res, next) {
  res.sseSetup = function() {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
  }

  res.sseSend = function(data) {
    res.write("data: " + data + "\n\n");
  }

  next();
}

var connections = [];

app.use(sse);


app.use('/', express.static(path.join(__dirname, 'public')), function(req, res, next) {
    next();
  });


app.get('/ssetest', function(req, res) {
  counter++;
  for (var i = 0; i < connections.length; i++) {
    connections[i].sseSend('hello world ' + counter + 'num connections: ' + connections.length);
  }
  res.sendStatus(200);
});  

app.get('/stream', function(req, res) {
  counter++;
  res.sseSetup();
  res.sseSend('hello world ' + counter);
  req.socket.on('close', function() {
    console.log('connection closed');
    console.log('index: ' + connections.indexOf(res));
    var currIndex = connections.indexOf(res);
    connections.splice(currIndex, 1);
  });
  connections.push(res);
});



var port = process.env.PORT || 1234;

app.listen(port);

console.log("server is up and running");



