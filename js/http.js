
define(function (require) {

    var ko = require('knockout');

    return {
        syncCipher: function (url, data) {
            return $.ajax({
                url: 'syncCipher.ashx',
                data: { api: url, data: ko.toJSON(data) },
                type: 'POST',
                dataType: 'json'
            });
        },
        post: function (url, data) {
            return $.ajax({
                url: 'proxy.ashx',
                data: { api: url, data: ko.toJSON(data) },
                type: 'POST',
                dataType: 'json'
            });
        },
        upload: function (url, data, filePath) {
            return $.ajax({
                url: 'proxy.ashx',
                data: { api: url, Upload: 1, FilePath: filePath, data: ko.toJSON(data) },
                type: 'POST',
                dataType: 'json'
            });
        }
    };
});
