
define(function (require) {

    var $ = require('jquery'),
        box = require('cab/box'),
        ko = require('knockout'),
        webupload = require('webupload'),
        spin = require('jp/spin');

    ko.bindingHandlers.upload = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var setting = ko.utils.unwrapObservable(valueAccessor());
            var files = setting.files; // 文件列表编号
            var sid = setting.sid; // 选择按钮编号
            var ratio = window.devicePixelRatio || 2, // 优化retina, 在retina下这个值是2
                uploader,
                spinner;

            uploader = webupload.create({
                auto: true, // 自动上传。
                swf: 'lib/webupload/Uploader.swf',  // swf文件路径
                server: 'upload.ashx', // 文件接收服务端。
                pick: '#' + sid,
                compress: false
            });
            // 当有文件添加进来的时候
            uploader.on('fileQueued', function (file) {
                spinner = new spin({ color: '#5B6984' }).spin($('#loading_mask')[0]);
                $('#loading_mask').show();
            });
            // 文件上传过程中创建进度条实时显示。
            uploader.on('uploadProgress', function (file, percentage) {

            });
            // 文件上传成功，给item添加成功class, 用样式标记上传成功。
            uploader.on('uploadSuccess', function (file, resporse) {
                if (resporse.code == 0) {
                    resporse.name;
                    resporse.type;
                    resporse.result;
                    files.push({ Id: 0, Name: resporse.name, Type: resporse.type, Url: resporse.result });
                } else {
                    box.info(resporse.result);
                }
            });
            // 文件上传失败，现实上传出错。
            uploader.on('uploadError', function (file) {

            });
            // 完成上传完了，成功或者失败，先删除进度条。
            uploader.on('uploadComplete', function (file) {
                spinner.stop();
                $('#loading_mask').hide();
                uploader.removeFile(file);
            });

        }
    };

});