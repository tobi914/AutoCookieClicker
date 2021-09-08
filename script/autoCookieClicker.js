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

  AutoClicker.createButtons = function() {
    var container = document.createElement('div');
    container.style.padding = '1rem';
    container.style.backgroundColor = 'black';
    container.style.position = 'absolute';
    container.style.top: '0';
    container.style.left: '0';
    container.style.color: 'white';
    var autoButton = document.createElement('button');
    autoButton.innerHTML = 'Auto click';
    var autoGoldenButton = document.createElement('button');
    autoGoldenButton.innerHTML = 'Golden auto click';
    container.appendChild(autoButton);
    container.appendChild(autoGoldenButton);
    var gameContainer = document.getElementById('game')
    gameContainer.appendChild(container);
    AutoClicker.ButtonContainer = container;
    AutoClicker.AutoButton = autoButton;
    AutoClicker.AutoGoldenButton = autoGoldenButton;
  };

  window.setTimeout(() => {
    AutoClicker.AutoClickInterval = window.setInterval(AutoClicker.ClickCookie, 25);
    AutoClicker.GoldenClickInterval = window.setInterval(AutoClicker.ClickGoldenCookie, 25);
  }, 5000);
  Game.Notify(`AutoClicker mod loaded!`,'',[16,5]);
  AutoClicker.isLoaded = true;
};

AutoClicker.save = function() {

};

AutoClicker.load = function() {

};

if(!AutoClicker.isLoaded) Game.registerMod('AutoClicker', AutoClicker);
