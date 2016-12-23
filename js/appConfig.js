
define(function (require) {

    var $ = require('jquery'),
        ko = require('knockout'),
        spin = require('jp/spin');


    //前提：所有ajax请求都是用jquery的$.ajax发起的，而非原生的XHR；
    var spinner = new spin({ color: '#5B6984' });
    var ajaxBack = $.ajax;
    var ajaxCount = 0;
    var allAjaxDone = function () {
        if (spinner)
            spinner.stop();
        $('#loading_mask').hide();
    };
    //一行代码，就可以知道所有ajax请求什么时候结束
    //由于get/post/getJSON等，最后还是调用到ajax，因此只要改ajax函数即可
    $.ajax = function (setting) {
        if (ajaxCount == 0) {
            $('#loading_mask').show();
            spinner.spin($('#loading_mask')[0]);
        }
        ajaxCount++;
        var cb = setting.complete;
        setting.complete = function () {
            setTimeout(function () {
                if ($.isFunction(cb)) { cb.apply(setting.context, arguments); }
                ajaxCount--;
                if (ajaxCount == 0 && $.isFunction(allAjaxDone)) {
                    allAjaxDone();
                }
            }, 0);

        }
        return ajaxBack(setting);
    };

    // 只读绑定
    ko.bindingHandlers.readonly = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var setting = ko.utils.unwrapObservable(valueAccessor());
            $(element).attr('readonly', setting);
        }
    };

    // 只读与禁用情况下，对于文本框、密码框、多行文本框禁用回退键
    $(document).on('keydown.cab', function (evt) {
        var b = !!evt;
        var oEvent = evt || window.event;
        var node = b ? oEvent.target : oEvent.srcElement;

        if (oEvent.keyCode == 8) {
            var reg = /^(input|textarea)$/i;
            var regType = /^(password|text|textarea)$/i;
            if (!reg.test(node.nodeName) || !regType.test(node.type) || node.readOnly || node.disabled) {
                return false;
            }
        }
    });

    $(document).on('keydown', 'input,select,button', function (e) {

        if (e.keyCode == 13) {
            if (document.activeElement.type == 'textarea') {
                return;
            }
            if (document.activeElement.type != 'button' && document.activeElement.type != 'submit') {
                focunnext();
                return false;
            }
        }
    });

    function checkobjvisual(e) {

        var objvis = false;

        if (e) {
            if (e.offsetHeight > 0) {
                objvis = true;
            }
            if (e.offsetTop > 0) {
                objvis = true;
            }
            if (e.readOnly == true) {
                objvis = false;
            }
            if (e.disabled == true) {
                objvis = false;
            }
        }

        return objvis;
    };

    function focunnext(next_id) {

        var code;
        if (!e) {
            var e = window.event;
        }
        if (e.keyCode) {
            code = e.keyCode;
        } else if (e.which) {
            code = e.which;
        }

        if (code == 13) {
            if (next_id) {
                document.getElementById(next_id).focus();
            } else {

                var inputList = $('input,select,button');

                var nextindex = -1;
                for (var i = 0; i < inputList.length; i++) {
                    if (inputList[i] == document.activeElement) {

                        var acobj = document.activeElement;
                        nextindex = i + 1;

                        while ((!checkobjvisual(inputList[nextindex])) && (nextindex <= inputList.length)) {
                            nextindex = nextindex + 1;
                        }
                        if (inputList[nextindex]) {
                            inputList[nextindex].focus();
                        }
                        break;
                    }
                }
            }
        }
    };

    $(document).on('mouseenter', '.pagegrid tbody tr', function () {
        $(this).addClass('hover');
    }).on('mouseleave', '.pagegrid tbody tr', function () {
        $(this).removeClass('hover');
    });

    /* 拖拽支持 */
    var M = false;
    var Rx, Ry;
    var $target;
    var $modalHost;

    $(document).on('mousedown', function (event) {
        // 触发当前事件的源对象 target 是 火狐下的属性 srcElement是IE下的属性，chrome同时拥有
        var target = event ? event.target : event.srcElement;

        if ($(target).hasClass('modal-header') || $(target).parent().hasClass('modal-header')) {
            // 拖动区域
            $target = $(target);
            $modalHost = $(target).hasClass('modal-header') ? $(target).parent().parent() : $(target).parent().parent().parent();
            Rx = event.pageX - (parseInt($modalHost.css("left")) || 0);
            Ry = event.pageY - (parseInt($modalHost.css("top")) || 0);
            $(target).css('cursor', 'move');
            M = true;
            if ($modalHost.setCapture) {
                $modalHost.setCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
        }
    });

    $(document).on('mouseup', function (event) {
        if ($target && $modalHost) {
            M = false;
            $target.css('cursor', 'default');
            if ($modalHost.releaseCapture) {
                $modalHost.releaseCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            $target = null;
            $modalHost = null;
        }
    });

    $(document).on('mousemove', function (event) {
        if ($target && $modalHost) {
            if (M) {
                $modalHost.css({ top: event.pageY - Ry, left: event.pageX - Rx });
            }
        }
    });

    // 对string的扩展，将 Date类型的字符串 转化为指定格式的String 
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    // 例子： 
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
    String.prototype.dateformat = function (fmt) {
        var that = this;
        var date = new Date(that.replace(/-/ig, '/'));
        var o = {
            "M+": date.getMonth() + 1,                 //月份 
            "d+": date.getDate(),                    //日 
            "H+": date.getHours(),                   //小时 
            "m+": date.getMinutes(),                 //分 
            "s+": date.getSeconds(),                 //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds()             //毫秒 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    Date.prototype.format = function (fmt) {
       
        var o = {
            "M+": this.getMonth() + 1,                 //月份 
            "d+": this.getDate(),                    //日 
            "h+": this.getHours(),                   //小时 
            "m+": this.getMinutes(),                 //分 
            "s+": this.getSeconds(),                 //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds()             //毫秒 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
});