"use strict";
function LUP_Message(time, user, room, messageText, isSystem) {
	console.log('new LUP_Message()', time, user, room, messageText, isSystem);
	
	// Vars
	this.id = 0;
	this.time = time;
	this.user = user;
	this.room = room;
	this.text = messageText;
	this.system = !!isSystem;
	this.sent = true;
	this.delivered = false;
	this.read = user === window.GWF_USER; // Mark messages from yourself as read
	this.otherRead = false;

	// Funcs
	this.isOwnMessage = function() { return (!this.system) && this.user.isSelf(); };
	this.isOtherMessage = function() { return (!this.system) && (!this.user.isSelf()); };
	this.isSystemMessage = function() { return this.system; };
	
}
