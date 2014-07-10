'use strict';
var sioWebApp = angular.module('sioWebApp', [
    'ionic',
    'sioWebApp.config',
    'sioWebApp.mock',
    'sioWebApp.common',
    'sioWebApp.home'
]);

sioWebApp.config(function(loggerProvider,configuration) {
    loggerProvider.enabled(!configuration.isProd);
});

sioWebApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('page1', {
            url: '/1',
            templateUrl: 'views/home.html'
        })
        .state('page2', {
            url: '/2',
            templateUrl: 'views/preview.html'
        });

    $urlRouterProvider.otherwise("/1");
})

sioWebApp.controller('Page3Ctrl', function($scope) {

    })


/*
sioWebApp.controller('AppCtrl', function ($scope,networkService, configuration) {
    $scope.rateUs = function(){
        networkService.openMarketURL(configuration.marketUrl)
    };
});

sioWebApp.run(function($rootScope,configuration,$ionicPlatform,$timeout,logger,admobService,networkService,notificationService) {
	var LOG = logger.getInstance('sioWebApp');
    $rootScope.app = configuration;
	$ionicPlatform.ready(function() {

        LOG.info("$ionicPlatform - ready");
        if(networkService.isOnline()){
            admobService.init();
            admobService.createBanner();
            $timeout(function(){
                admobService.createInterstitial();
            },1000)
        }else{
        }
	});
});

*/
