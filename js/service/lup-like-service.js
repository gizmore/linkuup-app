"use strict";
angular.module('LUP').
service('LikeSrvc', function(WebsocketSrvc, UserSrvc, ErrorSrvc) {
	
	var LikeSrvc = this;
	
	//////////////////////////
	// --- Like someone --- //
	//////////////////////////
	LikeSrvc.likeUser = function(user) {
		console.log('LikeSrvc.likeUser()', user);
		var gwsMessage = new GWS_Message().cmd(0x1130).sync().write32(user.id());
		return WebsocketSrvc.sendBinary(gwsMessage).
			then(LikeSrvc.likedUser.bind(LikeSrvc, user.id()), 
					LikeSrvc.likeError);
	};
	
	LikeSrvc.likedUser = function(userId, gwsMessage) {
		console.log('LikeSrvc.likedUser()', gwsMessage.dump());
		UserSrvc.withUser(userId, true);
	};
	
	LikeSrvc.likeError = function(response) {
		console.log('LikeSrvc.likeError()', response);
		ErrorSrvc.websocketMaybeJSONError(response);
	};
	
	///////////////////////
	// --- Like list --- //
	///////////////////////
	LikeSrvc.getLikeList = function(user, page) {
		console.log('LikeSrvc.getLikeList()', user, page);
		var gwsMessage = new GWS_Message().cmd(0x1133).sync().write32(user.id()).write16(page);
		return WebsocketSrvc.sendBinary(gwsMessage);
	};
	
	return LikeSrvc;
});
