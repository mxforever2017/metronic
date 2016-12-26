define(function(require) {
	var ko = require("knockout");
	var $ = require("jquery");
	var bootstrap = require("bootstrap-plugins/bootstrap-sweet-alert/sweetalert");
	
	var Index = function () {
		var self = this;
		
		self.compositionComplete = function() {
			SweetAlert.init();
		};
	};
	
	return new Index();
})