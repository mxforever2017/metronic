define(function (require) {
    var $ = require("jquery");
    var ko = require("knockout");
    var app = require("durandal/app");

    var Login = function () {
        var self = this;
        self.copyright = ko.observable("");
        
        self.user = {
            username: ko.observable("").extend({required: {params: true, message: "请输入用户帐号"}}),
            password: ko.observable("")
        };
        self.errors = ko.validation.group(self.user);
        self.login = function () {
        	if (self.errors.length == 0) {
        		if (self.user.username() == "admin" && self.user.password() == "admin") {
	            	app.setRoot("shell","entrance")
	            }
        	}
            
        };
        self.compositionComplete = function (child) {
            $('.login-form input').keypress(function (e) {
                if (e.which == 13) {
                    self.login();
                }
            });
        };
    };
    return new Login();

});