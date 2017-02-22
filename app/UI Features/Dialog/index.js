define(function (require) {
	var ko = require("knockout");
	var $ = require("jquery");
	var dialog = require("plugins/dialog");
	
	
	var Index = function () {
		var self = this;
		
		self.showMessage = function () {
			dialog.showMessage('showMessage');
		};
		
	};
	
	return new Index();
});
