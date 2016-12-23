define(function (require) {

    var $ = require('jquery'),
        ko = require('knockout');
    

    ko.bindingHandlers.upload = {
        init: function (element, valueAccessor, allBindingsAccessor) {

            var settings = ko.utils.unwrapObservable(valueAccessor());
            alert(1);

            

        }
    };

});