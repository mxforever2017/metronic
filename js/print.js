/*
封装IEWebBrowser打印
*/
(function ($) {

    var vPrinter = {
        printing: undefined,
        page: {
            header: "",
            footer: "",
            portrait: false,
            leftMargin: 0.75,
            topMargin: 0.75,
            rightMargin: 0.75,
            bottomMargin: 0.75
        },
        initPrint: function () {
            if (vPrinter.printing == undefined) {
                var vFactory = $("#factory")[0];
                if (vFactory == undefined || vFactory.printing == undefined) {
                    vFactory = $("#factory")[0];
                    if (vFactory == undefined || vFactory.printing == undefined) {
                        alert.info("未找到打印对象!");
                    }
                }
                vPrinter.printing = vFactory.printing;
                vPrinter.printing.header = vPrinter.page.header;
                vPrinter.printing.footer = vPrinter.page.footer;
                vPrinter.printing.portrait = vPrinter.page.portrait;
                vPrinter.printing.leftMargin = vPrinter.page.leftMargin;
                vPrinter.printing.topMargin = vPrinter.page.topMargin;
                vPrinter.printing.rightMargin = vPrinter.page.rightMargin;
                vPrinter.printing.bottomMargin = vPrinter.page.bottomMargin;

                vPrinter.printing.portrait = !vPrinter.printing.portrait;
                vPrinter.printing.portrait = !vPrinter.printing.portrait;
            }
            return vPrinter.printing;
        },
        initFrame: function (pFrame) {
            var vFrame = $("#" + pFrame)[0];
            if (vFrame == undefined) {
                alert.info("未找到打印内容!");
                return undefined;
            }
            vFrame.contentWindow.focus();
            return vFrame;
        },
        doSetup: function (pFrame) {
            var vPrint = vPrinter.initPrint();
            var vFrame = vPrinter.initFrame(pFrame);
            if (vFrame == undefined) {
                return;
            }
            vFrame.ExecWB(8, 1);
        },
        doPreview: function (pFrame) {
            var vPrint = vPrinter.initPrint();
            var vFrame = vPrinter.initFrame(pFrame);
            if (vFrame == undefined) {
                return;
            }
            vFrame.ExecWB(7, 1);
        },
        doPrint: function (pFrame, pDirect) {
            var vPrint = vPrinter.initPrint();
            var vFrame = vPrinter.initFrame(pFrame);
            if (vFrame == undefined) {
                return;
            }
            if (pDirect == true) {
                vFrame.ExecWB(6, 6);
            }
            else {
                vFrame.ExecWB(6, 1);
            }
        }
    };

    $.extend({
        doPrintSteup: function (pFrame) {
            vPrinter.doSetup(pFrame);
        },
        doPrintPreview: function (pFrame) {
            vPrinter.doPreview(pFrame);
        },
        doPrintPrint: function (pFrame, pDirect) {
            vPrinter.doPrint(pFrame, pDirect);
        }
    });
})(jQuery);

function DoBeforePrint() {
    $("#factory")[0].printing.header = ""; //页眉为空
    $("#factory")[0].printing.footer = ""; //页脚为空				
    $("#factory")[0].printing.leftMargin = 0;
    $("#factory")[0].printing.topMargin = 0;
    $("#factory")[0].printing.rightMargin = 0;
    $("#factory")[0].printing.bottomMargin = 0;
    $("#factory")[0].printing.portrait = true;
}
window.onbeforeprint = DoBeforePrint;

var vFactory;

function getFactory() {
    if (vFactory != undefined)
        return vFactory;
    vFactory = $("#factory")[0];
    if (vFactory == undefined || vFactory.printing == undefined) {
        vFactory = $("#factory")[0];
        if (vFactory == undefined || vFactory.printing == undefined) {
            alert.info("未找到打印对象!");
            return undefined;
        }
    }
    return vFactory;
}

function DoSetPrinter() {
    try {
        var vFactory = getFactory();
        if (vFactory == undefined)
            return;
        vFactory.printing.PageSetup();
    } catch (e) {
        alert(e);
    }
}

function DoPrintView() {
    try {
        var vFactory = getFactory();
        if (vFactory == undefined)
            return;
        vFactory.printing.Preview();
    } catch (e) {
        alert(e);
    }
}

function DoPrint() {

    try {
        var vFactory = getFactory();
        if (vFactory == undefined)
            return;
        vFactory.printing.Print(true);
    } catch (e) {
        alert(e);
    }
}


//设置网页打印的页眉页脚为空
function DoSetPageHFInfo() {
    var keyInfo;

    keyInfo = "";
    var vFactory = getFactory();
    if (vFactory == undefined)
        return;
    vFactory.printing.header = keyInfo;
    vFactory.printing.footer = keyInfo;
    vFactory.printing.portrait = true;
}

//设置网页打印的页眉页脚为默认值
function DoSetPageAFInfoToDefault() {
    var hkey_root;
    var hkey_path;
    var hkey_key;

    hkey_root = "HKEY_CURRENT_USER";
    hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";

    try {
        var RegWsh = ActiveXObject("WScript.Shell");

        hkey_key = "header";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "&w&b页码，&p/&P");

        hkey_key = "footer";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "&u&b&d");

    } catch (e) { }
}