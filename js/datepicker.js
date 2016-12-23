
define(function (require) {

    var ko = require('knockout');
    var datepicker = require('datepicker');

    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, viewModel) {
            var settings = ko.utils.unwrapObservable(valueAccessor());
            var $element = $(element);
            $element.attr("class", "date");

            var vReadonly = false;
            var vDateFmt = 'yyyy-MM-dd';

            if (ko.isObservable(settings.readonly)) {
                vReadonly = settings.readonly();
            } else {
                vReadonly = settings.readonly;
            }

            if (ko.isObservable(settings.dateFmt)) {
                vDateFmt = settings.dateFmt();
            } else {
                vDateFmt = settings.dateFmt;
            }
            if (vDateFmt == undefined) {
                vDateFmt = 'yyyy-MM-dd';
            }
            if (vReadonly != undefined && vReadonly) {
                $element.attr('readonly', true);
            } else {
                $element.focus(function () {
                    WdatePicker({
                        isShowClear: false, readOnly: false, dateFmt: vDateFmt
                    });
                });
            }

            if (settings.value() == '' || settings.value() == undefined) {
                $element.val('');
            } else {
                $element.val(settings.value().dateformat(vDateFmt));
            }

        },
        update: function (element, valueAccessor, viewModel) {
            var settings = ko.utils.unwrapObservable(valueAccessor());
            var $element = $(element);

            var vReadonly = false;
            var vDateFmt = 'yyyy-MM-dd';

            if (ko.isObservable(settings.readonly)) {
                vReadonly = settings.readonly();
            } else {
                vReadonly = settings.readonly;
            }

            if (ko.isObservable(settings.dateFmt)) {
                vDateFmt = settings.dateFmt();
            } else {
                vDateFmt = settings.dateFmt;
            }
            if (vDateFmt == undefined) {
                vDateFmt = 'yyyy-MM-dd';
            }
            if (vReadonly != undefined && vReadonly) {
                $element.attr('readonly', true);
            }
            if (settings.value() == '' || settings.value() == undefined) {
                $element.val('');
            } else {
                $element.val(settings.value().dateformat(vDateFmt));
            }
            $element.blur(function () {
                valueAccessor().value($element.val());
            });
        }
    };
});