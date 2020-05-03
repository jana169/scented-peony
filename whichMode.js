// These are variables used to identify which travel mode is chosen by user
//
// .className returns "section-directions-trip-travel-mode-icon drive"
var isCar = document.querySelector("#section-directions-trip-0 > div.section-directions-trip-travel-mode-icon.drive");
//  .className returns "section-directions-trip-travel-mode-icon transit"
var isBus = document.querySelector("#section-directions-trip-0 > div.section-directions-trip-travel-mode-icon.transit");
//  .className returns "section-directions-trip-travel-mode-icon walk"
var isWalk = document.querySelector("#section-directions-trip-0 > div.section-directions-trip-travel-mode-icon.walk");
//  .className returns "section-directions-trip-travel-mode-icon bike"
var isCycle = document.querySelector("#section-directions-trip-0 > div.section-directions-trip-travel-mode-icon.bike");
var isFlight = document.querySelectorAll(".gws-flights-results__duration")
console.log(isFlight);

//heyJanani -> naming convention 

var mode = {
  'text': 'none',
  'footprint': 0,
  'miles': 0,
  'hours' : 0
}

//the first four variables are page objects, so they literally tell us what the page has. objects in CS can have value but by default, they are NULL. null means they have no value and they are empty. but, after lines 1- 10, only one variable will not be null as the user has chosen that variable, so all we have to do is find the non-NULL variable, != means not equal 

if (isCar != null) {
  mode['text'] = 'car';
  var fullMiles = document.querySelector("#section-directions-trip-0 > div.section-directions-trip-description > div:nth-child(1) > div.section-directions-trip-numbers > div.section-directions-trip-distance.section-directions-trip-secondary-text > div").outerText

  var miles = fullMiles.split(" "); //if fullMiles is "25.8 km", var miles will be 25.8   
  var parsedMiles = miles[0].replace(/\,/g, "");
  mode['miles'] = parseFloat(parsedMiles)
}

if (isBus != null) {
  mode['text'] = 'bus';
}

if (isWalk != null) {
  mode['text'] = 'walk';
}

if (isCycle != null) {
  mode['text'] = 'cycle';
}

if (isFlight.length != 0) { //also how to know if user is on flight
  mode['text'] = 'flight';
  //1 hour of flight is 250 kg of CO2
  var flightDuration = parseFloat(0); 
  
  //isFlight is a list of all elements that have gws-flights-results__duration as their class 
  //so we can loop over the list 
  // list is [A,B,C,D]
  //length of list times
  // A
  // B
  // C 
  // D 
  //A+B+C+D 
  //++i or i++ => means increase value of i by 1 
    
  //list[i]
  //list[0] = A
  //list[1] = B
  //list[2] = C
  //list[3] = D
  
  //sumtotal += list[i]
  //sumtotal = ABCD
  //sumtotal = sumtotal + list[i]
  
  //global variables and local variables
  //mode is a global variable ~ a variable which you can use it in more than 1 file 
  //local variable 
  //global variable require lots of memory
  
  for (var i = 0; i < isFlight.length; ++i) {
    var hours = isFlight[i].outerText;
    flightDuration += parseFloat(hours.split(" ")[0]);
  }
  
  mode['hours'] = parseFloat(flightDuration); //how to calculate this 
}

mode // 'return' statement, will be read by hcrome.tabs.executeScript in popup.js
