"use strict";
angular.module('LUP').
service('ConfigSrvc', function(RequestSrvc) {
	
	var ConfigSrvc = this;
	ConfigSrvc.CACHE = {
		Account: {},
		Avatar: {},
		Core: {},
		Register: {},
		Recovery: {},
	};
	
	ConfigSrvc.withConfig = function() {
		console.log('ConfigSrvc.withConfig()');
		return RequestSrvc.sendGWF('Core', 'Config').then(ConfigSrvc.gotConfig);
	};
	
	ConfigSrvc.gotConfig = function(config) {
		console.log('ConfigSrvc.gotConfig()', config);
		ConfigSrvc.CACHE = config.data.data;
		return ConfigSrvc.CACHE;
	};
	
	/////////////////
	// Convinience //
	/////////////////
	ConfigSrvc.systemUser = function() {
		var result = ConfigSrvc.CACHE.Core.system_user;
		console.log('ConfigSrvc.systemUser() === ', result);
		return result;
	};

	ConfigSrvc.signupCaptcha = function() {
		var result = ConfigSrvc.CACHE.Register.captcha;
//		console.log('ConfigSrvc.signupCaptcha() === ', result);
		return result;
	};
	
	ConfigSrvc.tosForced = function() {
		var result = ConfigSrvc.CACHE.Register.force_tos;
//		console.log('ConfigSrvc.tosForced() === ', result);
		return result;
	};

	ConfigSrvc.emailActivation = function() {
		var result = ConfigSrvc.CACHE.Register.email_activation;
//		console.log('ConfigSrvc.emailActivation() === ', result);
		return result;
	};
	
	ConfigSrvc.guestAvatars = function() {
		var result = ConfigSrvc.CACHE.Avatar.avatar_guests;
//		console.log('ConfigSrvc.guestAvatars() === ', result);
		return result;
	};
	
	ConfigSrvc.passwordRetype = function() {
		var result = ConfigSrvc.CACHE.Register.signup_password_retype;
		console.log('ConfigSrvc.passwordRetype() === ', result);
		return result;
	};

	ConfigSrvc.recoveryCaptcha = function() {
		var result = ConfigSrvc.CACHE.Recovery.recovery_captcha;
		console.log('ConfigSrvc.recoveryCaptcha() === ', result);
		return result;
	};
	ConfigSrvc.recoveryEmail = function() {
		var result = ConfigSrvc.CACHE.Recovery.recovery_email;
		console.log('ConfigSrvc.recoveryEmail() === ', result);
		return result;
	};
	ConfigSrvc.recoveryLogin = function() {
		var result = ConfigSrvc.CACHE.Recovery.recovery_login;
		console.log('ConfigSrvc.recoveryLogin() === ', result);
		return result;
	};
	
	ConfigSrvc.ipp = function() {
		var result = ConfigSrvc.CACHE.Table.ipp_http;
		console.log('ConfigSrvc.ipp() === ', result);
		return result;
	};
	
	ConfigSrvc.singleACL = function() {
		var result = ConfigSrvc.CACHE.Profile.profile_single_acl;
		console.log('ConfigSrvc.singleACL() === ', result);
		return result;
	};
	
	/////////////
	// Account //
	/////////////
	ConfigSrvc.realname = function() {
		var result = ConfigSrvc.CACHE.Account.allow_real_name;
//		console.log('ConfigSrvc.realname() === ', result);
		return result;
	};
	
	ConfigSrvc.emailChange = function() {
		var result = ConfigSrvc.CACHE.Account.allow_email_change;
		console.log('ConfigSrvc.emailChange() === ', result);
		return result;
	};

	ConfigSrvc.emailFormatChange = function() {
		var result = ConfigSrvc.CACHE.Account.allow_email_fmt_change;
		console.log('ConfigSrvc.emailFormatChange() === ', result);
		return result;
	};

	ConfigSrvc.guestSettings = function() {
		var result = ConfigSrvc.CACHE.Account.allow_guest_settings;
		console.log('ConfigSrvc.guestSettings() === ', result);
		return result;
	};
	ConfigSrvc.countryChange = function() {
		var result = ConfigSrvc.CACHE.Account.allow_country_change;
		console.log('ConfigSrvc.countryChange() === ', result);
		return result;
	};
	ConfigSrvc.languageChange = function() {
		var result = ConfigSrvc.CACHE.Account.allow_lang_change;
		console.log('ConfigSrvc.languageChange() === ', result);
		return result;
	};
	ConfigSrvc.birthdayChange = function() {
		var result = ConfigSrvc.CACHE.Account.allow_birthday_change;
		console.log('ConfigSrvc.birthdayChange() === ', result);
		return result;
	};
	ConfigSrvc.genderChange = function() {
		var result = ConfigSrvc.CACHE.Account.allow_gender_change;
		console.log('ConfigSrvc.genderChange() === ', result);
		return result;
	};

	return ConfigSrvc;
});
