$(document).ready(function() {
  var constTime = Date.now(),
      docReady = true;

  navigator.getBattery().then(function(b) {
      var constBattery = b.level * 100,
          l = constBattery,
          isCharging = b.charging;

      var getBatteryDetails = function() {
        var nowTime = Date.now(),
            nowBattery = b.level * 100,
            diffTime = nowTime - constTime,
            diffBattery = constBattery - nowBattery,
            divideBattery = nowBattery / diffBattery;
            var deathTime = divideBattery * diffTime;
            var deathTimeAPI = b.dischargingTime;

            var timeFormat = function(el, time) {
              var date = new Date(null);
              date.setSeconds(el / time);
              return date.toISOString().substr(11, 8);
            }
              if ( deathTime != 'Infinity' ) {
                deathTime = timeFormat(deathTime, 60);
              }
              deathTimeAPI = timeFormat(deathTimeAPI, 1);

        // do dom stuff
        $('#bat-current span').text((l << 0) + '%');
         if( l < 49) {
           $('#bat-current span').attr("low","true");
         }
         if(isCharging == true) {
           $('#bat-charge span').text("Charging");
         }
         else {
           if ( l ) {
             $('#bat-charge span').text("On battery");
           }
         }
         if (deathTimeAPI != Infinity && deathTime < (deathTimeAPI - 10) ) {
           var t = deathTimeAPI;
         }
         else {
           if (deathTime != Infinity) {
             var t = deathTime;
           }
           else if (deathTimeAPI != Infinity) {
             var t = deathTimeAPI;
           }
           else {
             var t = 'Who knows?!';
           }
         }
         $('#bat-remain span').text(t);

         // pie chart
         var used = 100 - l;
         google.charts.load('current', {'packages':['corechart']});
         google.charts.setOnLoadCallback(drawChart);
         function drawChart() {
           var data = google.visualization.arrayToDataTable([
             ['Chunk', 'Percentage'],
             ['Remaining',     l],
             ['Used',      used]
           ]);
           var options = {
             'backgroundColor': 'black',
             'backgroundColor.stroke': '#00b800',
             'legend': {position: 'none'},
             'slices': [{color: '00b800'}, {color: 'b80f00'}],
             'chartArea': {
                  height: "100%",
                  width: "100%"
              }
           };
           var chart = new google.visualization.PieChart(document.getElementById('piechart'));
           chart.draw(data, options);
           function resizeChart () {
                chart.draw(data, options);
            }
            if (document.addEventListener) {
                window.addEventListener('resize', resizeChart);
            }
            else if (document.attachEvent) {
                window.attachEvent('onresize', resizeChart);
            }
            else {
                window.resize = resizeChart;
            }
       }
      } // end getBatteryDetails function

      // trigger updates
      if (docReady == true) {
        getBatteryDetails();
        docReady = false;
      }
      b.onlevelchange = function() {getBatteryDetails();}
      b.addEventListener('levelchange', getBatteryDetails);
      b.addEventListener('chargingtimechange', getBatteryDetails);
      b.addEventListener('dischargingtimechange', getBatteryDetails);
      b.addEventListener('chargingchange', getBatteryDetails);

  });
});
