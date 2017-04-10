$(document).ready(function() {
  var constTime = Date.now();
  var docReady = true;

  navigator.getBattery().then(function(b) {
      var constBattery = b.level * 100;
      var l = constBattery;
      var isCharging = b.charging;

      var getBatteryDetails = function() {
        var nowTime = Date.now();
        var nowBattery = b.level * 100;

        var diffTime = nowTime - constTime;
        var diffBattery = constBattery - nowBattery;
        var divideBattery = nowBattery / diffBattery;
        var deathTime = Math.round((divideBattery * diffTime) / 60000);
        var deathTimeAPI = Math.round(b.dischargingTime / 60);

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
           $('#bat-remain span').text(deathTimeAPI).attr("low","true");
         }
         else {
           $('#bat-remain span').text(deathTime).attr("low","true");
         }
      }

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
