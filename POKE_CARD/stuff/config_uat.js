'use strict';
angular.module('sioWebApp.config', [])
		.constant('configuration', {
			name : 'Card Maker',
			title : '',
			buttonBarColor : 'rgba(73, 73, 73, 0.13)',
			hasPapirus: JSON.parse('false'),
			titleColor : '#353535',
			version : '1.0.0',
            marketUrl: 'com.cardapp.poke',
			admobBannerKey : '',
			admobHomeKey : '',
			admobSaveKey : '',
			admobShareKey: '',
			admobBackToHomeKey: '',
			isProd: JSON.parse('true'),
			showAds: JSON.parse('false')
		}
);
