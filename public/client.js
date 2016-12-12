// console.log("In JS");

//GLOBAL VARIABLES//
var numArray = [];
var currentOperator;

//BEGIN DOCUMENT READY//
$(document).ready (function(){
// console.log("in JQ");

enableButtons ();

});
//END DOC READY//

//FUNCTIONS//

function enableButtons (){
  $(document).on('click', '.number-button', numButtonClick);
  $(document).on('click', '.operator-button', operatorButtonClick);
  $(document).on('click', '.equal-button', postDataOnEqual);
  $(document).on('click', '#clearButton', clearAll);

};//end enable buttons

function numButtonClick (){
    var clickedButton = $(this).data().value;
    var prevValue = '';
    prevValue = $('.output-box').val();
    $('.output-box').val(prevValue + clickedButton);
};//end num button click

function operatorButtonClick (){
  var currentValue = $('.output-box').val();
  numArray.push(currentValue)
  // console.log("current value is:",currentValue);
  var clickedButton = $(this).data().value
  $('.output-box').val(clickedButton);
  currentOperator = $('.output-box').val();
  $('.output-box').val("");
  // console.log(currentOperator);
};//end operator Button Click

function postDataOnEqual () {

  if (numArray[numArray.length - 2] == null && numArray[numArray.length - 1] == null){
    return
  } else {
    var currentValue = $('.output-box').val();
    numArray.push(currentValue)

  var objectToSend = {
    number1: numArray[numArray.length - 2],
    number2: numArray[numArray.length - 1],
    operator: currentOperator
  }; //end object to send

  $.ajax({
    type: 'POST',
    url: '/sendObject',
    data: objectToSend,
    success: function(response){
      // console.log('back from post call:', response);
    },
    error: function (){
      // console.log('error with ajax call...');
    }
  });//end ajax call

  numArray = [];
  currentOperator = '';
  $('.output-box').val('');

  getData();
}//end else stmt

};//end post data

function getData (){
  // console.log("in get");
  $.ajax({
    type: "GET",
    url: "/sendAnswer",
    success: function(response){
      // console.log('back from post call:', response);
      // console.log(response.answer);
      $('.output-box').val(response.answer);
      },
      error: function (){
        console.log('error with ajax call...');
      }
    });//end ajax call
};//get data

function clearAll () {
  $('.output-box').val('');
  numArray = [];
  currentOperator = '';
};//clear all
