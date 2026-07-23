"use strict";
/**
 * Model for LUP_RoomVisit GDO.
 */
function LUPRoomVisit(json) {
	console.log('new LUPRoomVisit()', json);
	this.JSON = json;

	this.id = function() { return this.JSON.visit_id; };
	this.roomId = function() { return this.JSON.visit_room; };
	this.userId = function() { return this.JSON.visit_user; };
	this.visited = function() { return this.JSON.visit_at; };
	this.left = function() { return this.JSON.visit_left; };
	
	this.room = function() { return LUPRoomVisit.RoomSrvc.getOrCreate(this.roomId()); };
	this.user = function() { return LUPRoomVisit.UserSrvc.getOrCreate(this.userId()); };
}
