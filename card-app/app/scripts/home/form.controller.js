'use strict';

/**
 * @ngdoc function
 * @name sioWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sioWebApp
 */
angular.module('sioWebApp.home').controller('FormCtrl', function ($scope,$compile, $interval, $timeout) {

	$scope.data = {
		name: "megamoth name",
		species : "some species pmonster",
		type:'fire',
		cost_type: 'fire',
		cost_amt: '2',
		cost_type2: 'fire',
		cost_amt2: '4'
	}

	$scope.getNumber = function(num) {
		return new Array(parseInt(num));
	}

	$scope.savePic = function(){
		var imgElement = $compile('<card-canvas/>')($scope);
		$scope.compileHtml(imgElement.get(0),function(canvas){
			var dataUrl = canvas.toDataURL();
			window.open(dataUrl);
		})
	};

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
