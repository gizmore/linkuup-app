"use strict";
angular.module('LUP').
service('LogoSrvc', function() {
	var LogoSrvc = this;

	LogoSrvc.display = function(room, size) {
		console.log('LogoSrvc.display()', room, size);
	};
	
	return LogoSrvc;
});
