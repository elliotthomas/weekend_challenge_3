var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded ({extended: false});
var port = process.env.PORT || 8080;

app.listen (port, function (req,res){
  console.log( 'server is listening on', port);
});//end spin up server

//base url
app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/index.html'));
});//end base url

app.post('/sendObject', urlEncodedParser, function ( req, res){
  console.log('send guess url hit', req.body);
});//end post
