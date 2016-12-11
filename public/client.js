console.log("In JS");
var numArray = [];
var currentOperator;
//BEGIN DOCUMENT READY//
$(document).ready (function(){
console.log("in JQ");

enableButtons ();

});
//END DOC READY//

function enableButtons (){
  $(document).on('click', '.number-button', numButtonClick);
  $(document).on('click', '.operator-button', operatorButtonClick);
  $(document).on('click', '.equal-button', postDataOnEqual);

};//clicked buttons

function numButtonClick (){
  var clickedButton = $(this).data().value
  console.log(clickedButton);
  var prevValue = '';
  prevValue = $('.output-box').val();
  $('.output-box').val(prevValue + clickedButton);
};//end num button click

function operatorButtonClick (){
  var currentValue = $('.output-box').val();
  numArray.push(currentValue)
  console.log("current value is:",currentValue);
  var clickedButton = $(this).data().value
  $('.output-box').val(clickedButton);
  currentOperator = $('.output-box').val();
  $('.output-box').val("");
  console.log(currentOperator);
};//end operator Button Click


function postDataOnEqual () {

  var objectToSend = {
    numbers: numArray,
    operator: currentOperator
  }; //end object to send

  $.ajax({
    type: 'POST',
    url: '/sendObject',
    data: objectToSend,
    success: function(response){
      console.log('back from post call:', response);
    },
    error: function (){
      console.log('error with ajax call...');
    }
  });//end ajax call


};//end post data
