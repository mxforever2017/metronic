define(function (require) {
    var $ = require("jquery");
    var ko = require("knockout");
    ko.observableArray.fn.find = function (callback) {
        var array = this();
        for (var index = 0; index < array.length; index++) {
            var item = array[index];
            if (callback(item)) {
                return item;
            }
        }
        return undefined;
    };

    ko.observableArray.fn.replace = function (array) {
        if (!$.isArray(array)) {
            return;
        }
        this.removeAll();
        for (var index = 0; index < array.length; index++) {
            this.push(array[index]);
        }
    };

    ko.utils.isEmpty = function (value) {
        return value != undefined && value != null && value != "";
    }

    ko.utils.dateFormat = function (date) {
        if (ko.utils.isEmpty(date)) {
            return "";
        }
        return new Date(date).toLocaleDateString();
    };

    return ko;
});