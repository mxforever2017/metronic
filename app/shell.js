define(function(require) {
	var ko = require("knockout");
	var router = require("plugins/router");
	var $ = require('jquery');
	var metronic = require("metronic");

	var buildMap = function(array, map) {
		for(var i = 0; i < array.length; i++) {
			map.push(array[i]);
			if(typeof array[i].children == "object") {
				buildMap(array[i].children, map);
			}
		}
	};

	var findHome = function(map) {
		for(var i = 0; i < map.length; i++) {
			var home = map[i];
			if(home.moduleId != "") {
				return home;
			}
		}
	};

	var Shell = function() {
		var self = this;
		self.username = ko.observable("");
		self.copyright = ko.observable("");
		self.keyword = ko.observable("");
		self.router = router;
		self.menus = ko.observableArray([]);

		self.activate = function() {
			if(localStorage.getItem("isLogin") == null) {
				location.href = "../login.html"
			}
			var menu = [{
				moduleId: "hello/index",
				nav: 1,
				route: "head_desktop",
				title: "Dashboard"
			}, {
				moduleId: "",
				nav: 0,
				route: "#",
				title: "UI Features",
				children: [{
					moduleId: "UI Features/General/index",
					nav: 1,
					route: "general",
					title: "General"
				}, {
					moduleId: "UI Features/XHEDITOR/index",
					nav: 1,
					route: "xheditor",
					title: "Xheditor"
				}, {
					moduleId: "UI Features/Bootstrap Sweet Alerts/index",
					nav: 1,
					route: "ui_sweetalert",
					title: "Bootstrap Sweet Alerts"
				}, {
					moduleId: "UI Features/Dialog/index",
					nav: 1,
					route: "dialog",
					title: "Dialog"
				}]
			}];
			self.username('蜡笔小新');
			self.copyright('xiaoxin@shnnosuke.com');
			self.menus(menu);
			var map = [];
			buildMap(menu, map);
			var home = findHome(map);
			map.push({
				route: '',
				title: home.title,
				moduleId: home.moduleId,
				nav: home.nav
			});
			router.map(map).buildNavigationModel();
			return router.activate();
		};
		self.logout = function() {
			localStorage.removeItem('isLogin');
			window.location.href = '/';
		};
		self.compositionComplete = function(child) {
			metronic.init();
		};
	};
	return new Shell();
});