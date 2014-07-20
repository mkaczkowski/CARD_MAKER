'use strict';
var mySharedService = angular.module('sioWebApp.common').factory('dataService', function(configuration) {

//	var LOG = logger.getInstance('mySharedService')

    var dataService = {};

    dataService.defaultData = {
        name: "",
        hp: 30,
        species : "",
        type:'water',
        length:'',
        weight:'',
        url:'',
        att1_name : "",
        att1_info : "",
        att1_value : "",
        att1_type : "",
        att1_amt : "",
        att2_name : "",
        att2_info : "",
        att2_value : "",
        att2_type : "",
        att2_amt : "",
        weakness_type : "",
        weakness_amt : "",
        resistance_type: "",
        resistance_amt:  "",
        retreat_amt : "",
        flavor:  "",
        illustrator: "",
        hasAttack2: false,
        hasOther: false,
        hasRetreat: false,
        hasResistance: false,
        hasWeakness: false,
        hasAttack1: false,
        hasAdditional:false
    };

    dataService.data = angular.copy(dataService.defaultData);
    dataService.pictureDataUrl = null;
    dataService.cropDataUrl = null;
    dataService.preparedDataUrl = null;

    if(!configuration.isProd){
        dataService.cropDataUrl = "data/background.jpg";
    }



    return dataService;
});
