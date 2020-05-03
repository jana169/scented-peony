// vue content security policy error: 
// https://stackoverflow.com/questions/34950009/chrome-extension-refused-to-load-the-script-because-it-violates-the-following-c

var app = new Vue({
  el: '#app',
  data() {
    return {
      message: 'Hello Verld!'
    }
  },
  methods: {
    onPressButton() {
      document.getElementById('toggleButton').hidden = true;
      document.getElementById('logoArrow').hidden = true;
      document.getElementById('textArrow').hidden = true;
      document.getElementById('footerStart').style.display = "none";

      document.getElementById('footerLoad').style.display = "block";
      document.getElementById('hourglass').style.display = "block";

      //Does the following mean that it's going to search the chrome tabs and if either flights or maps are active then it's going to do the function(tabs)? 
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          //what does the following mean? (until function (mode)).
            tabs[0].id, 
          {
            "file": "whichMode.js"
          }, 
          function (mode) {
            
            //mode is a data object, comes from Google Maps
            //mode is also array of arrays 
            //mode = [type, miles, time]
            //mode = [list1]
            //list1 = [type, miles, time] 
            
            //mode[0].miles = number of miles
            //mode[0].text = type of transport 
            //mode[0][0] = type of transport
            //mode[0][1] = number of miles 
            
            //there are also data types like strings and floats. mode[0].miles is a string which is the number of miles, and parseFloat converts strings to floats
            
            console.log(mode[0].text)
            //alert(mode)
            if (mode[0].text == 'car') {
              document.getElementById('footerLoad').style.display = "none";
              document.getElementById('hourglass').style.display = "none";
              document.getElementById('footerEnd').style.display = "block";
              document.getElementById('equivalentResult').style.display = "block";

              var parsedMiles = Math.round(parseFloat(mode[0].miles))
              console.log(parsedMiles)
              //so we need to figure out parsedMiles for Amazon
              document.getElementById('milesContainer').style.display = "block";
              document.getElementById('miles').textContent = parsedMiles + " kilometers";
              document.getElementById('mainLine').textContent = "Your Carbon Footprint is:";
              
              var footprint = 0.1095 * parsedMiles
              document.getElementById('carbonFootprint').textContent = footprint
              document.getElementById('cfUnit').textContent = "kg of CO2"

              document.getElementById('equivalent').textContent = "This is equivalent to:";

              // START homes energy calculation
              // Convert metric ton to how many days worth.
              // metric ton/sehari house energy = equivalent to berapa hari
              var fpInMetricTons = footprint/1000
              console.log(footprint)
              var days = fpInMetricTons/0.023
              console.log(days)

              // if less than a day
              if (days < 1) {
                var hours = days * 24
                if (hours < 1) {
                  var minutes = hours * 60
                  document.getElementById('homeEnergy').textContent = Math.round(minutes) + " minutes worth of a home's energy use";
                }
                else if (hours == 1) {
                  document.getElementById('homeEnergy').textContent = hours.toFixed(2) + " hour worth of a home's energy use";
                } else {
                  document.getElementById('homeEnergy').textContent = hours.toFixed(2) + " hours worth of a home's energy use";
                }
                
              }
              
              // if more than a day
              if (days >= 1) {
                // if less than a month
                if (days < 30) {
                  var roundedDays = Math.round(days);
                  document.getElementById('homeEnergy').textContent = roundedDays + " days worth of a home's energy use";
                }

                // if more than a month but less than a year
                if (days > 30 && days < 365) {
                  var months = days/30
                  document.getElementById('homeEnergy').textContent = months.toFixed(2) + " months worth of a home's energy use";
                }

                // if more than a year
                if (days >= 365) {
                  var years = days/365
                  document.getElementById('homeEnergy').textContent = years.toFixed(2) + " years worth of a home's energy use";
                }
              }
              // END homes energy calculation

              // START coals burned calculation
              var poundsBurned = fpInMetricTons/0.000915
              if (Math.round(poundsBurned) === 1) {
                document.getElementById('coalsBurned').textContent = Math.round(poundsBurned) + " pound of coal burned";
              }
              else {
                document.getElementById('coalsBurned').textContent = Math.round(poundsBurned) + " pounds of coal burned";
              }   
              // END coals burned calculation

              // START number of smartphones charged calculation
              var poundsBurned = 6
              document.getElementById('smartphones').textContent = "Plant " + Math.round(poundsBurned) + " trees per year to offset your carbon footprint";
              // END number of smartphones charged calculation
            }
            else if (mode[0].text == 'walk') {
              document.getElementById('footerLoad').style.display = "none";
              document.getElementById('hourglass').style.display = "none";
              document.getElementById('footerEnd').style.display = "block";
              document.getElementById('notDriving').style.display = "block";
              document.getElementById('notDriving').textContent = "You " + mode[0].text + ", so you don't have carbon emmissions. Thank you for making the world a better place. Congratulations!"
            }
            else if (mode[0].text == 'cycle') {
              document.getElementById('footerLoad').style.display = "none";
              document.getElementById('hourglass').style.display = "none";
              document.getElementById('footerEnd').style.display = "block";
              document.getElementById('notDriving').style.display = "block";
              document.getElementById('notDriving').textContent = "You " + mode[0].text + ", so you don't have carbon emmissions. Thank you for making the world a better place. Congratulations!"
            }
            else if (mode[0].text == 'bus') {
              document.getElementById('footerLoad').style.display = "none";
              document.getElementById('hourglass').style.display = "none";
              document.getElementById('footerEnd').style.display = "block";
              document.getElementById('notDriving').style.display = "block";
              document.getElementById('notDriving').textContent = "Taking public transport helps save congestion and reduce carbon emmission. Thank you for making the world a better place. Congratulations!"
            }
            else if (mode[0].text == 'flight') {
              
              document.getElementById('footerLoad').style.display = "none";
              document.getElementById('hourglass').style.display = "none";
              document.getElementById('footerEnd').style.display = "block";
              document.getElementById('equivalentResult').style.display = "block";

              var parsedHours = Math.round(parseFloat(mode[0].hours));
              console.log(parsedHours);
              //so we need to figure out parsedMiles for Amazon
              document.getElementById('milesContainer').style.display = "block";
              document.getElementById('miles').textContent = parsedHours + " hours";
              document.getElementById('mainLine').textContent = "Your Carbon Footprint is:";
              
              var footprint = 250 * parsedHours;
              document.getElementById('carbonFootprint').textContent = footprint;
              document.getElementById('cfUnit').textContent = "kg of CO2";

              document.getElementById('equivalent').textContent = "This is equivalent to:";

              // START homes energy calculation
              // Convert metric ton to how many days worth.
              // metric ton/sehari house energy = equivalent to berapa hari
              var fpInMetricTons = footprint/1000
              console.log(footprint)
              var days = fpInMetricTons/0.023
              console.log(days)

              // if less than a day
              if (days < 1) {
                var hours = days * 24
                if (hours < 1) {
                  var minutes = hours * 60
                  document.getElementById('homeEnergy').textContent = Math.round(minutes) + " minutes worth of a home's energy use";
                }
                else if (hours == 1) {
                  document.getElementById('homeEnergy').textContent = hours.toFixed(2) + " hour worth of a home's energy use";
                } else {
                  document.getElementById('homeEnergy').textContent = hours.toFixed(2) + " hours worth of a home's energy use";
                }
                
              }
              
              // if more than a day
              if (days >= 1) {
                // if less than a month
                if (days < 30) {
                  var roundedDays = Math.round(days);
                  document.getElementById('homeEnergy').textContent = roundedDays + " days worth of a home's energy use";
                }

                // if more than a month but less than a year
                if (days > 30 && days < 365) {
                  var months = days/30
                  document.getElementById('homeEnergy').textContent = months.toFixed(2) + " months worth of a home's energy use";
                }

                // if more than a year
                if (days >= 365) {
                  var years = days/365
                  document.getElementById('homeEnergy').textContent = years.toFixed(2) + " years worth of a home's energy use";
                }
              }
              // END homes energy calculation

              // START coals burned calculation
              var poundsBurned = fpInMetricTons/0.000915
              if (Math.round(poundsBurned) === 1) {
                document.getElementById('coalsBurned').textContent = Math.round(poundsBurned) + " pound of coal burned";
              }
              else {
                document.getElementById('coalsBurned').textContent = Math.round(poundsBurned) + " pounds of coal burned";
              }   
              // END coals burned calculation

              // START number of smartphones charged calculation
              // 0.00000784
              var poundsBurned = fpInMetricTons/0.181437
              document.getElementById('smartphones').textContent ="You can plant " + Math.round(poundsBurned) + " trees to offset your carbon footprint";
              // END number of smartphones charged calculation
            }       
            else {
              alert("ERROR")
            }
    
          }
        );
      });
    }
  }
});

