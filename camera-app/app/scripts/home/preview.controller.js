'use strict';
angular.module('sioWebApp.home').controller('PreviewCtrl', function ($scope,configuration,logger,$timeout, $interval,imageService,sharingService,networkService,
		cameraService,dataService,$state,notificationService, loadingService, admobService) {

	var LOG = logger.getInstance('PreviewCtrl');

	$scope.saveCanvasToFile = function(successHandler) {
		imageService.saveCanvasToFile('canvas',function(canvas,path){
			if (successHandler) {
				successHandler(canvas)
			} else {
				notificationService.savedConfirm(path, function () { $scope.sharePicure() });
			}
		})
	}

	$scope.saveDataUrlToFile = function(dataUrl) {
		imageService.saveDataUrl(dataUrl,function(path){
			notificationService.savedConfirm(path, function () { $scope.sharePicure() });
		})
	}

	$scope.sharePicure = function(){
		sharingService.shareViaFacebook(dataService.preparedDataUrl);
	};

	$scope.goBack = function() {
		$timeout(function(){
			admobService.showBackToHomeAd()
		},1000)
		window.history.back();
	};

	$scope.dataWidth = Math.min(400,document.body.clientWidth - 20);
	$scope.dataHeight = Math.min(556,document.body.clientHeight - 55 - 45 - 20);

	$scope.dataUrl = dataService.preparedDataUrl;
	loadingService.hide();
});