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
		
		self.myFunction = function () {
			console.log($(this));
		};
		
		self.activate = function() {
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
					moduleId: "ko/index",
					nav: 2,
					route: "modal_index",
					title: "Buttons"
				},{
					moduleId: "ko/index",
					nav: 3,
					route: "modal_index",
					title: "Enhanced Modals"
				},{
					moduleId: "ko/index",
					nav: 3,
					route: "modal_index",
					title: "Tabs & Accordions"
				},{
					moduleId: "ko/index",
					nav: 3,
					route: "modal_index",
					title: "jQuery UI Components"
				},{
					moduleId: "ko/index",
					nav: 3,
					route: "modal_index",
					title: "Sliders"
				},{
					moduleId: "ko/index",
					nav: 3,
					route: "modal_index",
					title: "Tiles"
				},{
					moduleId: "ko/index",
					nav: 3,
					route: "modal_index",
					title: "Typography"
				},{
					moduleId: "ko/index",
					nav: 3,
					route: "modal_index",
					title: "Tree View"
				},{
					moduleId: "ko/index",
					nav: 3,
					route: "modal_index",
					title: "Nestable List"
				},]
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
		self.logout = function () {
			localStorage.removeItem('isLogin');
			window.location.href = '/';
		};
		self.compositionComplete = function(child) {
			metronic.init();
		};
	};

	return new Shell();
});