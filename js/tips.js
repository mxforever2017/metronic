
define(function (require) {

    var ko = require('knockout');
    var box = require('cab/box');
    var tree = require('jp/tooltips');

    ko.bindingHandlers.tips = {
        init: function (element, valueAccessor, allBindingsAccessor) {

            var settings = ko.utils.unwrapObservable(valueAccessor());

            var isShow = true;
            if (settings.show != undefined) {
                isShow = settings.show;
            }

            if (isShow) {
                $(element).pt({
                    position: 't', // 默认属性值
                    align: 'c',	   // 默认属性值
                    width: 'auto',
                    height: 'auto',
                    time: 500,
                    content: settings.content
                });
            }
        },
        update: function (element, valueAccessor, allBindingsAccessor) {

        }
    };
});