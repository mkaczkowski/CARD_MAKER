angular.module('sioWebApp.common').factory('sharingService', function (configuration, $cordovaSocialSharing, notificationService, logger, admobService, $timeout) {

	var LOG = logger.getInstance('sharingService');
	var shareService = {};
	shareService.shareViaFacebook = function (image) {
		LOG.info("shareViaFacebook image:{0}", [image]);
		var link = configuration.url;
		var message = configuration.name;
		var subject = configuration.name;
		$cordovaSocialSharing.shareImage(message, subject, image, link).then(function (result) {
			LOG.error("shareViaFacebook result:{0}", [result]);
			$timeout(function(){
				admobService.showShareAd()
			},1000);
		}, function (err) {
			LOG.error("shareViaFacebook error:{0}", [err]);
			notificationService.showError("Ooops. Something went wrong.");
		});
	};

	return shareService;
});

