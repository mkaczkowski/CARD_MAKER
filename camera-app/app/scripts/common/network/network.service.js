angular.module('sioWebApp.common').factory('networkService', function($cordovaNetwork) {
    var networkService = {};

    //var type = $cordovaNetwork.getNetwork();

    networkService.isOnline = function() {
        if(!navigator || !navigator.connection){
            return false;
        }
        return $cordovaNetwork.isOnline();
    };

    networkService.openMarketURL = function(url) {
		console.info("openMarketURL");
		if(!cordova || ! cordova.plugins || !cordova.plugins.market){
			return false;
		}

        cordova.plugins.market.open(url);
    };

    return networkService;
});