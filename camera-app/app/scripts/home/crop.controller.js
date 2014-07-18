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

    $scope.crop;
    $scope.cropImage = function(imageData){

        var canvas = angular.element(document.getElementById("canvasView"));
        canvas.hide();

        var cropView = angular.element(document.getElementById("cropView"));
        cropView.show();

        var cropContainer = angular.element(document.getElementById("cropContainer"));
        cropContainer.attr("src",imageData);

        cropContainer.cropbox({width: cropContainer.width(), height: cropContainer.height(), showControls:'never', maxZoom: 2})
            .on('cropbox',$scope.resultHandler);

        $scope.crop = cropContainer.data('cropbox');
    };

    $scope.resultHandler = function( event, results, img ) {
        dataService.cropDataUrl = img.getDataURL();

        $timeout(function(){
            $state.go('canvas')
        },100)

    }

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
    $scope.complete = function( ) {
//        $scope.crop.complete();
        dataService.cropDataUrl = $scope.cropPlugin.cropCurrentZone();
        $timeout(function(){
            $state.go('canvas')
        },100)
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
                        minHeight: clientHeight / 3,
                        minWidth: clientWidth / 3,
                        ratio: clientWidth / clientHeight
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

