var AutoClicker = {}

AutoClicker.init = function() {


  AutoClicker.OffColor = '#b52f18';
  AutoClicker.OnColor = '#63943e';
  AutoClicker.ButtonContainerColor = 'rgba(0, 0, 0, 0.4)';
  AutoClicker.ButtonBackgroundColor = '#313332';

  AutoClicker.AutoClickMode = false;
  AutoClicker.GoldenClickMode = false;

  AutoClicker.ClickCookie = function() {
    if(!AutoClicker.AutoClickMode) return;
    var cookie = document.getElementById('bigCookie');
    AutoClicker.dispatchEvent(cookie, 'click');
  };

  AutoClicker.ClickGoldenCookie = function() {
    if(!AutoClicker.GoldenClickMode) return;
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

  AutoClicker.setButtonStatus = function(button, status) {
    var statusTextEl = button.getElementsByClassName('status-text')[0];
    if(!statusTextEl) return;
    statusTextEl.style.backgroundColor = status ? AutoClicker.OnColor : AutoClicker.OffColor;
      statusTextEl.innerHTML = status ? 'on' : 'off';
  }

  AutoClicker.AutoClickCallback = function(event) {
    AutoClicker.AutoClickMode = !AutoClicker.AutoClickMode;
    AutoClicker.setButtonStatus(AutoClicker.AutoButton, AutoClicker.AutoClickMode);
  }

  AutoClicker.GoldenAutoClickCallback = function(event) {
    AutoClicker.GoldenClickMode = !AutoClicker.GoldenClickMode;
    AutoClicker.setButtonStatus(AutoClicker.AutoGoldenButton, AutoClicker.GoldenClickMode);
  }

  AutoClicker.setButtonProps = function(button, text, eventCallback) {
    var textEl = document.createElement('p');
    var statusTextEl = document.createElement('p');
    textEl.innerHTML = text;
    textEl.style.margin = 'auto';
    //textEl.style.flexBasis = '45%'
    statusTextEl.innerHTML = 'off';
    statusTextEl.className = 'status-text';
    statusTextEl.style.backgroundColor = AutoClicker.OffColor;
    statusTextEl.style.margin = 'auto';
    statusTextEl.style.padding = '0.5rem';
    //statusTextEl.style.textAlign = 'center';
    statusTextEl.style.flexBasis = '20%'
    button.style.display = 'flex';
    button.style.height = '3.25rem';
    button.style.flexBasis = '45%';
    button.style.backgroundColor = AutoClicker.ButtonBackgroundColor;
    button.style.cursor = 'pointer';
    button.addEventListener('click', eventCallback);
    button.appendChild(textEl);
    button.appendChild(statusTextEl);
  }

  AutoClicker.createButtons = function() {
    var container = document.createElement('div');
    container.style.padding = '1rem';
    container.style.backgroundColor = AutoClicker.ButtonContainerColor;
    container.style.position = 'absolute';
    container.style.display = 'flex';
    container.style.justifyContent = 'space-between'
    container.style.top = '90%';
    container.style.left = '20%';
    container.style.right = '20%';
    container.style.color = 'white';
    container.style.zIndex = '9999';
    container.style.border = '1px solid lihtgray';
    var autoButton = document.createElement('div');
    AutoClicker.setButtonProps(autoButton, 'Auto click', AutoClicker.AutoClickCallback);
    var autoGoldenButton = document.createElement('div');
    AutoClicker.setButtonProps(autoGoldenButton, 'Auto golden', AutoClicker.GoldenAutoClickCallback)
    container.appendChild(autoButton);
    container.appendChild(autoGoldenButton);
    var gameContainer = document.getElementById('sectionLeft')
    gameContainer.appendChild(container);
    AutoClicker.ButtonContainer = container;
    AutoClicker.AutoButton = autoButton;
    AutoClicker.AutoGoldenButton = autoGoldenButton;
  };

  window.setTimeout(() => {
    AutoClicker.createButtons();
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
