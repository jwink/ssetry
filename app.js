
var express = require('express');
var app = express();

global.path = require('path');


app.use('/', express.static(path.join(__dirname, 'public')), function(req, res, next) {
    next();
  });

var port = process.env.PORT || 1234;

app.listen(port);

console.log("server is up and running");



