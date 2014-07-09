'use strict';
angular.module('sioWebApp.config', [])
		.constant('configuration', {
			name : 'Poke Card',
			barStyle : 'bar-energized',
			version : '1.0.0',
            marketUrl: 'com.cardapps.poke',
			admobBannerKey : '',
			admobInterKey : '',
			admobInter2Key : '',
			isProd: JSON.parse('false')
		}
);
