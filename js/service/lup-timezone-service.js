"use strict";
angular.module('LUP').
service('TimezoneSrvc', function($q, RequestSrvc) {
	
	var TimezoneSrvc = this;
	
	TimezoneSrvc.CACHE = null;
	
	TimezoneSrvc.withTimezones = function() {
		console.log('TimezoneSrvc.withTimezones()');
		if (TimezoneSrvc.CACHE) {
			return $q.resolve(TimezoneSrvc.CACHE);
		}
		return RequestSrvc.sendGWF('Date', 'Timezones').then(function(response) {
			console.log('TimezoneSrvc.withTimezones() response', response);
			TimezoneSrvc.CACHE = response.data.data;
			return TimezoneSrvc.CACHE;
		});
	};
	
	TimezoneSrvc.withTimezoneFor = function(user) {
		if (user.user_timezone > 1) {
			return $q.resolve(user);
		}
		let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		let data = { timezone: tz, submit: 1 };
		return RequestSrvc.sendGWF('Date', 'TimezoneDetect', data).then(function(response) {
			console.log('TimezoneSrvc.withTimezoneFor()', user);
			user.JSON.timezone = response.data.tz_id;
			return user;
		}, function(e) {
			alert(e);
		});
	};
	
	return TimezoneSrvc;
});
