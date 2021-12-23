var AutoClicker = {}

AutoClicker.init = function() {


  AutoClicker.OffColor = '#b52f18';
  AutoClicker.OnColor = '#63943e';
  AutoClicker.ButtonContainerColor = 'rgba(0, 0, 0, 0.4)';
  AutoClicker.ButtonBackgroundColor = '#313332';

  AutoClicker.AutoClickMode = false;
  AutoClicker.GoldenClickMode = false;
  AutoClicker.FortuneClickMode = false;
  AutoClicker.AutoBuyMode = false;
  AutoClicker.AutoProductMode = false;

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

  AutoClicker.ClickFortune = function() {
    if(!AutoClicker.FortuneClickMode) return;
    if(Game.TickerEffect && Game.TickerEffect.type === 'fortune') {
      Game.tickerL.click();
    }
  }

  AutoClicker.ClickUpgrade = function() {
    if(!AutoClicker.AutoBuyMode) return;
    var upgradeStore = document.getElementsByClassName('crate upgrade enabled').upgrade0;
    AutoClicker.dispatchEvent(upgradeStore, 'click');
  };

  AutoClicker.ClickProduct = function() {
    if(!AutoClicker.AutoProductMode) return;
    // var upgradeProduct = document.getElementsByClassName('product unlocked enabled');
    // AutoClicker.dispatchEvent(upgradeProduct, 'click');
    for (const upgradeProduct of document.getElementsByClassName("product unlocked enabled")){
      AutoClicker.dispatchEvent(upgradeProduct, 'click');
    }
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
      statusTextEl.innerHTML = status ? 'On' : 'Off';
  }

  AutoClicker.AutoClickCallback = function(event) {
    AutoClicker.AutoClickMode = !AutoClicker.AutoClickMode;
    AutoClicker.setButtonStatus(AutoClicker.AutoButton, AutoClicker.AutoClickMode);
  }

  AutoClicker.GoldenAutoClickCallback = function(event) {
    AutoClicker.GoldenClickMode = !AutoClicker.GoldenClickMode;
    AutoClicker.setButtonStatus(AutoClicker.AutoGoldenButton, AutoClicker.GoldenClickMode);
  }

  AutoClicker.FortuneAutoClickCallback = function(event) {
    AutoClicker.FortuneClickMode = !AutoClicker.FortuneClickMode;
    AutoClicker.setButtonStatus(AutoClicker.AutoFortuneButton, AutoClicker.FortuneClickMode);
  }

  AutoClicker.UpgradeAutoClickCallback = function(event) {
    AutoClicker.AutoBuyMode = !AutoClicker.AutoBuyMode;
    AutoClicker.setButtonStatus(AutoClicker.AutoBuyButton, AutoClicker.AutoBuyMode);
  }

  AutoClicker.ProductAutoClickCallback = function(event) {
    AutoClicker.AutoProductMode = !AutoClicker.AutoProductMode;
    AutoClicker.setButtonStatus(AutoClicker.AutoProductButton, AutoClicker.AutoProductMode);
  }

  AutoClicker.setButtonProps = function(button, text, eventCallback) {
    var textEl = document.createElement('p');
    var statusTextEl = document.createElement('p');
    textEl.innerHTML = text;
    textEl.style.margin = 'auto 0';
    //textEl.style.flexBasis = '60%';
    //textEl.style.flexBasis = '45%'
    statusTextEl.innerHTML = 'Off';
    statusTextEl.className = 'status-text';
    statusTextEl.style.backgroundColor = AutoClicker.OffColor;
    statusTextEl.style.margin = 'auto 0';
    statusTextEl.style.padding = '0.5rem';
    //statusTextEl.style.textAlign = 'center';
    statusTextEl.style.flexBasis = '20%'
    button.style.display = 'flex';
    button.style.padding = '0.5rem';
    button.style.flexBasis = '45%';
    button.style.justifyContent = 'space-between';
    button.style.marginBottom = '0.25rem';
    button.style.marginTop = '0.25rem';
    button.style.backgroundColor = AutoClicker.ButtonBackgroundColor;
    button.style.cursor = 'pointer';
    button.addEventListener('click', eventCallback);
    button.appendChild(textEl);
    button.appendChild(statusTextEl);
  }

  AutoClicker.createButtons = function() {
    var container = document.createElement('div');
    container.style.backgroundColor = AutoClicker.ButtonContainerColor;
    container.style.position = 'absolute';
    container.style.display = 'flex';
    container.style.justifyContent = 'space-between'
    container.style.flexWrap = 'wrap';
    container.style.top = '55%';
    container.style.left = '5%';
    container.style.right = '5%';
    container.style.color = 'white';
    container.style.zIndex = '10001';
    var autoButton = document.createElement('div');
    AutoClicker.setButtonProps(autoButton, 'Auto Click', AutoClicker.AutoClickCallback);
    var autoGoldenButton = document.createElement('div');
    AutoClicker.setButtonProps(autoGoldenButton, 'Auto Golden', AutoClicker.GoldenAutoClickCallback);
    var autoFortuneButton = document.createElement('div');
    AutoClicker.setButtonProps(autoFortuneButton, 'Auto Fortunes', AutoClicker.FortuneAutoClickCallback);
    var autoBuyButton = document.createElement('div');
    AutoClicker.setButtonProps(autoBuyButton, 'Auto Upgrade', AutoClicker.UpgradeAutoClickCallback);
    var autoProductButton = document.createElement('div');
    AutoClicker.setButtonProps(autoProductButton, 'Auto Buildings', AutoClicker.ProductAutoClickCallback);
    container.appendChild(autoButton);
    container.appendChild(autoGoldenButton);
    container.appendChild(autoFortuneButton);
    container.appendChild(autoBuyButton);
    container.appendChild(autoProductButton);
    var gameContainer = document.getElementById('sectionLeft')
    gameContainer.appendChild(container);
    AutoClicker.ButtonContainer = container;
    AutoClicker.AutoButton = autoButton;
    AutoClicker.AutoGoldenButton = autoGoldenButton;
    AutoClicker.AutoFortuneButton = autoFortuneButton;
    AutoClicker.AutoBuyButton = autoBuyButton;
    AutoClicker.AutoProductButton = autoProductButton;
  };

  window.setTimeout(() => {
    AutoClicker.createButtons();
    AutoClicker.AutoClickInterval = window.setInterval(AutoClicker.ClickCookie, 25);
    AutoClicker.GoldenClickInterval = window.setInterval(AutoClicker.ClickGoldenCookie, 25);
    AutoClicker.FortuneClickInterval = window.setInterval(AutoClicker.ClickFortune, 25);
    AutoClicker.UpgradeClickInterval = window.setInterval(AutoClicker.ClickUpgrade, 25);
    AutoClicker.ProductClickInterval = window.setInterval(AutoClicker.ClickProduct, 25);
  }, 5000);
  Game.Notify(`AutoClicker mod loaded!`,'',[16,5]);
  AutoClicker.isLoaded = true;
};

AutoClicker.save = function() {

};

AutoClicker.load = function() {

};

if(!AutoClicker.isLoaded) Game.registerMod('AutoClicker', AutoClicker);
