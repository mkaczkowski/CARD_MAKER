'use strict';

angular.module('sioWebApp.home').controller('FormCtrl', function ($scope,configuration,logger,$compile, $interval,imageService,sharingService,networkService,
		cameraService,dataService,$state,notificationService, loadingService) {

	var LOG = logger.getInstance('FormCtrl');

	$scope.data = dataService.data;

	$scope.getNumber = function(num) {
		if(parseInt(num)){
			return new Array(parseInt(num));
		}
		else{
			return new Array(0)
		}
	}

	$scope.compileHtml = function(htmlElement, successHanlder){
		var iframe=document.createElement('iframe');
		document.body.appendChild(iframe);
		setTimeout(function(){
			var iframedoc=iframe.contentDocument||iframe.contentWindow.document;
			var container = document.getElementById("container");
			container.appendChild(htmlElement);
			var intervalPromise = $interval(function () {
				console.log("timeout");
				var card = document.getElementById("card");
				if(card){
					console.log("cancel");
					$interval.cancel(intervalPromise);
					iframedoc.body.innerHTML=card.innerHTML;
					container.innerHTML = '';
					html2canvas(iframedoc.body, {
						onrendered: function(canvas) {
							successHanlder(canvas);
							document.body.removeChild(iframe);
						}
					});
				}
			}, 10);
		}, 10);
	}

	$scope.refreshData = function(){
		$scope.data= angular.copy(defaultData);
		$scope.refreshAttack();
	}

	$scope.getPicture = function(){
		LOG.info("getPicture try:"+configuration.isProd);
		if(configuration.isProd) {
			cameraService.getPicture(function(imageData){
				dataService.pictureDataUrl = "data:image/jpeg;base64," + imageData;
				$state.go('crop')
			});
		}else{
			dataService.pictureDataUrl = "data/background.jpg";
			$state.go('crop')
		}
	};

	$scope.loadImage = function(){
		if(configuration.isProd) {
			cameraService.loadImageFromLibrary(function(imageData){
				dataService.pictureDataUrl = imageData;
				$state.go('crop')
			});
		}else{
			dataService.pictureDataUrl = "data/background.jpg";
			$state.go('crop')
		}
	};

	$scope.prepareCard = function(){
		loadingService.show();
		var imgElement = $compile('<card-canvas/>')($scope);
		$scope.compileHtml(imgElement.get(0),function(canvas){
			$scope.compileHtml(imgElement.get(0),function(canvas){
				dataService.preparedDataUrl = canvas.toDataURL();
				$state.go("preview");
			});
		});
	};

	/*$scope.savePic = function(successHandler){
		var imgElement = $compile('<card-canvas/>')($scope);
		$scope.compileHtml(imgElement.get(0),function(canvas){
			if(configuration.isProd){
				imageService.saveCanvasToFile(canvas,
						function(msg){
							if(successHandler){
								successHandler(canvas)
							}else{
								notificationService.savedConfirm(msg,
										function () {$scope.sharePicure()});
							}
						},function(err){
							LOG.error("savePic err:"+err);
							notificationService.showError("Ooops. Something went wrong.")
						});
			}else{
				var dataUrl = canvas.toDataURL();
				window.open(dataUrl);
			}
		})
	};*/

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

	$scope.resetData = function(){
		dataService.data = angular.copy(dataService.defaultData);
		$scope.data = dataService.data;
	}

	$scope.testData = function(){
		$scope.data.name= "dick lover";
		$scope.data.hp= "10";
		$scope.data.species = "cheap porno actor";
		$scope.data.type='water';
		$scope.data.length='5\' 2\"';
		$scope.data.weight='25 lbs.';
		$scope.data.url="data/images/background.jpg";
		$scope.data.att1_name = "swallow";
		$scope.data.att1_info = "I ignored my instincts. And I ignored what I really am. And that won't ever happen again.";
		$scope.data.att1_value = "10";
		$scope.data.att1_type = "fire";
		$scope.data.att1_amt = "2";
		$scope.data.att2_name = "venereal disease";
		$scope.data.att2_info = "the best there is at what I do";
		$scope.data.att2_value = "10";
		$scope.data.att2_type = "water";
		$scope.data.att2_amt = "3";
		$scope.data.weakness_type = "dark";
		$scope.data.weakness_amt = "+10";
		$scope.data.resistance_type= "steel";
		$scope.data.resistance_amt=  "-20";
		$scope.data.retreat_amt = "1";
		$scope.data.flavor=  "Tell me something, Jimmy. Do you even know how to kill me?";
		$scope.data.illustrator=  "Illus. Cartman fat ass";
		$scope.data.hasAttack2= true;
		$scope.data.hasOther= true;
		$scope.data.hasRetreat= true;
		$scope.data.hasResistance=true;
		$scope.data.hasWeakness= true;
		$scope.data.hasAttack1= true;
		$scope.data.hasAdditional=true;
	};

});

angular.module('sioWebApp.home').directive('cardCanvas', function() {
	return {
		restrict: 'E',
		replace:false,
		templateUrl:'views/card.html',
		controller: function($scope, $element){
		},
		link: function(scope, element) {
		}
	};
});
