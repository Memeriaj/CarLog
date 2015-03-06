var express = require('express');
var app = module.exports = express(); 

/* Setup HTML Rendering */
app.engine('.html', require('ejs').__express);
app.set('views', 'build'); // overwrite where to find 'views'
app.set('view engine', 'html');

// Wildcard catches any path since this is a 
// single-page app and loads homepage anyways
app.get('*', function(req, res) {
  res.render('main');
});
