'use strict';

/**
 * @ngdoc function
 * @name sioWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sioWebApp
 */
angular.module('sioWebApp.home').controller('HomeCtrl', function ($scope, $ionicPopup,$ionicLoading, $timeout,
		imageService, cameraService,
		sharingService, notificationService, networkService,
		configuration, logger) {

	var LOG = logger.getInstance('HomeCtrl');

	var loading;
	var show = function() { loading = $ionicLoading.show({ content: 'Processing...' }); };
	var hide = function(){ if(!loading) return; loading.hide(); };

	$scope.isEmpty = true;

/*
	$scope.$on('handleBroadcast', function() {
		$scope.isSelected = mySharedService.message;
		if(mySharedService.message){
			$scope.isEmpty = false;
		}
	});
*/

	$scope.saveCanvasToFile = function(successHandler){
		show();
		//mySharedService.prepForBroadcast(null);
		$timeout(function(){
			html2canvas( [ document.getElementById('canvas') ], {
				onrendered: function(canvas) {

					/*	var dataUrl = canvas.toDataURL();
					 window.open(dataUrl);*/

					imageService.saveCanvasToFile(canvas,
							function(msg){
								hide();
								if(successHandler){
									successHandler(canvas)
								}else{
									notificationService.savedConfirm(msg,
											function () {$scope.sharePicure()});
								}
							},function(err){
								hide();
								LOG.error("saveCanvasToFile err:{0}",[err])
								notificationService.showError("Ooops. Something went wrong.")
							});
				}
			});
		},500);
	};

	$scope.sharePicure = function(){
		$scope.saveCanvasToFile(function(canvas){
			sharingService.shareViaFacebook(canvas.toDataURL());
		});
	};

	$scope.getPicture = function(){
		cameraService.getPicture("pictureContainer", function(){ });
	};


	$scope.loadImage = function(){
		cameraService.loadImageFromLibrary("pictureContainer",function(){ });
	};

//	notificationService.showInitPopup($scope.getPicture,$scope.loadImage);
});
