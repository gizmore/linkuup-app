"use strict";
angular.module('LUP').
service('CourseSrvc', function($q, WebsocketSrvc, TypeSrvc, ErrorSrvc) {
	
	var CourseSrvc = this;
	
	CourseSrvc.getCourse = function(user) {
		console.log('CourseSrvc.getCourse()', user);
		var gwsMessage = new GWS_Message().cmd(0x1160).sync();
		gwsMessage.write32(user.id());
		return WebsocketSrvc.sendBinary(gwsMessage);
	};
	
	CourseSrvc.getCourseAllowed = function(user) {
		console.log('CourseSrvc.getCourseAllowed()', user);
		var gwsMessage = new GWS_Message().cmd(0x1162).sync();
		gwsMessage.write32(user.id());
		return WebsocketSrvc.sendBinary(gwsMessage);
	};
	
	return CourseSrvc;
});
