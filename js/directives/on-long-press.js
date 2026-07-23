//
// - https://gist.github.com/BobNisco/9885852
// - 01.Apr.2018 gizmore@wechall.net added mouse events to support desktop browsers
//
"use strict";
angular.module('LUP')
.directive('onLongPress', function($timeout) {
	return {
		restrict: 'A',
		link: function($scope, $elm, $attrs) {
			$elm.bind('touchstart mousedown', function(evt) {
				// Locally scoped variable that will keep track of the long press
				$scope.longPress = $timeout(function() {
					if ($scope.longPress) {
						$scope.longPress = null;
						// If the touchend event hasn't fired,
						// apply the function given in on the element's on-long-press attribute
						$scope.$apply(function() {
							$scope.$eval($attrs.onLongPress)
						});
					}
				}, 1200);
			});
			$elm.bind('touchend mouseup mouseout', function(evt) {
				// Prevent the onLongPress event from firing
				if ($scope.longPress) {
					$timeout.cancel($scope.longPress);
				}
				$scope.longPress = null;
				// If there is an on-touch-end function attached to this element, apply it
				if ($attrs.onTouchEnd) {
					$scope.$apply(function() {
						$scope.$eval($attrs.onTouchEnd)
					});
				}
			});
		}
	};
});
