var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var port = process.env.PORT || 8000;
var dbUri = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/festivalfinder';

var app = express();

var festivalRouter = require('./routers/festivalRouter');

mongoose.connect(dbUri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../')));

// TODO: Use the characterRouter as middleware on the '/api/characters' route
app.use('/api/festivals', festivalRouter);

app.listen(port, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('HR Festival Finder API listening on ' + port);
});  

module.exports = app;

// Starting server steps
// 1. open terminal window for mongoose, go to main directory, run "mongod"
// 2. in server folder, run "node server.js"