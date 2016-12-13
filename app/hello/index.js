define( function (require) {
	var metronic = require('metronic');
	
	var Index = function() {
		self.compositionComplete = function(child) {
			metronic.init();
		};
	};
	
	return new Index();
});
