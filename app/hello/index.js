define( function (require) {
	var $ = require('jquery');
	var metronic = require('metronic');
	var appIndex = require('index');
	var Index = function() {
		var self = this;
		self.activate = function () {
			
		};
		self.compositionComplete = function (child) {
			appIndex.init();
			appIndex.initCalendar();
			appIndex.initDashboardDaterange();
		};
	};
	
	return Index;
});
