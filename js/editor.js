
define(function (require) {
    var ko = require('knockout');
//  var box = require('cab/box');
    var units = require('cab/units');
    var editor = require('editor');
    var zh = require('zh');
    var system = require('durandal/system');


    ko.bindingHandlers.editor = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var settings = ko.utils.unwrapObservable(valueAccessor());
            var $element = $(element);

            var editor = $element.xheditor({
                tools: 'Fontface,FontSize,FontColor,|,BackColor,SelectAll,Bold,Italic,Underline,|Align,Img',
                skin: 'o2007blue',
                upImgUrl: 'xup.aspx?immediate=1',
                upBtnText: '上传',
                upMultiple:1,
                upImgExt: 'jpg,jpeg,gif,bmp,png'
            });

            editor.setSource(settings.hehe());

            settings.hehe.subscribe(function () {
                editor.setSource(settings.hehe());
            });

            editor.settings.blur = function () {
                settings.hehe($element.val());
            }
        }
    };

});