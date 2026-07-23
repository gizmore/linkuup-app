'use strict';
angular.module('LUP').
factory('RequestInterceptor', function($q, $injector) {
	var ErrorSrvc;
	return {
		'request': function(config) {
			  return config;
		},
		'requestError': function(rejection) {
	        if (!ErrorSrvc) { ErrorSrvc = $injector.get('ErrorSrvc'); }
	        console.log(rejection);
			ErrorSrvc.showNetworkError(rejection.data.error);
			return $q.reject(rejection);
		},
		'response': function(response) {
			return response;
		},
		'responseError': function(rejection) {
	        if (!ErrorSrvc) { ErrorSrvc = $injector.get('ErrorSrvc'); }
	        console.log(rejection);
			let code = rejection.status;
			let msg = rejection.data.error;
			if (!msg) {
				msg = rejection.data.topResponse.error;
			}
			if (!msg && (code == 404)) {
				ErrorSrvc.show404Error("File not found: " + rejection.config.url);
			}
//			if ((code == 403)) {
//			}
//			else if (code == 404) {
//				ErrorSrvc.show404Error("File not found: " + rejection.config.url);
//			}
//			else {
	if (msg)
				ErrorSrvc.showServerError(msg);
//			}
			return $q.reject(rejection);
		}
	};
}).
config(function($httpProvider) {  
	$httpProvider.interceptors.push('RequestInterceptor');
});
