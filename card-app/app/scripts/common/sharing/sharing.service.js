angular.module('sioWebApp.common').factory('sharingService', function(configuration, $cordovaSocialSharing, notificationService, logger) {

	var LOG = logger.getInstance('sharingService');

	var shareService = {};

    shareService.shareViaFacebook = function(image) {
        LOG.info("shareViaFacebook image:{0}",[image]);
        var link = configuration.url;
        var message = configuration.name;
        var subject = configuration.name;
        $cordovaSocialSharing.shareImage(message, subject, image, link).then(function(result) {
			LOG.error("shareViaFacebook result:{0}",[result]);
        }, function(err) {
			LOG.error("shareViaFacebook error:{0}",[err]);
            notificationService.showError("Ooops. Something went wrong.");
        });
    };

    return shareService;
});

angular.module('sioWebApp.common').factory('admobService', function(configuration, logger) {

	var LOG = logger.getInstance('admobService');

	var admobService = {};

	admobService.init = function(){
		document.addEventListener('onReceiveAd', function(msg){ LOG.info("onReceiveAd: {0}",[msg]) });
		document.addEventListener('onFailedToReceiveAd', function(msg){ LOG.info("onFailedToReceiveAd: {0}",[msg]) });
		document.addEventListener('onPresentAd', function(msg){ LOG.info("onPresentAd: {0}",[msg]) });
		document.addEventListener('onDismissAd', function(msg){ LOG.info("onDismissAd: {0}",[msg]) });
		document.addEventListener('onLeaveToAd', function(msg){ LOG.info("onLeaveToAd: {0}",[msg]) });
	}

	admobService.createBanner = function() {
		LOG.info("createBanner");
		if( !window.plugins || !window.plugins.AdMob ) {
			LOG.warn('createBannerView - AdMob plugin not available/ready.');
			return;
		}

		var am = window.plugins.AdMob;
		am.createBannerView(
				{
					'publisherId': configuration.admobBannerKey,
					'adSize': am.AD_SIZE.BANNER,//SMART_BANNER
					'bannerAtTop': false,
					'overlap': true
				},
				function() {
					am.requestAd(
							{ 'isTesting':!configuration.isProd },
							function(){
								am.showAd( true );
							},
							function(){ LOG.error('createBannerView - failed to request ad'); }
					);
				},
				function(){ LOG.error('createBannerView - failed to create banner view'); }
		);
	};

	admobService.createInterstitial = function() {
		LOG.info("createInterstitial");
		if (!window.plugins || !window.plugins.AdMob) {
			LOG.warn('createInterstitial - AdMob plugin not available/ready.');
			return;
		}

		var am = window.plugins.AdMob;
		am.createInterstitialView(
				{
					'publisherId': configuration.admobInterKey
				},
				function() {
					am.requestInterstitialAd( { 'isTesting':!configuration.isProd }, function() {}, function() { LOG.error('createInterstitial - failed to request ad'); });
				},
				function() {
					LOG.error("createInterstitial - Interstitial failed");
				}
		);
	}

	return admobService;
});

