"use strict";
angular.module('LUP').
/**
 * Helper to store data on the user device.
 * Each key is prefixed with the userId, so multiple accounts can be used.
 */
service('StorageSrvc', function() {
	var StorageSrvc = this;
	
	StorageSrvc.key = function(key) {
		return window.GWF_USER.id() + "_" + key;
	};
	
	StorageSrvc.get = function(key, def) {
		console.log('StorageSrvc.get()', key, def);
		var val = window.localStorage.getItem(StorageSrvc.key(key));
		return val === null ? def : JSON.parse(val);
	};
	
	StorageSrvc.set = function(key, val) {
		console.log('StorageSrvc.set()', key, val);
		if (val === null) {
			return StorageSrvc.remove(key);
		}
		return window.localStorage.setItem(StorageSrvc.key(key), JSON.stringify(val));
	};
	
	StorageSrvc.remove = function(key) {
		console.log('StorageSrvc.remove()', key);
		return window.localStorage.removeItem(StorageSrvc.key(key));
	};
	
	StorageSrvc.flush = function() {
		console.log('StorageSrvc.flush()');
		return window.localStorage.clear();
	};
	
	StorageSrvc.logAllToConsole = function() {
		console.log('StorageSrvc.logAllToConsole()');
		for (var i = 0; i < window.localStorage.length; i++) {
			var key = localStorage.key(i);
		    console.log(key, localStorage.getItem(key));
		}
	};
	
	return StorageSrvc;
});
