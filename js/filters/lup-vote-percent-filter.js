"use strict";
angular.module('LUP').filter('votePercent', function() {
	return function(input) {
		return sprintf('%d%%', (input - 0) / 5 * 100);
	};
});
