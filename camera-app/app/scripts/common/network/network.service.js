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
        cordova.plugins.market.open(url);
    };

    return networkService;
});