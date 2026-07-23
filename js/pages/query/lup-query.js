"use strict";
angular.module('LUP').config(function($routeProvider) {
	$routeProvider.when('/query/:id', {
		templateUrl: 'js/pages/query/lup-query.html?v='+window.LUP_BUILD,
		controller: 'QueryCtrl',
		params: {
			authCheck: true,
		},
	});
}).controller('QueryCtrl', function($scope, $rootScope, $routeParams,
		UserSrvc, ChatSrvc, WebsocketSrvc) {
	
	$scope.data.title = 'TITLE_QUERY';
	$scope.data.me = window.GWF_USER;
	$scope.data.message = '';
	
	$scope.data.scrollPoint = null;
	
	$scope.ChatSrvc = ChatSrvc; // Plug ChatSrvc into view
	
	$scope.init = function() {
		console.log('QueryCtrl.init()', $routeParams.id);
		if ($scope.data.authenticated) {
			$scope.data.me = window.GWF_USER;
			UserSrvc.withUser($routeParams.id).then($scope.loadedUser);
		}
	};
	
	$scope.loadedUser = function(user) {
		console.log('QueryCtrl.loadedUser()', user);
		$scope.data.user = user;
		$scope.data.chat = ChatSrvc.forUser(user);
		setTimeout(function(){
			$scope.initScrollHandlers();
			$scope.loadMoreMessages();
//			$scope.data.scrollPoint = null;
		});
	};
	
	$scope.loadMoreMessages = function() {
		console.log('QueryCtrl.loadMoreMessages()');
		var element = $scope.getList();
		$scope.data.scrollPoint = ( element && (element.scrollHeight == element.clientHeight) ) ? element.scrollHeight : null;
		ChatSrvc.loadMoreMessages($scope.data.chat).then($scope.loadedMoreMessages);
	};

	$scope.loadedMoreMessages = function(chat) {
		console.log('QueryCtrl.loadedMoreMessages()', chat, $scope.data.scrollPoint);
		if ($scope.data.scrollPoint === null) {
//			$scope.data.scrollPoint = 0;
			window.setTimeout(function(){
				$scope.scrollToBottom();
				if (chat) {
					$scope.eventuallyLoadMore();
				}
			});
		}
		else {
			if (chat) {
				window.requestAnimationFrame(function(){
					var element = $scope.getList();
					if (!element) {
						setTimeout(function(){
							var element = $scope.getList();
							element.scrollTop = element.scrollHeight - $scope.data.scrollPoint;
						});
					}
					else {
						var element = $scope.getList();
						element.scrollTop = element.scrollHeight - $scope.data.scrollPoint;
					}
				});
			}
		}
	};
	
	$scope.eventuallyLoadMore = function() {
		console.log('QueryCtrl.eventuallyLoadMore()');
		var element = $scope.getList();
		console.log(element.scrollHeight, element.clientHeight);
		if (element.scrollHeight == element.clientHeight) {
//			$scope.data.scrollPoint = null;
			$scope.loadMoreMessages();
		}
	};
	
	$scope.initScrollHandlers = function() {
		console.log('QueryCtrl.initScrollHandlers()');
		var $ = window.jQuery;
		$('#lup-query-list-'+$scope.data.user.id()).
			scroll($scope.onScroll).
			bind('touchstart click', $scope.onScroll);
	};
	
	/**
	 * Load more messages when scrolling up.
	 */
	$scope.onScroll = function() {
		var element = $scope.getList();
		console.log('QueryCtrl.onScroll()', element.scrollTop, element.scrollHeight, element.clientHeight);
		if (element.scrollHeight > element.clientHeight) {
			if (element.scrollTop <= 5) {
				$scope.loadMoreMessages();
			}
		}
	};

	$scope.scrollToMessage = function(message) {
		console.log('QueryCtrl.scrollToMessage()', message);
	};
	
	$scope.getList = function() {
		return window.document.getElementById('lup-query-list-'+$scope.data.user.id());
	};

	$scope.scrollToBottom = function() {
		console.log('QueryCtrl.scrollToBottom()');
		var element = $scope.getList();
		if (element.scrollHeight >= element.clientHeight) {
			element.scrollTop = element.scrollHeight - element.clientHeight;
		}
	};

	$scope.sendMessage = function() {
		console.log('QueryCtrl.sendMessage()', $scope.data.user, $scope.data.message);
		if($scope.data.message){
			ChatSrvc.sendQuery($scope.data.user, $scope.data.message);
		}
		jQuery('.chatbottom input').val('');
		jQuery('.chatbottom button').removeClass('sendmessage');
		$scope.data.message = null;
	};
		
	$scope.onMessageRead = function(lupMessage) {
		console.log('QueryCtrl.onMessageRead()', lupMessage);
		ChatSrvc.updateReadState(lupMessage).then(function(queryMessage){
			console.log('HERE');
		});
	};
	
	////////////////////
	// --- Events --- //
	////////////////////
	$rootScope.$on('lup-query-message', function(event, message){
		setTimeout($scope.scrollToBottom);
	});

	$scope.$on('lup-inited', $scope.init);
	$scope.$on('$viewContentLoaded', $scope.init);
});
