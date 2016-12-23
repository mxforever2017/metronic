

define(function (require) {

    var ko = require('knockout'),
        box = require('cab/box');

    ko.bindingHandlers.showImage = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

            var options = ko.utils.unwrapObservable(valueAccessor());

            var vId = options.Id,
                vType = options.Type,
                vWidth = options.Width || 400,
                vHeight = options.Height || 300;
            box.getBaseUrl(function (p) {
                var vUrl = p + 'showimg.aspx?Id=' + vId + '&Type=' + vType + '&__t=' + Math.random();
                $(element).attr("src", vUrl);
            });
        }
    };
});