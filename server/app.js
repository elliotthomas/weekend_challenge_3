var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded ({extended: false});
var port = process.env.PORT || 3000;

var answerArray = [];

app.listen (port, function (req,res){
  console.log( 'server is listening on', port);
});//end spin up server

//base url
app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/index.html'));
});//end base url

//send info back
app.get('/sendAnswer', function(req, res){
  console.log('base url hit');
  var objectToSend = {
    answer: answerArray[answerArray.length - 1]
  };
  res.send(objectToSend);
});//send info back

app.post('/sendObject', urlEncodedParser, function ( req, res){
  console.log('send guess url hit', req.body);
  var num1 = req.body.number1;
  var num2 = req.body.number2;
  var operator = req.body.operator;
  console.log(operator);
  console.log(num1);
  console.log(num2);

  if (operator == "+"){
    answer = parseInt(num1) + parseInt(num2)
  } else if (operator == "-"){
    answer = num1 - num2
  } else if (operator == "*"){
    answer = num1 * num2
  } else {
    answer = num1/num2
  } //end if else

  answerArray.push(answer)

});//end post

app.use(express.static(path.join(__dirname, '../public/')));
