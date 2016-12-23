define(function(require) {
	var $ = require('jquery');
	var ko = require("knockout");
	var editor = require("cab/editor");
	
	var Index = function () {
		var self = this;
		self.title = ko.observable('XHEDITOR');
		self.content = ko.observable('XHEDITOR');
	};
	
	return new Index();
	
});