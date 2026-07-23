"use strict";
angular.module('LUP').config(function($routeProvider) {
	$routeProvider.when('/settings', {
		templateUrl: 'js/pages/settings/lup-settings.html?v='+window.LUP_BUILD,
		controller: 'SettingsCtrl',
		params: {
			authCheck: true,
		},
	});
;
}).controller('SettingsCtrl', function($scope, $translate, SettingsSrvc, ErrorSrvc) {

	$scope.data.title = 'TITLE_SETTINGS';
	
	$scope.init = function() {
		if ($scope.data.authenticated) {
			console.log('SettingsCtrl.init()');
			$scope.data.user = window.GWF_USER;
			$scope.initial = {};
			$scope.initSetting('friend_who');
			$scope.initSetting('friends_show');
			$scope.initSetting('gallery_acl');
			$scope.initSetting('lup_course_visible');
			$scope.initSetting('profile_visibility');
		}
	};
	
	$scope.initSetting = function(key) {
		var setting = SettingsSrvc.setting(key);
		console.log(setting);
		var value = setting['selected'];
		console.log("init " + key + " to ", value);
		$scope.initial[key] = $scope.data[key] = value;
	};
	
	$scope.changeSetting = function(key) {
		console.log('SettingsCtrl.changeSetting()', key, $scope.data[key]);
		SettingsSrvc.changeSetting(key, $scope.data[key])['catch'](function(gwsMessage){
			console.log($scope.initial[key]);
			$scope.data[key] = $scope.initial[key];
			ErrorSrvc.showError(gwsMessage, 'Settings');
		});
	};
	
	$scope.$on('lup-inited', $scope.init);
	$scope.$on('$viewContentLoaded', $scope.init);
});
