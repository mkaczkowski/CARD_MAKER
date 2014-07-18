'use strict';
var mySharedService = angular.module('sioWebApp.common').factory('mySharedService', function($rootScope, $compile) {

//	var LOG = logger.getInstance('mySharedService')

	var sharedService = {};

	sharedService.isInited = false;
	sharedService.elementData = {
		scope: null,
		id: null,
		src: null,
		x:0,
		y:0,
		posX : 0,
		posY : 0,
		lastPosX : 0,
		lastPosY : 0,
		bufferX : 0,
		bufferY : 0,
		scale : 1,
		last_scale : 1,
		rotation : 0,
		last_rotation : 0,
		dragReady : 0,
		isMirror:false,
		opacity: 1,
		brightness: 1
	}

	sharedService.currentElement = {};
	sharedService.currentElementData = {};
	sharedService.elements = {};

	sharedService.elementsCount = function() {
		return Object.keys(sharedService.elements).length;
	}

	sharedService.init = function() {

		var options = {
			transform_always_block: true,
			transform_min_scale: 1,
			drag_block_horizontal: true,
			drag_block_vertical: true,
			drag_min_distance: 0
		};

		angular.element("#draggableContainer").hammer(options).on('touch drag dragend transform transformend', function(ev) {
			if(angular.element(ev.target).is( "button" )){
				return true;
			}

			if(!ev.gesture){
				return;
			}

			ev.gesture.preventDefault();

			if(ev.gesture.target.id == "draggableContainer" || ev.gesture.target.id == "fullscreenContainer"){
				sharedService.prepForBroadcast(null);
				return;
			}

			if(ev.type == "touch"){
				sharedService.currentElement = ev.gesture.target;
				sharedService.currentElementData = sharedService.getElement(angular.element(sharedService.currentElement).attr("data-id"));
			}

			manageMultitouch(ev,sharedService.currentElement,sharedService.currentElementData);
		});

		if(sharedService.isInited){
			sharedService.restoreElements();
			return;
		}

		sharedService.isInited = true;
	};

	function manageMultitouch(ev,elementObj,elementData) {
		var transform;
		switch (ev.type) {
			case 'touch':
				break;
			case 'drag':
				elementData.posX = ev.gesture.deltaX + elementData.lastPosX;
				elementData.posY = ev.gesture.deltaY + elementData.lastPosY;
				transform = "translate(" + elementData.posX + "px," + elementData.posY + "px)";
				transform += "rotate(" + elementData.last_rotation + "deg) ";
				transform += "scale(" + (elementData.isMirror ? -elementData.last_scale : elementData.last_scale) + "," + elementData.last_scale + ")";
				break;
			case 'transform':
				elementData.rotation = elementData.last_rotation + ev.gesture.rotation;
				elementData.scale = Math.max(0.4, Math.min(elementData.last_scale * ev.gesture.scale, 5));
				transform = "translate(" + elementData.lastPosX + "px," + elementData.lastPosY + "px) ";
				transform += "rotate(" + elementData.rotation + "deg) ";
				transform += "scale(" + (elementData.isMirror ? -(elementData.scale) : elementData.scale) + "," + elementData.scale + ")";
				break;
			case 'transformend':
				elementData.last_scale = elementData.scale;
				elementData.last_rotation = elementData.rotation;
				break;
			case 'dragend':
				elementData.lastPosX = elementData.posX;
				elementData.lastPosY = elementData.posY;
				break;
		}

		sharedService.applyTransform(elementObj,transform)
	}

	sharedService.applyTransform = function (elementObj, transform) {
		if(transform){
			elementObj.style.transform = transform;
			elementObj.style.oTransform = transform;
			elementObj.style.msTransform = transform;
			elementObj.style.mozTransform = transform;
			elementObj.style.webkitTransform = transform;
		}
	}

	sharedService.applyOpacity = function (elementObj, value) {
		if(value){
			elementObj.style.opacity = value;
			elementObj.style.oOpacity = value;
			elementObj.style.msOpacity = value;
			elementObj.style.mozOpacity = value;
			elementObj.style.webkitOpacity = value;
			elementObj.style.filter = 'alpha(opacity='+(value*100)+')';
		}
	}

	sharedService.applyBrightness = function (elementObj, value) {
		if(value){
			elementObj.style.webkitFilter = "brightness("+(value*100)+"%)";
			elementObj.style.filter = "brightness("+(value*100)+"%)";
		}
	}

	sharedService.addElement = function (element, scope) {

		var newData = JSON.parse(JSON.stringify(sharedService.elementData));
		newData.scope = scope;
		newData.x = scope.left;
		newData.y = scope.top;
		newData.src = scope.src;
		newData.opacity = parseFloat(scope.alpha);
		newData.id  = makeid();
		sharedService.elements[newData.id] = newData;
		element.css({top:scope.top,left:scope.left});

		sharedService.applyOpacity(element.get(0),newData.opacity);

		var newElement = element.get(0);
		sharedService.currentElement = newElement;
		sharedService.currentElementData = newData;

		element.attr("data-id",newData.id);

		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for( var i=0; i < 5; i++ )
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			return text;
		}
	};


	sharedService.getElement = function (element) {
		return sharedService.elements[element];
	};

	sharedService.prepForBroadcast = function(msg) {
		this.message = msg;
		this.broadcastItem();
	};

	sharedService.broadcastItem = function() {
		$rootScope.$broadcast('handleBroadcast');
	};

	sharedService.moveUp = function(){
		$rootScope.$broadcast('moveUp');
	};

	sharedService.moveDown = function(){
		$rootScope.$broadcast('moveDown');
	};

	sharedService.mirror = function(){
		sharedService.currentElementData.isMirror = !sharedService.currentElementData.isMirror;
		var transform = "translate(" + sharedService.currentElementData.lastPosX + "px," + sharedService.currentElementData.lastPosY + "px) ";
		transform += "rotate(" + sharedService.currentElementData.last_rotation + "deg) ";
		transform += "scale(" + (sharedService.currentElementData.isMirror ? -sharedService.currentElementData.last_scale : sharedService.currentElementData.last_scale) + "," + sharedService.currentElementData.last_scale + ")";
		sharedService.applyTransform(sharedService.currentElement,transform);
	};

	sharedService.changeOpacity = function(value){
		sharedService.currentElementData.opacity = value;
		sharedService.applyOpacity(sharedService.currentElement, value);
	};

	sharedService.changeBrightness = function(value){
		sharedService.currentElementData.brightness = value;
		sharedService.applyBrightness(sharedService.currentElement, value);
	};

	sharedService.removeElement = function(){
//		console.log("elements pre:"+sharedService.elementsCount())
		delete sharedService.elements[angular.element(sharedService.currentElement).attr("data-id")];
//		console.log("elements post:"+sharedService.elementsCount())
		$rootScope.$broadcast('removeElement');
		this.prepForBroadcast(null);
	};

	sharedService.clearAll = function() {
		sharedService.elements = {};
//		console.log("elements clear all:"+sharedService.elementsCount())
		var fullScreenContainer = document.getElementById('fullscreenContainer')
		if(fullScreenContainer){
			fullScreenContainer.src = "";
		}

		this.prepForBroadcast(null);
		$rootScope.$broadcast('clearAll');
		angular.element(".drag-and-drop").remove();
	};

	sharedService.resetElement = function(){
		sharedService.currentElementData = JSON.parse(JSON.stringify(sharedService.elementData));
		sharedService.elements[angular.element(sharedService.currentElement).attr("data-id")] = sharedService.currentElementData;
		var transform = "translate(" + sharedService.currentElementData.lastPosX + "px," + sharedService.currentElementData.lastPosY + "px) ";
		transform += "rotate(" + sharedService.currentElementData.rotation + "deg) ";
		transform += "scale(" + sharedService.currentElementData.scale + "," + sharedService.currentElementData.scale + ")";
		sharedService.applyTransform(sharedService.currentElement, transform);
	};

	sharedService.restoreElement = function(element, dataId){
		var data = 	sharedService.elements[dataId];
		element.css({top:data.y,left:data.x});
		element.attr("data-id",dataId);

		var transform = "translate(" + data.lastPosX + "px," + data.lastPosY + "px) ";
		transform += "rotate(" + data.last_rotation + "deg) ";
		transform += "scale(" + (data.isMirror ? -data.last_scale : data.last_scale) + "," + data.last_scale + ")";
		sharedService.applyTransform(element.get(0), transform);
        sharedService.applyOpacity(element.get(0),data.opacity);
        sharedService.applyBrightness(element.get(0),data.brightness);
	};

	sharedService.restoreElements = function(){
		var containerElement = angular.element(document.getElementById('draggableContainer'));
		angular.forEach(Object.keys(sharedService.elements),function(key){
			var value = sharedService.elements[key];
			var newElement = $compile('<draggable-item id="'+value.id+'" src="'+value.src+'" top="'+value.y+'px" left="'+value.x+'px"/>')(value.scope);
			containerElement.append(newElement);
		})
	}

	sharedService.message;
	return sharedService;
});

angular.module('sioWebApp.common').directive("draggableItem", function (mySharedService) {
	return {
		restrict: 'E',
		template: '<img class="drag-and-drop" data-ng-src="{{src}}" style="padding: 8px;max-height: 100%;max-width: 100%;position: absolute;z-index: 2">',
		replace: true,
		piority: 10000,
		scope: {
			id:  '@',
			src:  '@',
			alpha: '@',
			top:  '@',
			left: '@'
		},
		controller: function($scope, $element, mySharedService){
			$scope.isSelected = true;
			mySharedService.prepForBroadcast($element);

			$scope.safeApply = function(fn) {
				var phase = this.$root.$$phase;
				if(phase == '$apply' || phase == '$digest') {
					if(fn && (typeof(fn) === 'function')) {
						fn();
					}
				} else {
					this.$apply(fn);
				}
			};
		},
		link: function (scope, element) {
			scope.$on('handleBroadcast', function() {
				var tmpIsSelected = (mySharedService.message == element);
				var needRefresh = tmpIsSelected != scope.isSelected;
				scope.isSelected = tmpIsSelected;

				scope.safeApply();
				if(needRefresh){
					verifyBorder();
				}
			});

			scope.$on('removeElement', function() {
				if(scope.isSelected){
					element.remove();
				}
			});

			scope.$on('moveUp', function() {
				if(scope.isSelected){
					var zIndex = parseInt(element.css( "zIndex"));
					element.css( "zIndex", zIndex+1 );
				}
			});

			scope.$on('moveDown', function() {
				if(scope.isSelected){
					var zIndex = parseInt(element.css( "zIndex"));
					if(zIndex == 0) return;
					element.css( "zIndex", zIndex-1  );
				}
			});

			var verifyBorder = function(){
				var imgElement = element;
				if(!scope.isSelected){
					imgElement.removeClass("selectedDraggable").css("border","3px dashed rgba(182, 182, 182, 0)");
				}else{
					imgElement.addClass("selectedDraggable").css("border","3px dashed rgba(182, 182, 182, 1)");
				}
			}

			element.bind('click touchstart', function (event) {
				mySharedService.prepForBroadcast(element);
			})

			if(scope.id){
				mySharedService.restoreElement(element,scope.id);
			}else{
				mySharedService.addElement(element, scope);
				verifyBorder();
			}
		}
	};
})

angular.module('sioWebApp.common').directive('carousel', function($compile) {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<div class="myCarousel" style="width: 100%; height: {{height}}" ng-transclude></div>',
		scope: {
			path : '@',
			height : '@'
		},
		link: function(scope, element) {

			element.owlCarousel({
				jsonPath : scope.path,
				jsonSuccess : customDataSuccess,
				singleItem: false,
				lazyLoad : true,
				navigation : true,
				pagination: false,
				items : 4
			});

			function customDataSuccess(data){
				var content = "";
				for(var i in data["items"]){
					var width = data["items"][i].width;
					var height = data["items"][i].height;
					var img = data["items"][i].img;
					var fullscreen = data["items"][i].fullscreen;
					var alpha = (data["items"][i].alpha ? data["items"][i].alpha : 1);
					var ext = ".png";//data["items"][i].ext;
					var path = img + ext;
					var thumb = img +".min" + ext;
					content += "<div class='item item-light' style='padding: 7px; height: 69px;line-height: 69px;text-align: center;'><img class='thumb-img' style='max-width: 100%; max-height: 100%;' data-width='"+width+"' data-height='"+height+"' src='"+path+"' data-alpha='"+alpha+"' data-fullscreen='"+(fullscreen == true)+"' ></div>";
				}
				element.html(content);
				applyHandlers();
			}

			function applyHandlers() {
				angular.element(".thumb-img").bind('click', function (event) {
					var targetElement = angular.element(event.target);
					var widthAttr = parseInt(targetElement.attr("data-width"));
					var heightAttr = parseInt(targetElement.attr("data-height"));
					var fullscreen = JSON.parse(targetElement.attr("data-fullscreen"));
					var alpha = parseFloat(targetElement.attr("data-alpha"));
					var srcAttr = targetElement.attr("src");

					var containerElement;
					if(fullscreen){
						containerElement = angular.element(document.getElementById('fullscreenContainer'));
						containerElement.attr("src",srcAttr);
					}else{
						containerElement = angular.element(document.getElementById('draggableContainer'));
						var offsetTop = (containerElement.height() - heightAttr - 56)/2;
						var offsetLeft = (containerElement.width() - widthAttr)/2;
						var newElement = $compile('<draggable-item id="" src="'+srcAttr+'" alpha="'+alpha+'" top="'+offsetTop+'px" left="'+offsetLeft+'px"/>')(scope);
						containerElement.append(newElement);
					}
				})
			}
		}
	};
});