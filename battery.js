navigator.getBattery().then(function(b) {
  var l = b.level;
  var c = b.charging;
  var updateBat = function() {
    $('#bat-current span').text(l);
    $('#bat-bar-level').width((l * 100)+"%");
    if(c == true) {
      $('#bat-charge span').text("Yep");
    }
    else {
      if (l > 0.5) {
        $('#bat-charge span').text("Nope");
      }
      else {
        $('#bat-charge span').text("Nope, but maybe you should be..");
      }
    }
  }
  updateBat();
  b.onlevelchange = function() {
    updateBat();
  };  
});
