define(function(require) {
	var $ = require("jquery");
	var ko = require("knockout");
	var app = require("durandal/app");
	var router = require("plugins/router");
	var proxy = require("proxy");
	var backstretch = require("jquery-plugins/jquery.backstretch.min");
	var uniform = require("jquery-plugins/jquery.uniform.min");

	var Login = function() {
		var self = this;
		self.copyright = ko.observable("xiaoxin@shnnosuke.com");
		self.user = {
			username: ko.observable("").extend({
				required: {
					params: true,
					message: "Username is required"
				}
			}),
			password: ko.observable("").extend({
				required: {
					params: true,
					message: "Password is required"
				}
			})
		};
		self.registerUser = {
			username: ko.observable("").extend({
				required: {
					params: true,
					message: "Username is required"
				}
			}),
			password: ko.observable("").extend({
				required: {
					params: true,
					message: "Password is required"
				}
			}),
			email: ko.observable("").extend({
				required: {
					params: true,
					message: "email is required"
				}
			}),
			repassword: ko.observable("").extend({
				required: {
					params: true,
					message: "repassword is required"
				}
			})
		}
		self.errors = ko.validation.group(self.user);
		self.registererrors = ko.validation.group(self.registerUser);
		self.login = function() {
			if(self.errors().length == 0) {
				if(self.user.username() == 'admin' || self.user.password() == 'admin') {
					localStorage.setItem('isLogin', true);
					router.deactivate();
					app.setRoot("shell", "entrance");
				}
			} else {
				self.errors.showAllMessages();
			}
		};
		self.register = function() {
			if(self.registererrors().length == 0) {
				
			} else {
				self.registererrors.showAllMessages();
			}
		};
		self.registerShow = function() {
			$('.login-form').hide();
			$('.register-form').show(500);
		};
		self.registerHide = function() {
			$('.login-form').show(500);
			$('.register-form').hide();
		};
		self.forgotPassShow = function() {
			$('.login-form').hide();
			$('.forget-form').show(500);
		};
		self.forgotPassHide = function() {
			$('.login-form').show(500);
			$('.forget-form').hide();
		};
		
		self.compositionComplete = function(child) {
			var $this = $(child);
			$(".checkboxes", $this).uniform();
			$('.login-form input').keypress(function(e) {
				if(e.which == 13) {
					self.login();
				}
			});
			$.backstretch([
		        "../lib/metronic/image/bg/1.jpg",
		        "../lib/metronic/image/bg/2.jpg",
		        "../lib/metronic/image/bg/3.jpg",
		        "../lib/metronic/image/bg/4.jpg"
		        ], {
		          fade: 1000,
		          duration: 3000
		   		}
		   );
		};
	};
	return new Login();
});