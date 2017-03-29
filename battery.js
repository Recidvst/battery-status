navigator.getBattery().then(function(b) {
  var updateBat = function() {
    var l = b.level * 100;
    var c = b.charging;
    $('#bat-current span').text(l << 0).attr("low","false");
    if(l < 49) {
      $('#bat-current span').attr("low","true");
    }
    $('#bat-bar-level').width( l +"%");
    if(c == true) {
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
  }
  updateBat();
  var then = Date.now();
  var batteryThen = b.level * 100;
  b.onlevelchange = function() {
    updateBat();

    var now = Date.now();
    var batteryNow = b.level * 100;
    var batteryDiff = batteryThen - batteryNow;
    var batteryDivide = batteryThen / batteryDiff;

    var diff = now - then;
    var sec = diff / 1000;
    var deathmin = ( (sec / 60) << 0 ) * batteryDivide;

    then = Date.now();
    batteryThen = batteryNow;

    $('#bat-remain span').text(deathmin).attr("low","true");
  }
  });
