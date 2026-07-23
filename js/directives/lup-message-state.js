"use strict";
angular.module('LUP').
directive('lupMsgState', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'js/directives/lup-message-state.html',
		scope: {
			message: '=',
		},
	};
});
