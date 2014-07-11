angular.module('sioWebApp.common').factory('cameraService', function($cordovaCamera, notificationService, logger) {
	var cameraService = {};

	var LOG = logger.getInstance('cameraService');

	cameraService.takePhotoOptions = {
		quality : 100,
		destinationType : Camera.DestinationType.DATA_URL ,
		sourceType : Camera.PictureSourceType.CAMERA ,
		allowEdit : true,
		encodingType: Camera.EncodingType.JPEG,
		saveToPhotoAlbum: false,
		correctOrientation:true
	};

	cameraService.loadImageOptions = {
		quality: 100,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
	};

	cameraService.getPicture = function(successHandler){
		cameraService.loadImageOptions.targetWidth = 303;
		cameraService.loadImageOptions.targetHeight = 215;

		$cordovaCamera.getPicture(cameraService.takePhotoOptions).then(function(imageData){
					LOG.info("getPicture success:{0}",[imageData]);
                    successHandler(imageData);
				}, function(err) {
					LOG.error("getPicture error:{0}",[err])
					notificationService.showError("Ooops. Something went wrong.")
				}
		)
	};

	cameraService.loadImageFromLibrary = function(successHandler) {
		cameraService.loadImageOptions.targetWidth = 303;
		cameraService.loadImageOptions.targetHeight = 215;

		$cordovaCamera.getPicture(cameraService.loadImageOptions).then(function (imageData) {
			LOG.info("loadImageFromLibrary imageURI:{0}",[imageData])
            successHandler(imageData);
		}, function (err) {
			LOG.error("loadImageFromLibrary error:{0}",[err])
			notificationService.showError("Ooops. Something went wrong.")
		})
	};
	return cameraService;
});