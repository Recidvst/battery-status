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
            divideBattery = nowBattery / diffBattery,
            deathTime = Math.round((divideBattery * diffTime) / 60000),
            deathTimeAPI = Math.round(b.dischargingTime / 60);

        // do dom stuff
        $('#bat-current span').text(l << 0).attr("low","false");
         if(l < 49) {
           $('#bat-current span').attr("low","true");
         }
         $('#bat-bar-level').width( l +"%");
         if(isCharging == true) {
           $('#bat-charge span').text("Yep").attr("low","false");;
         }
         else {
           if (l > 50) {
             $('#bat-charge span').text("Nope").attr("low","true");
           }
           else {
             $('#bat-charge span').text("Nope, but maybe you should be..").attr("low","true");
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
         $('#bat-remain span').text(t).attr("low","true");

         // pie chart
         var data = {
            series: [100,]
          };
          data.series.push(nowBattery);
          var sum = function(a, b) { return a + b };
          new Chartist.Pie('#bat-pie-chart', data, {
            labelInterpolationFnc: function(value) {
              return Math.round(value / data.series.reduce(sum) * 100) + '%';
            }
          });
      } // end getBatteryDetails function

      // trigger updates
      if (docReady == true) {
        getBatteryDetails();
        setTimeout(function(){
          getBatteryDetails();
        }, 5000);
        docReady = false;
      }
      b.onlevelchange = function() {getBatteryDetails();}
      b.addEventListener('levelchange', getBatteryDetails);
      b.addEventListener('chargingtimechange', getBatteryDetails);
      b.addEventListener('dischargingtimechange', getBatteryDetails);
      b.addEventListener('chargingchange', getBatteryDetails);

  });
});
