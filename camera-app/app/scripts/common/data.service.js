'use strict';
var mySharedService = angular.module('sioWebApp.common').factory('dataService', function(configuration) {

//	var LOG = logger.getInstance('mySharedService')

    var dataService = {};

	dataService.pictureDataUrl = null;
	dataService.cropDataUrl = null;
	dataService.alteredDataUrl = null;

	if(!configuration.isProd){
		dataService.cropDataUrl = "data/background.jpg";
	}



    return dataService;
});
