'use strict';
function LUP_Query(user) {
	this.user = user;
	this.messages = [];

	console.log('new LUP_Query()', this);
	
	this.id = function() { return this.user.id(); };
	
	this.addMessage = function(message) {
		console.log('LUP_Query.addMessage()', message);
		if (this.messages.indexOf(message) == -1) {
			this.messages.unshift(message);
		}
//		this.syncToDevice();
	};
	
	this.addNewMessage = function(message) {
		console.log('LUP_Query.addNewMessage()', message);
		if (this.messages.indexOf(message) == -1) {
			this.messages.push(message);
		}
	};
	
	this.lastMessage = function() {
		var l = this.messages.length;
		return l ? this.messages[l-1] : LUP_QueryMessage.blank();
	};
	
	this.firstMessage = function() {
		var l = this.messages.length;
		return l ? this.messages[0] : LUP_QueryMessage.blank();
	};
	
	this.lastDate = function() {
		return this.lastMessage().sent();
	};
	
	this.firstDate = function() {
		return this.firstMessage().sent();
	};
	
	this.lastText = function() {
		return this.lastMessage().text();
	};
	
	this.unreadCount = function() {
		var unread = 0;
		for (var i in this.messages) {
			unread += this.messages[i].readMyself() ? 0 : 1;
		}
		console.log('LUP_Query.unreadCount()', unread);
		return unread;
	};
	
//	//////////////////
//	// --- Sync --- //
//	//////////////////
//	this.syncToDevice = function() {
//		console.log('LUP_Query.syncToDevice()');
//		
//		var msgs = [];
//		for (var i in this.messages) {
//			msgs.push(this.syncMessage(this.messages[i]));
//		}
//		
//		LUP_Query.StorageSrvc.set('query_' + this.user.id(), msgs);
//		
//	};
//	
//	this.syncMessage = function(message) {
//		console.log('LUP_Query.syncMessage()', message);
//		return message.JSON;
//	}
//	
//	this.initFromStorage = function() {
//		console.log('LUP_Query.restoreFromStorage()');
//		var msgs = LUP_Query.StorageSrvc.get('query_' + this.user.id())||[];
//		for (var i in msgs) {
//			var messageData = msgs[i];
//			var message = new LUP_QueryMessage(messageData);
//			this.messages.push(message);
//		}
//	};

}
