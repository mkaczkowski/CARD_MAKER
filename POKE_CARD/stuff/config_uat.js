'use strict';
angular.module('sioWebApp.config', [])
		.constant('configuration', {
			name : 'Poke Card Maker',
			title : '',
			buttonBarColor : 'rgba(73, 73, 73, 0.13)',
			hasPapirus: JSON.parse('false'),
			titleColor : '#353535',
			version : '1.0.0',
            marketUrl: 'com.cardapps.poke',
			admobBannerKey : '',
			admobHomeKey : 'ca-app-pub-6869992474017983/9375997553',
			admobSaveKey : 'ca-app-pub-6869992474017983/9375997553',
			admobShareKey: 'ca-app-pub-6869992474017983/9375997553',
			admobBackToHomeKey: 'ca-app-pub-6869992474017983/9375997553',
			isProd: JSON.parse('true'),
			showAds: JSON.parse('true')
		}
);
