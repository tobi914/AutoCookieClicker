var AutoClicker = {}

AutoClicker.init = function() {

  AutoClicker.ClickCookie = function() {
    var cookie = document.getElementById('bigCookie');
    AutoClicker.dispatchEvent(cookie, 'click');
  };

  AutoClicker.ClickGoldenCookie = function() {
    var goldenCookie = document.getElementById('shimmers').firstChild;
    AutoClicker.dispatchEvent(goldenCookie, 'click');
  };

  AutoClicker.dispatchEvent = function(target, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    if(target) {
      target.dispatchEvent(e);
    }
  };

  window.setTimeout(() => {
    window.setInterval(AutoClicker.ClickCookie, 25);
    window.setInterval(AutoClicker.ClickGoldenCookie, 25);
  }, 5000);
  Game.Notify(`AutoClicker mod loaded!`,'',[16,5]);
  AutoClicker.isLoaded = true;
};

AutoClicker.save = function() {

};

AutoClicker.load = function() {

};

if(!AutoClicker.isLoaded) Game.registerMod('AutoClicker', AutoClicker);
