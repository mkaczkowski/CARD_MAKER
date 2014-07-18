'use strict';
angular.module('sioWebApp.config', [])
		.constant('configuration', {
			name : 'Otaku Camera',
			title : '',
			buttonBarColor : 'rgba(73, 73, 73, 0.13)',
			hasPapirus: JSON.parse('false'),
			titleColor : '#353535',
			version : '1.0.0',
            marketUrl: 'com.camapps.otaku',
			admobBannerKey : 'ca-app-pub-9064255794056383/6738371552',
			admobHomeKey : 'ca-app-pub-9064255794056383/6459169952',
			admobSaveKey : 'ca-app-pub-9064255794056383/9691837951',
			admobShareKey: 'ca-app-pub-9064255794056383/2168571153',
			admobBackToHomeKey: 'ca-app-pub-9064255794056383/3645304353',
			isProd: JSON.parse('true'),
			showAds: JSON.parse('true')
		}
);
