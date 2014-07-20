'use strict';

/**
 * @ngdoc function
 * @name sioWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sioWebApp
 */
angular.module('sioWebApp.home').controller('CropCtrl', function ($scope, notificationService, configuration, logger,$state, dataService, $timeout, admobService) {
    var LOG = logger.getInstance('CropCtrl');

    $scope.zoomIn = function( ) {
//        $scope.crop.zoomIn();
		$scope.cropPlugin.zoomIn();
    }

    $scope.zoomOut = function( ) {
//        $scope.crop.zoomOut();
		$scope.cropPlugin.zoomOut();
    }

    $scope.rotateRight = function( ) {
        $scope.rotatePlugin.rotateRight();
    }

	$scope.rotateLeft = function( ) {
		$scope.rotatePlugin.rotateLeft();
	}

    $scope.mirror = function( ) {
//        $scope.crop.mirror();
		$scope.rotatePlugin.flip();
    }
    $scope.complete = function(event) {
        $scope.cropPlugin.onMouseDown(event);
        dataService.data.url = $scope.cropPlugin.cropCurrentZone();
        $timeout(function(){
            $state.go('form')
        },100);
    }

    $scope.goBack = function() {
		$timeout(function(){
			admobService.showBackToHomeAd()
		},1000)
		window.history.back();
    };

    //$scope.cropImage(dataService.pictureDataUrl);

    $scope.cropPlugin;
    $scope.rotatePlugin;
    $scope.init = function(){

        var myimage = new Image();
        myimage.onload = function (data) {
            var cropCanvas = $('#cropCanvas');
            cropCanvas.html('<img id="cropContainer" src=' + dataService.pictureDataUrl + ' />');

            var clientWidth = document.body.clientWidth;
            var clientHeight = document.body.clientHeight - 70 - 45;
            $scope.dkrm = new Darkroom('#cropContainer', {
                // Size options
                minWidth: clientWidth,
                minHeight: 200,
                maxWidth: clientWidth,
                maxHeight: clientHeight,
                plugins: {
                    crop: {
                        minHeight: 215 / 3,
                        minWidth: 304 / 3,
                        ratio: 304 / 215
                    }
                },
                init: function () {
					var width = $(".upper-canvas").width();
					var height = $(".upper-canvas").height();
                    $scope.rotatePlugin = this.getPlugin('rotate');
                    $scope.cropPlugin = this.getPlugin('crop');
                    $scope.cropPlugin.selectZone(50/2, 50/2, width - 50, height - 50);
                    this.addEventListener('image:rotate', function (data) {
						$scope.cropPlugin.selectZone(50/2, 50/2, width - 50, height - 50);
                    });
                }
            });
        }
        myimage.src = dataService.pictureDataUrl;
    }

    $scope.init();
});

