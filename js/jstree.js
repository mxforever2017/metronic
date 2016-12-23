
define(function (require) {

    var ko = require('knockout');
    var box = require('cab/box');
    var units = require('cab/units');
    var tree = require('jp/jstree/jstree');
    var system = require('durandal/system');
    
    function bindJsTree($element, pData, pSelect) {
        $element.on("changed.jstree", function (e, data) {
            var i, j, r = [];
            for (i = 0, j = data.selected.length; i < j; i++) {
                r.push({ id: data.instance.get_node(data.selected[i]).id, name: data.instance.get_node(data.selected[i]).text });
            }
            pSelect(r);
        });
        $element.jstree(pData);
    };

    ko.bindingHandlers.tree_api = {
        init: function (element, valueAccessor, allBindingsAccessor) {

            var settings = ko.utils.unwrapObservable(valueAccessor());
            var multiple = true;
            var isCheck = true;
            var plugins = [];
            if (settings.multiple != undefined) {
                multiple = settings.multiple;
            }
            if (settings.isCheck != undefined) {
                isCheck = settings.isCheck;
            }
            if (isCheck) {
                plugins = ['checkbox'];
            }

            box.call(settings.api, settings.api_data, function (result) {
                
                var data = {
                    'core': {
                        'multiple': multiple,
                        'data': units.arrayToTree(result, 'id', 'parentid')
                    },
                    'plugins': plugins
                }
                bindJsTree($(element), data, settings.select);
            });
        },
    };

    ko.bindingHandlers.tree = {
        init: function (element, valueAccessor, allBindingsAccessor) {

            var settings = ko.utils.unwrapObservable(valueAccessor());
            if (ko.isObservable(settings.data)) {
                bindJsTree($(element), settings.data(), settings.select);
            } else {
                bindJsTree($(element), settings.data, settings.select);
            }
        },
        update: function (element, valueAccessor, allBindingsAccessor) {

        }
    };

});