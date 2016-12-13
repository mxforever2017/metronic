define(function (require) {
    var ko = require("knockout");
    ko.bindingHandlers.readonly = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            return {controlsDescendantBindings: true};
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var $this = $(element);
            var readonly = valueAccessor();
            if (readonly)
                $this.attr("readonly", true);
            else
                $this.removeAttr("readonly");

        }
    };
});
