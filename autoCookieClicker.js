if(AutoClicker === undefined) var AutoClicker = {};
if(typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');

AutoClicker.launch = function(){
  if(!AutoClicker.isLoaded){
	AutoClicker.interval = setInterval(Game.ClickCookie, 100);
  AutoClicker.isLoaded = 1;
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
