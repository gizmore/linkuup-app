"use strict";
angular.module('LUP').config(function($routeProvider) {
	$routeProvider.when('/course/:id', {
		templateUrl: 'js/pages/course/lup-course.html?v='+window.LUP_BUILD,
		controller: 'CourseCtrl',
		params: {
			authCheck: true,
		},
	});
}).controller('CourseCtrl', function($scope, $routeParams,
		UserSrvc, CourseSrvc, RoomSrvc, ErrorSrvc) {

	$scope.data.title = 'TITLE_COURSE';
	
	$scope.data.courseUser = GWF_User.ghost();
	$scope.data.course = [];
	
	$scope.init = function() {
		console.log('CourseCtrl.init()', $routeParams.id);
		if ($scope.data.authenticated) {
			$scope.loadCourses($routeParams.id);
		}
	};
	
	$scope.loadCourses = function(userId) {
		console.log('CourseCtrl.loadCourses()', userId);
		$scope.data.courseUser = GWF_User.ghost();
		$scope.data.course = [];
		UserSrvc.withUser(userId).then($scope.loadedUser);
	};
	
	$scope.loadedUser = function(user) {
		console.log('CourseCtrl.loadedUser()', user);
		$scope.data.courseUser = user;
		CourseSrvc.getCourse(user).then(
				$scope.loadedCourse,
				ErrorSrvc.websocketMaybeJSONError);
	};
	
	$scope.loadedCourse = function(gwsMessage) {
		console.log('CourseCtrl.loadedCourse()', gwsMessage);
		while(gwsMessage.hasMore()) {
			var visit = {
				room: RoomSrvc.getOrCreate(gwsMessage.read32()),
				visit_count: gwsMessage.read32(),
				visit_last: gwsMessage.read32(),
			};
			$scope.data.course.push(visit);
		}
	};

	$scope.$on('lup-inited', $scope.init);
	$scope.$on('$viewContentLoaded', $scope.init);

});
