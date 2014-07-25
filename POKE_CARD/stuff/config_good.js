'use strict';
angular.module('sioWebApp.config', [])
		.constant('configuration', {
			name : 'Card Maker',
			title : '',
			buttonBarColor : 'rgba(73, 73, 73, 0.13)',
			hasPapirus: JSON.parse('false'),
			titleColor : '#353535',
			version : '1.1.0',
            marketUrl: 'com.cardapps.poke',
			admobBannerKey : '',
			admobHomeKey : 'ca-app-pub-9064255794056383/4000924357',
			admobSaveKey : '',
			admobShareKey: '',
			admobBackToHomeKey: '',
			isProd: JSON.parse('true'),
			showAds: JSON.parse('true')
		}
);