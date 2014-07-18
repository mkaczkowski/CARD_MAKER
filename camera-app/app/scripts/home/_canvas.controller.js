'use strict';

/**
 * @ngdoc function
 * @name sioWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sioWebApp
 */
angular.module('sioWebApp.home').controller('CanvasCtrl', function ($scope, $timeout, mySharedService,
		notificationService, configuration, logger, dataService, $state, imageService, sharingService, loadingService, networkService) {

	var LOG = logger.getInstance('CanvasCtrl');

	$scope.isEmpty = true;
	$scope.isSelected = false;
	$scope.isExpanded = true;
	$scope.tmpOpacity = 1;
    $scope.tmpBrightness = 1;

	$scope.isOpacityRangeVisible = false;

	$scope.pictureUrl = dataService.cropDataUrl;

	$scope.$on('handleBroadcast', function() {
		$scope.isSelected = mySharedService.message;
		if(mySharedService.message){
			$scope.isEmpty = false;
			if($scope.isOpacityRangeVisible){
				$scope.tmpOpacity = mySharedService.currentElementData.opacity;
                $scope.tmpBrightness = mySharedService.currentElementData.brightness;
			}
		}else{
			$scope.isOpacityRangeVisible = false;
		}
	});

	$scope.resetElement = function(){
		mySharedService.resetElement();
	};

	$scope.removeElement = function(){
		mySharedService.removeElement();
		$scope.isEmpty = (angular.element(".drag-and-drop").length == 0);
	};

	$scope.moveUp = function(){
		mySharedService.moveUp();
	};

	$scope.moveDown = function(){
		mySharedService.moveDown();
	};

	$scope.mirror = function(){
		mySharedService.mirror();
	};


	$scope.showOpacityRange = function(){
		$scope.isOpacityRangeVisible = !$scope.isOpacityRangeVisible;
		if($scope.isOpacityRangeVisible){
			$scope.tmpOpacity = mySharedService.currentElementData.opacity;
            $scope.tmpBrightness = mySharedService.currentElementData.brightness;
		}
	};

	$scope.changeOpacity = function(value){
		mySharedService.changeOpacity(value);
	};

    $scope.changeBrightness = function(value){
        mySharedService.changeBrightness(value);
    };

	$scope.clearWhiteboard = function(){
		notificationService.confirm('Are you sure you want to clear?',
				function() {
					mySharedService.clearAll();
					$scope.isEmpty = true;
				});
	};

	$scope.showFilters = function () {
        loadingService.show();
		mySharedService.prepForBroadcast(null);
		imageService.imgToCanvas('canvas', function (canvas) {
			dataService.alteredDataUrl = canvas.toDataURL();
			$timeout(function(){
                $state.go('filters')
			},100);
		});
	};

	$scope.saveCanvasToFile = function(successHandler) {
		mySharedService.prepForBroadcast(null);
		imageService.saveCanvasToFile('canvas',function(canvas,path){
			if (successHandler) {
				successHandler(canvas)
			} else {
				notificationService.savedConfirm(path, function () { $scope.sharePicure() });
			}
		})
	}

	$scope.sharePicure = function(){
		$scope.saveCanvasToFile(function(canvas){
			sharingService.shareViaFacebook(canvas.toDataURL());
		});
	};

	$scope.rateUs = function(){
		networkService.openMarketURL(configuration.marketUrl)
	};

    $scope.goBack = function() {
        window.history.back();
    };

	mySharedService.init();
});
