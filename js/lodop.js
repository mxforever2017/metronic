

define(function (require) {

    /*
          本函数根据浏览器类型决定采用哪个页面元素作为Lodop对象：
          IE系列、IE内核系列的浏览器采用pObject，
          其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用pEmbed,
          如果页面没有相关对象元素，则新建一个或使用上次那个,避免重复生成。
          64位浏览器指向64位的安装程序 install_lodop64.exe。
    */
    var that = this;

    that.strHtmInstall = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='lib/lodop/install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    that.strHtmUpdate = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='lib/lodop/install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    that.strHtm64_Install = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='lib/lodop/install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    that.strHtm64_Update = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='lib/lodop/install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    that.strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
    that.strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";

    that.isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
    that.is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);

    that.getLodop = function (pObject, pEmbed) {

        var lodop;
        var message = '';

        if (that.isIE) {
            lodop = pObject;
        }
        else {
            lodop = pEmbed;
        }

        // 判断Lodop插件是否安装过，没有安装或版本过低就提示下载安装
        if ((lodop == null) || (typeof (lodop.VERSION) == "undefined")) {

            if (navigator.userAgent.indexOf('Chrome') >= 0) {
                message = strHtmChrome + message;
            }
            if (navigator.userAgent.indexOf('Firefox') >= 0) {
                message = strHtmFireFox + message;
            }
            if (that.is64IE) {
                message = strHtm64_Install;
            } else {
                if (that.isIE) {
                    message = strHtmInstall;
                }
                else {
                    message = strHtmInstall + message;
                }
            }
            return { lodop: lodop, message: message };
        } else {
            if (lodop.VERSION < "6.1.9.3") {
                if (that.is64IE) {
                    message = strHtm64_Update;
                }
                else {
                    if (isIE) {
                        message = strHtmUpdate;
                    } else {
                        message = strHtmUpdate + message;
                    }
                }
                return { lodop: lodop, message: message };
            };
        }

        return { lodop: lodop, message: message };
    };


    return that.getLodop;
});

