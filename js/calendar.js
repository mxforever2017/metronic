
define(function (require) {

    var ko = require('knockout');
    require('jp/fullcalendar/fullcalendar');

    ko.bindingHandlers.fullcalendar = {
        init: function (element, valueAccessor, allBindingsAccessor) {

            var options = ko.utils.unwrapObservable(valueAccessor());

            setTimeout(function () {

                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();

                $(element).fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,basicWeek,basicDay'
                    },
                    editable: true,
                    events: [
                        {
                            title: '流程调试',
                            start: new Date(y, m, 1)
                        },
                        {
                            title: '流程演示',
                            start: new Date(y, m, 1)
                        },
                        {
                            title: '流程上线',
                            start: new Date(y, m, 2)
                        },
                        {
                            title: '测试修复政务管理收发文流程',
                            start: new Date(y, m, d - 5),
                            end: new Date(y, m, d - 2)
                        },
                        {
                            id: 999,
                            title: 'Repeating Event',
                            start: new Date(y, m, d - 3, 16, 0),
                            allDay: false
                        },
                        {
                            id: 999,
                            title: 'Repeating Event',
                            start: new Date(y, m, d + 4, 16, 0),
                            allDay: false
                        },
                        {
                            title: 'Meeting',
                            start: new Date(y, m, d, 10, 30),
                            allDay: false
                        },
                        {
                            title: 'Lunch',
                            start: new Date(y, m, d, 12, 0),
                            end: new Date(y, m, d, 14, 0),
                            allDay: false
                        },
                        {
                            title: 'Birthday Party',
                            start: new Date(y, m, d + 1, 19, 0),
                            end: new Date(y, m, d + 1, 22, 30),
                            allDay: false
                        }
                    ]
                });

            }, 1);

        }
    };

});