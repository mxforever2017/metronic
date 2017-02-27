var utils = function() {

	var self = this;
	self.IsFunction = function(obj) {
		return typeof obj == 'function';
	};
	self.GetKeyCode = function(e) {
		var evt = window.event || e;
		return evt.keyCode ? evt.keyCode : evt.which ? evt.which : evt.charCode;
	};
	self.EnterSubmit = function(e, v) {
		if(self.GetKeyCode(e) == 13) {
			if(self.IsFunction(v)) {
				v();
			}
		}
	};

	// Cookie
	self.getCookieVal = function(offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if(endstr == -1) {
			endstr = document.cookie.length;
		}
		return unescape(document.cookie.substring(offset, endstr));
	}

	// primary function to retrieve cookie by name
	self.getCookie = function(name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while(i < clen) {
			var j = i + alen;
			if(document.cookie.substring(i, j) == arg) {
				return getCookieVal(j);
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if(i == 0) break;
		}
		return null;
	}

	// store cookie value with optional details as needed
	self.setCookie = function(name, value, expires, path, domain, secure) {
		var Days = expires ? 30 : expires; //此 cookie 将被保存 30 天
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) +
			((expires) ? "; expires=" + exp.toGMTString() : "") +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			((secure) ? "; secure" : "");
	}

	// remove the cookie by setting ancient expiration date
	self.deleteCookie = function(name, path, domain) {
		if(getCookie(name)) {
			document.cookie = name + "=" +
				((path) ? "; path=" + path : "") +
				((domain) ? "; domain=" + domain : "") +
				"; expires=Thu, 01-Jan-1970 00:00:01 GMT";

		}
	}

	return {
		GetKeyCode: self.GetKeyCode,
		EnterSubmit: self.EnterSubmit,
		getCookieVal: self.getCookieVal,
		getCookie: self.getCookie,
		setCookie: self.setCookie,
		deleteCookie: self.deleteCookie
	};
};

$(function() {

	var cCipher = utils().getCookie('cipher');
	var cAccount = utils().getCookie('account');
	var cAutologin = utils().getCookie('autologin');

	function login() {
		var self = this;

		self.remberCipher = ko.observable(cCipher != null && cAccount != null);
		self.autoLogin = ko.observable(cAutologin != null);

		self.userName = ko.observable(cAccount == null ? '' : cAccount);
		self.password = ko.observable(cCipher == null ? '' : cCipher);
		self.copyright = ko.observable('xiaoxin@shnnosuke.com');

		if(cAutologin != null) {
			setTimeout(function() {
				self.login();
			}, 1);
		};

		self.login = function() {
			if(self.userName() == undefined || self.userName() == '' || self.userName() == '') {
				alert('账号不能为空!');
				$('#userName').focus();
				return;
			}
			if(self.password() == undefined || self.password() == '') {
				alert('');
				$('#password').focus();
				return;
			}

			if(self.autoLogin()) {
				utils().setCookie("cipher", self.password(), 30);
				utils().setCookie("account", self.userName(), 30);
				utils().setCookie("autologin", 1, 30);
			} else if(self.remberCipher()) {
				utils().setCookie("cipher", self.password(), 30);
				utils().setCookie("account", self.userName(), 30);
				utils().deleteCookie("autologin");
			} else {
				utils().deleteCookie("autologin");
				utils().deleteCookie("cipher");
				utils().deleteCookie("account");
			}
			localStorage.setItem("isLogin",true);
			location.href = 'index.html';
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

	};

	$('#userName').keydown(function(event) {
		if(utils().GetKeyCode(event) == 13) {
			$('#password').focus();
		};
	});
	$('#password').keydown(function(event) {
		utils().EnterSubmit(event, function() {
			$('#btn_login').click();
		});
	});

//	$.backstretch([
//		"lib/metronic/image/bg/1.jpg",
//		"lib/metronic/image/bg/2.jpg",
//		"lib/metronic/image/bg/3.jpg",
//		"lib/metronic/image/bg/4.jpg"
//	], {
//		fade: 1000,
//		duration: 3000
//	});

	ko.applyBindings(login, $('.login-form')[0]);
	ko.applyBindings(login, $('.forget-form')[0]);
	ko.applyBindings(login, $('.register-form')[0]);

	//所有样式名中含有grayTips的input     
	$("input[class*=grayTips]").each(function() {
		var oldVal = '请输入登录账号'; //$(this).val();   //默认的提示性文本
		var val = $(this).val();
		$(this).css({
			"color": val == '请输入登录账号' ? "#888" : "#000"
		}).focus(function() {
			if($(this).val() != oldVal) {
				$(this).css({
					"color": "#000"
				});
			} else {
				$(this).val("").css({
					"color": "#888"
				});
			}
		}).blur(function() {
			if($(this).val() == "") {
				$(this).val(oldVal).css({
					"color": "#888"
				});
			}
		}).keydown(function() {
			$(this).css({
				"color": "#000"
			});
		});
	});

});