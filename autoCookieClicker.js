if(AutoClicker === undefined) var AutoClicker = {};
AutoClicker.name = 'AutoClicker';
AutoClicker.version = '1.6';
AutoClicker.GameVersion = '2.04';

AutoClicker.launch = function(){
  AutoClicker.init = function(){
    AutoClicker.interval = setInterval(Game.ClickCookie, 100);
    AutoClicker.isLoaded = 1;
  }
  if(CCSE.ConfirmGameVersion(AutoClicker.name, AutoClicker.version, AutoClicker.GameVersion)) {
    Game.registerMod(AutoClicker.name, AutoClicker);
  }
}

if(!AutoClicker.isLoaded){
	if(CCSE && CCSE.isLoaded){
		AutoClicker.launch();
	}
	else{
		if(!CCSE) var CCSE = {};
		if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(AutoClicker.launch);
	}
}
