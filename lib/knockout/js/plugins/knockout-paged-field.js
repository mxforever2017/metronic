define(function (require) {
    var ko = require("knockout");
    ko.bindingHandlers.koPagedField = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            return {controlsDescendantBindings: true};
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var $this = $(element);
            var myViewModel = valueAccessor();
            $this.empty();
            if (typeof myViewModel == "string" || typeof myViewModel == "number") {
                $this.text(myViewModel);
                return;
            }
            if (typeof  myViewModel == "object") {
                var $a = $("<a href='javascript:void(0);'/>")
                $a.text(myViewModel.text);
                $a.click(myViewModel.operate);
                $this.append($a);
            }
        }
    };
});
