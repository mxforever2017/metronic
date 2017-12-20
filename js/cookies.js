define( function (require) {
    var Cookies;

    var _getCookieVal = function(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if(endstr == -1) {
            endstr = document.cookie.length;
        }
        return unescape(document.cookie.substring(offset, endstr));
    };

    Cookies = {

        // primary function to retrieve cookie by name
        getCookie : function(name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while(i < clen) {
                var j = i + alen;
                if(document.cookie.substring(i, j) == arg) {
                    return _getCookieVal(j);
                }
                i = document.cookie.indexOf(" ", i) + 1;
                if(i == 0) break;
            }
            return null;
        },

        // store cookie value with optional details as needed
        setCookie : function(name, value, expires, path, domain, secure) {
            var Days = expires ? 30 : expires; //此 cookie 将被保存 30 天
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) +
                ((expires) ? "; expires=" + exp.toGMTString() : "") +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                ((secure) ? "; secure" : "");
        },
    
        // remove the cookie by setting ancient expiration date
        deleteCookie : function(name, path, domain) {
            if(getCookie(name)) {
                document.cookie = name + "=" +
                    ((path) ? "; path=" + path : "") +
                    ((domain) ? "; domain=" + domain : "") +
                    "; expires=Thu, 01-Jan-1970 00:00:01 GMT";
    
            }
        }
    };

    return Cookies;
});