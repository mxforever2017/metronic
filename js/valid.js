
define(function (require) {

    var ko = require('knockout');
    var validform = require('jp/validform');
    var toastr = require('cab/toastr');
    
    ko.bindingHandlers.valid = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var settings = ko.utils.unwrapObservable(valueAccessor());
            $(element).Validform({
                tipSweep: true,
                tiptype: function (msg, o, cssctl) {
                    if (!o.obj.is("form")) {
                        // 系统原始提示，在这里进行修改使用自定义的提示错误方式，注释掉它原来的。
                        // var objtip = o.obj.siblings(".Validform_checktip");
                        // cssctl(objtip, o.type);
                        // objtip.text(msg);

                        if (o.type == 3) {
                            //box.info(msg);
                            toastr.error(msg);
                        }
                    }
                },
                datatype: {
                    "*6-20": /^[^\s]{6,20}$/,
                    "z2-4": /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
                    "f2-5": /^\d{2,5}(\.\d{1,2})$/,
                    "date": function (gets, obj, curform, regxp) {
                        var reg = /^(\d{4})(-)(\d{2})\2(\d{2})$/;
                        var r = gets.match(reg);
                        if (r == null) {
                            return false;
                        } else {
                            var d = new Date(r[1], r[3] - 1, r[4]);
                            var newStr = d.getFullYear() + r[2] + (d.getMonth() + 1) + r[2] + d.getDate(),
                                vDate = r[1] + r[2] + ((r[3] - 1) + 1) + r[2] + ((r[4] - 1) + 1);
                            return newStr == vDate;
                        }
                    }
                },
                callback: function () {
                    if (typeof settings.method === 'function') {
                        settings.method();
                    }
                    return false;
                }
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor) {

        }
    };

});