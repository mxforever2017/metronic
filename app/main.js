requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        "knockout-plugins": "../lib/knockout/js/plugins",
        'bootstrap': '../lib/bootstrap/js/bootstrap.min',
        "bootstrap-plugins": "../lib/bootstrap/js/plugins",
        // "cab": "../js",
        'jquery': '../lib/jquery/jquery-1.9.1',
        "jquery-plugins": "../lib/jquery/js/plugins",
        'metronic': '../lib/metronic/js/metronic',
        // 'editor': '../lib/xheditor/xheditor-1.2.2.min',
        // 'zh': '../lib/xheditor/xheditor_lang/zh-cn',
        // 'myPlugins':'../lib/plugins',
        'Cookies':"../js/cookies"
    },
    shim: {
    	'editor': {
            exports: 'XHEDITOR'
       	},
        'zh': {
            deps: ['editor']
        },
    	"jquery-plugins": {
            deps: ["jquery"],
            exports: "jquery"
        },
        "knockout-plugins": {
            deps: ["knockout"]
        },
        "bootstrap": {
            deps: ["jquery"]
        },
        "bootstrap-plugins/bootstrap-datepicker": {
            deps: ["bootstrap"]
        },
        "bootstrap-plugins/bootstrap-datetimepicker": {
            deps: ["bootstrap"]
        },
        "bootstrap-plugins/bootstrap-timepicker": {
            deps: ["jquery", "bootstrap"]
        },
        "bootstrap-plugins/bootstrap-switch": {
        	deps: ["bootstrap"]
        },
        "bootstrap-plugins/bootstrap-sweet-alert/sweetalert": {
        	deps: ["bootstrap-plugins/bootstrap-sweet-alert/ui-sweetalert.min"]
        },
        "bootstrap-plugins/bootstrap-sweet-alert/ui-sweetalert.min": {
        	deps: ["jquery"]
        },
        
        // "jquery-plugins/jquery.tmpl": {
        //     deps: ["jquery"]
        // },
        // "jquery-plugins/jquery.slimscroll.min": {
        //     deps: ["jquery"]
        // },
        // "jquery-plugins/jquery.flot": {
        //     deps: ["jquery"]
        // },
        // "jquery-plugins/jquery.uniform.min": {
        //     deps: ["jquery"]
        // },
        // "jquery-plugins/jquery-ui-1.10.1.custom.min": {
        //     deps: ["jquery"]
        // },
        // "jquery-plugins/jquery.backstretch.min": {
        // 	deps: ["jquery"]
        // },
        // "jquery-plugins/jquery.fileDownload": {
        //     deps: ["jquery"]
        // },
        // "jquery-plugins/jquery.validate.min": {
        //     deps: ["jquery"]
        // },
        // "jquery-plugins/jquery.PrintArea": {
        //     deps: ["jquery"]
        // },
        // "jquery-plugins/jquery.flot.pie": {
        //     deps: ["jquery", "jquery-plugins/jquery.flot"]
        // },
        // "jquery-plugins/jquery.flot.resize": {
        //     deps: ["jquery", "jquery-plugins/jquery.flot"]
        // },
        // "jquery-plugins/jquery.flot.stack": {
        //     deps: ["jquery", "jquery-plugins/jquery.flot"]
        // },
        // "jquery-plugins/fullcalendar.min": {
        //     deps: ["jquery", "jquery-plugins/jquery.flot"]
        // },
        // "jquery-plugins/jquery.backstretch.min": {
        // 	deps: ["jquery"]
        // },
        "knockout-plugins/knockout.validation": {
            deps: ["knockout"]
        },
        "metronic": {
            deps: [
                "jquery",
                //"jquery-plugins/js.cookie.min"
                // "jquery-plugins/jquery.slimscroll.min",
                // "jquery-plugins/jquery.blockui.min",
                // "jquery-plugins/jquery.validate.min",
                // "jquery-plugins/json2",
                // "bootstrap",
                // "bootstrap-plugins/bootstrap-datepicker",
                // "bootstrap-plugins/bootstrap-datetimepicker",
                // "bootstrap-plugins/bootstrap-timepicker",
                // "bootstrap-plugins/bootstrap-switch",
                // "knockout-plugins/knockout.validation",
                // "knockout-plugins/knockout-extend",
            ]
        },
    }
});

define(function(require) {
	var $ = require("jquery");
	var ko = require("knockout");
	var system = require("durandal/system");
	var app = require("durandal/app");
	var viewLocator = require("durandal/viewLocator");
    var bootstrap = require("bootstrap");
	var metronic = require("metronic");
	
	//>>excludeStart("build", true);
    system.debug(false); //设置是否是调试模式
    //>>excludeEnd("build");

    app.title = 'Durandal Samples';
    
    // ko.validation.init({
    //     insertMessages: false,
    //     decorateInputElement: true,
    //     decorateElement: true,
    //     errorMessageClass: "text-error",
    //     errorElementClass: "error",
    //     errorsAsTitle: true,
    //     errorClass: "error",
    //     messagesOnModified: true,
    //     decorateElementOnModified: true
    // });
    
    //specify which plugins to install and their configuration
    app.configurePlugins({
        router:true,
        dialog: true,
    });

    app.start().then(function () {
        app.setRoot("shell","entrance");
    });
	
});
