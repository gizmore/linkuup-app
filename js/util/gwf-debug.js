"use strict";
/**
 * Javascript error handler
 */
window.GDO = window.GDO||{};

window.GDO.shortDebugURL = function(url) {
	let pattern = '(' + window.LUP_CONFIG.server;
	pattern += '([^? ]+)[ ?$][^ ]*)';
	pattern = new RegExp(pattern);
	return url.replace(pattern, '$2');
};

window.onerror = function (msg, url, lineNo, columnNo, error) {
	let message = msg + ' in ' + window.GDO.shortDebugURL(url) + ' line ' + lineNo + " column " + columnNo;
	let data = {
		url: location.href + "?" + location.search + '#' + location.hash,
		message: message,
		stack: GDO.shortDebugURL(error.stack),
	};
	console.error(message);
//	fetch()
//	window.GDO.xhr(GDO_WEB_ROOT + 'index.php?_mo=Javascript&_me=Error', 'POST', data);
//	window.GDO.error(message, 'Error');
	return false;
};
