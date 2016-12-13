requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        "knockout-plugins": "../lib/knockout/js/plugins",
        'bootstrap': '../lib/metronic/js/bootstrap.min',
        "bootstrap-plugins": "../lib/bootstrap/js/plugins",
        'jquery': '../lib/jquery/jquery-1.9.1',
        "jquery-plugins": "../lib/jquery/js/plugins",
        'metronic': '../lib/metronic/js/metronic',
        'proxy': 'proxy',
    },
    shim: {
    	"jquery-plugins": {
            deps: ["jquery"],
            exports: "jquery"
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
        "jquery-plugins/jquery.tmpl": {
            deps: ["jquery"]
        },
        "jquery-plugins/jquery.slimscroll.min": {
            deps: ["jquery"]
        },
        "jquery-plugins/jquery.flot": {
            deps: ["jquery"]
        },
        "jquery-plugins/jquery.uniform.min": {
            deps: ["jquery"]
        },
        "jquery-plugins/jquery.fileDownload": {
            deps: ["jquery"]
        },
        "jquery-plugins/jquery.validate.min": {
            deps: ["jquery"]
        },
        "jquery-plugins/jquery.PrintArea": {
            deps: ["jquery"]
        },
        "jquery-plugins/jquery.flot.pie": {
            deps: ["jquery", "jquery-plugins/jquery.flot"]
        },
        "jquery-plugins/jquery.flot.resize": {
            deps: ["jquery", "jquery-plugins/jquery.flot"]
        },
        "jquery-plugins/jquery.flot.stack": {
            deps: ["jquery", "jquery-plugins/jquery.flot"]
        },
        "jquery-plugins/fullcalendar.min": {
            deps: ["jquery", "jquery-plugins/jquery.flot"]
        },
        "metronic": {
            deps: [
                "jquery",
                "jquery-plugins/jquery.slimscroll.min",
                "jquery-plugins/jquery.blockui.min",
                "jquery-plugins/jquery.uniform.min",
                "jquery-plugins/jquery.validate.min",
                "jquery-plugins/jquery.fileupload",
                "jquery-plugins/jquery.fileDownload",
                "jquery-plugins/jquery-ui-1.10.1.custom.min",
                "jquery-plugins/jquery.PrintArea",
                "jquery-plugins/jquery.flot",
                "jquery-plugins/jquery.flot.pie",
                "jquery-plugins/jquery.flot.resize",
                "jquery-plugins/jquery.flot.stack",
                "jquery-plugins/fullcalendar.min",
                "jquery-plugins/json2",
                "jquery-plugins/highcharts.src",
                "bootstrap",
                "bootstrap-plugins/bootstrap-datepicker",
                "bootstrap-plugins/bootstrap-datetimepicker",
                "bootstrap-plugins/bootstrap-timepicker"
            ]
        }
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
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Samples';
    
    //specify which plugins to install and their configuration
    app.configurePlugins({
        router:true,
        dialog: true,
//      widget: {
//          kinds: ['expander']
//      }
    });

    app.start().then(function () {
        //viewLocator.useConvention();
        var module = 'shell';
        app.setRoot(module,"entrance");
    });
	
});
