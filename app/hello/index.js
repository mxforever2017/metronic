define( function (require) {
	var $ = require('jquery');
	var Index = function() {
		var self = this;
		self.activate = function () {
			
		};
		self.compositionComplete = function (child) {
			$('.make-switch').bootstrapSwitch();
		};
	};
	return Index;
});
