var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var routes = require('./routes/router');

var app = express();

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(routes);

// Use the environment variable if set, otherwise 8080
var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Started on port ' + port);
});