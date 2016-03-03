var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var request = require('request');

var app = express();

app.use(bodyParser());
app.use(express.static(process.cwd() + '/public'));

//Root
app.get('/', function (req, res) {
    var html = jade.renderFile('views/index.jade');
    res.send(html);
});

var port = '12345';
app.listen(port);
console.log('Magic happens on port '+port);
console.log('MongoDB REST Web Server on port 3000?');
console.log('Mongo-express GUI Web Server on port 8081?');
exports = module.exports = app;