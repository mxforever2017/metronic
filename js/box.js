
define(function (require) {

    // 依赖模块
    var ko = require('knockout');
    var dialog = require('plugins/dialog');
    var bootstrap = require('bootstrap');
    var http = require('cab/http');
    var md5 = require('jp/jQuery.md5');

    var isShowMessage = true; // 是否显示消息，防止多次弹出消息，默认为显示.

    // 确认对话框
    var _confirm = function (pMessage, pTitle) {
        var org_t = pTitle || '确认';

        var m = '<div class="message_box">'
                       + '<div class="icon"><img width="50" src="img/mbox/warning.png" /></div>'
                       + '<table class="info"><tr><td valign="center">'
                       + '<div style="max-height:120px;word-break:break-all;overflow-y:auto;">' + pMessage + '</div>'
                       + '</td></tr></table>'
                       + '</div>';

        var t = '<i class="icon-tag"></i>&nbsp;' + org_t;
        return dialog.showMessage(m, t, ['确认', '取消']);
    };

    var _info = function (pMessage, pTitle, pCallBack) {
        var org_t = pTitle || '信息';

        var m = '<div class="message_box">'
                       + '<div class="icon"><img width="50" src="img/mbox/info.png" /></div>'
                       + '<table class="info"><tr><td valign="center">'
                       + '<div style="max-height:120px;word-break:break-all;overflow-y:auto;">' + pMessage + '</div>'
                       + '</td></tr></table>'
                       + '</div>';

        var t = '<i class="icon-tag"></i>&nbsp;' + org_t;
        return dialog.showMessage(m, t);
    };

    var _error = function (pMessage, pTitle) {
        var org_t = pTitle || '错误';

        var m = '<div class="message_box">'
                       + '<div class="icon"><img width="50" src="img/mbox/error.png" /></div>'
                       + '<table class="info"><tr><td valign="center">'
                       + '<div style="max-height:120px;word-break:break-all;overflow-y:auto;">' + pMessage + '</div>'
                       + '</td></tr></table>'
                       + '</div>';

        var t = '<i class="icon-tag"></i>&nbsp;' + org_t;
        return dialog.showMessage(m, t);
    };

    var _success = function (pMessage, pTitle) {
        var org_t = pTitle || '成功';

        var m = '<div class="message_box">'
                       + '<div class="icon"><img width="50" src="img/mbox/success.png" /></div>'
                       + '<table class="info"><tr><td valign="center">'
                       + '<div style="max-height:120px;word-break:break-all;overflow-y:auto;">' + pMessage + '</div>'
                       + '</td></tr></table>'
                       + '</div>';

        var t = '<i class="icon-tag"></i>&nbsp;' + org_t;
        return dialog.showMessage(m, t);
    };

    var _warning = function (pMessage, pTitle) {
        var org_t = pTitle || '警告';

        var m = '<div class="message_box">'
                       + '<div class="icon"><img width="50" src="img/mbox/warning.png" /></div>'
                       + '<table class="info"><tr><td valign="center">'
                       + '<div style="max-height:120px;word-break:break-all;overflow-y:auto;">' + pMessage + '</div>'
                       + '</td></tr></table>'
                       + '</div>';

        var t = '<i class="icon-tag"></i>&nbsp;' + org_t;
        return dialog.showMessage(m, t);
    };

    var _show = function (pObj) {
        return dialog.show(pObj);
    };

    var _close = function (pObj, pData) {
        if (pData != undefined) {
            return dialog.close(pObj, pData);
        }
        return dialog.close(pObj);
    };

    // AJAX失败回调
    var _failed = function (jqXHR, textStatus, message) {
        var vMessage = jqXHR.responseText,
            vStatusCode = jqXHR.status;
        if (vStatusCode == 300) {
            _error(vMessage); //服务器错误
        } else if (vStatusCode == 400) {
            location.href = 'login.html'; // 未登陆
        } else if (vStatusCode == 250) {
            _info(vMessage); // 业务提示
        } else if (vStatusCode == 0) {
            location.href = 'login.html'; // 未登陆
        } else if (vStatusCode == 600) {
            _info('服务未授权！');
        } else {
            _warning(vMessage); // 其它错误
        }
    };

    // 数据呼叫
    var _call = function (pApiUrl, pData, pSuccess) {
        http.post(pApiUrl, pData).then(function (result) {
            pSuccess(result);
        }).fail(_failed);
    };

    // 数据呼叫
    var _upload = function (pApiUrl, pData, pFilePath, pSuccess) {
        setTimeout(function () {
            http.upload(pApiUrl, pData, pFilePath).then(function (result) {
                pSuccess(result);
            }).fail(_failed);
        }, 1);
    };

    // 注销退出
    var _logout = function () {
        _call('Logoff', {});
    };

    // 得到当前用户
    var _getCurrentMember = function (pSuccess) {
        _call('CurrentUser', {}, pSuccess);
    };

    // 得到api根路径
    var _getBaseUrl = function (pSuccess) {
        _call('BaseUrl', {}, pSuccess);
    };

    // 得到签章服务器路径
    var _getSignServerUrl = function (pSuccess) {
        _call('SignServerUrl', {}, pSuccess);
    };

    var _containArray = function (pArray, pVal) {
        for (var i = 0, len = pArray.length; i < len; i++) {
            if (pArray[i] == pVal) {
                return true;
            }
        }
        return false;
    };

    var _windowDialog = function (pFile, pTitle) {
        if (!pFile) {
            _info('没有要打开的文件！'); return;
        }
        if (pFile.Id <= 0) {
            _info('保存后才可以进行在线查看/编辑！'); return;
        }
        var vOfficeType = ['doc', 'docx', 'xlsx', 'xls'];
        if (_containArray(vOfficeType, pFile.Type)) {
            // 办公类型的文档直接在线预览
            var swidth = screen.width - 10;
            var sheight = screen.height - 70;
            var vWinOptions = 'dialogWidth:' + swidth + 'px;';
            vWinOptions += 'dialogHeight:' + sheight + 'px;';
            vWinOptions += 'status:no;scroll:no;resizable:yes;center:yes';
            window.showModalDialog('officeEdit.aspx?id=' + pFile.Id, pTitle, vWinOptions);
        } else {
            // 其它类型的(图片、文本、压缩文件等)查看或下载
            window.open(pFile.Url);
        }
    };

    var _syncCipher = function (account, oldCipher, newCipher) {
        //alert('账号：' + account + '原密码：' + oldCipher + '新密码：' + newCipher);
        //http.syncCipher('SignSync/Password', {
        //    username: 'admin',
        //    passwordOld: $.md5('ntko111111'),
        //    passwordNew: $.md5('ntko111111')
        //}).then(function (result) {
        //    //alert(result);
        //}).fail(_failed);
    };

    var box = {
        syncCipher: _syncCipher,
        windowDialog: _windowDialog,
        getCurrentMember: _getCurrentMember,
        logout: _logout,
        call: _call,
        upload: _upload,
        confirm: _confirm,
        info: _info,
        error: _error,
        success: _success,
        warning: _warning,
        show: _show,
        close: _close,
        getBaseUrl: _getBaseUrl,
        getSignServerUrl: _getSignServerUrl
    };

    return box;
});