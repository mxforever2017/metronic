
define(function (require) {

    var ko = require('knockout');
    var units = require('cab/units');
    var bootstrap = require('bootstrap');

    ko.bindingHandlers.layout = {
        init: function (element, valueAccessor, allBindingsAccessor) {

            var $element = $(element);

            windowLoad($element);

            $(window).on('resize', function () {
                windowLoad($element);
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor) {

        }
    };

    var windowLoad = function ($element) {
        var viewpoint = units.getViewpoint();
        var height = viewpoint.height - 77 - 30;
        $element.height(height);
        $element.find("#menu_child").height(height - 36);
        $element.find("#main_content").height(height - 36);
        $element.find("#main_content").find('.accordion-group').height(height - 36);
    };
});