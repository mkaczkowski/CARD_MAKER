angular.module('sioWebApp.common').factory('admobService', function (configuration, logger, networkService) {
	var LOG = logger.getInstance('admobService');
	var admobService = {};

	admobService.init = function () {
		document.addEventListener('onReceiveAd', function (msg) {
			LOG.info("onReceiveAd: {0}", [msg])
		});
		document.addEventListener('onFailedToReceiveAd', function (msg) {
			LOG.info("onFailedToReceiveAd: {0}", [msg])
		});
		document.addEventListener('onPresentAd', function (msg) {
			LOG.info("onPresentAd: {0}", [msg])
		});
		document.addEventListener('onDismissAd', function (msg) {
			LOG.info("onDismissAd: {0}", [msg])
		});
		document.addEventListener('onLeaveToAd', function (msg) {
			LOG.info("onLeaveToAd: {0}", [msg])
		});
	}

	admobService.createBanner = function () {
		LOG.info("createBanner");

		if (!configuration.isProd || !networkService.isOnline()) {
			return;
		}

		if (!window.plugins || !window.plugins.AdMob) {
			LOG.warn('createBannerView - AdMob plugin not available/ready.');
			return;
		}

		var am = window.plugins.AdMob;
		am.createBannerView({
			'publisherId': configuration.admobBannerKey,
			'adSize': am.AD_SIZE.BANNER,//SMART_BANNER
			'bannerAtTop': false,
			'overlap': true
		}, function () {
			am.requestAd({ 'isTesting': !configuration.isProd }, function () {
				am.showAd(true);
			}, function () {
				LOG.error('createBannerView - failed to request ad');
			});
		}, function () {
			LOG.error('createBannerView - failed to create banner view');
		});
	};


	admobService.showHomeAd = function () {
		admobService.createInterstitial(configuration.admobHomeKey);
	}

	admobService.showBackToHomeAd = function () {
		admobService.createInterstitial(configuration.admobBackToHomeKey);
	}

	admobService.showSaveAd = function () {
		admobService.createInterstitial(configuration.admobSaveKey);
	}

	admobService.showShareAd = function () {
		admobService.createInterstitial(configuration.admobShareKey);

	}

	admobService.createInterstitial = function (publisherId) {
		LOG.info("createInterstitial");

		if (!configuration.isProd && configuration.showAds) {
			alert("AD");
			return;
		}

		if (!window.plugins || !window.plugins.AdMob) {
			LOG.warn('createInterstitial - AdMob plugin not available/ready.');
			return;
		}

		var am = window.plugins.AdMob;
		am.createInterstitialView({
			'publisherId': publisherId
		}, function () {
			am.requestInterstitialAd({ 'isTesting': !configuration.isProd }, function () {
			}, function () {
				LOG.error('createInterstitial - failed to request ad');
			});
		}, function () {
			LOG.error("createInterstitial - Interstitial failed");
		});
	}

	return admobService;
});

angular.module('sioWebApp.common').factory('notificationService', function($cordovaDialogs, $ionicPopup, $timeout, admobService) {
    var notificationService = {};

    //$cordovaDialogs.alert('Wow!');
    //$cordovaDialogs.confirm('Are you sure?');
    //$cordovaDialogs.prompt('Please Login');
    // beep 3 times $cordovaDialogs.beep(3);

    notificationService.showError = function(msg) {
        var alertPopup = $ionicPopup.alert({
            title: msg,
            okType: 'button-assertive'
        });
    };

	notificationService.showInfo = function(msg) {
		var alertPopup = $ionicPopup.alert({
			title: msg,
			okType: 'button-energized'
		});
	};


    notificationService.savedConfirm =function(path, handler1) {
        return $ionicPopup.showPopup(
            {
                title: 'Picture has beed saved!<br>'+path,
                content:'',
                buttons: [
                    {
                        text: 'Share' ,
                        type: 'button-positive',
                        onTap: function(e) {
                            handler1();
                            return true;
                        }
                    },
                    {
                        text: 'OK',
                        type: 'button-energized',
                        onTap: function(e) {
							$timeout(function(){
								admobService.showSaveAd()
							},1000);
                            return true;
                        }
                    }
                ]
            });
    };

    notificationService.confirm =function(msg, successHandler) {
        return $ionicPopup.showPopup(
            {
                title: msg,
                content:'',
                buttons: [
                    {
                        text: 'Cancel' ,
                        type: 'button-default',
                        onTap: function(e) {
                            return true;
                        }
                    },
                    {
                        text: 'OK',
                        type: 'button-energized',
                        onTap: function(e) {
                            successHandler();
                            return true;
                        }
                    }
                ]
            });
    };

	notificationService.showInitPopup = function(handler1,handler2) {
		var alertPopup = $ionicPopup.show({
			title: 'Welcome!', // String. The title of the popup.
			subTitle: 'Please take a picture or choose from gallery', // String (optional). The sub-title of the popup.
			scope: null, // Scope (optional). A scope to link to the popup content.
			buttons: [{ //Array[Object] (optional). Buttons to place in the popup footer.
				text: 'Camera',
				type: 'button-energized',
				onTap: function(e) {
					handler1();
					return true;
				}
			}, {
				text: 'Gallery',
				type: 'button-energized',
				onTap: function(e) {
					handler2();
					return true;
				}
			}]
		});
	};

    return notificationService;
});


