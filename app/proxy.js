define(function (require) {
//  var http = require("plugins/http");
//  var info = require("common/info");

    return {
        invoke: function () {
//          return http.post(url, data).then(function (result) {
//              if (result.code == 300) {
//                  //登录超时
//                  window.location.href = result["home"];
//              }
//              if (result.code == 500) {
//                  return info.show({message: result["message"]});
//              }
//              return result;
//          }).fail(function (xhr,status,error) {
//              return info.show({message: "系统异常,请联系管理员"});
//          });
        	
        	return [{
				moduleId: "hello/index",
				nav: 1,
				route: "head_desktop",
				title: "桌面"
			}, {
				moduleId: "",
				nav: 0,
				route: "#",
				title: "系统管理",
				children: [{
					moduleId: "modal/index",
					nav: 1,
					route: "modal_index",
					title: "系统信息"
				}, {
					moduleId: "ko/index",
					nav: 2,
					route: "modal_index",
					title: "系统信息"
				}, ]
			}];
        }
    };
});