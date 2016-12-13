define(function (require) {
    var $ = require("jquery");
    var ko = require("knockout");
    var proxy = require("proxy");

    var PagedGrid = function (option) {
        var self = this;
        self.single = option.single || false;
        self.url = option.url;
        self.columns = option.columns || [
            {name: "name", field: function (data) {
                return "field"
            }, span: "span1"}
        ];
        self.size = option.size || 10;
        self.total = ko.observable(0);
        self.selected = ko.observableArray([]);
        self.data = ko.observableArray([]);
        self.pages = ko.observableArray([]);
        self.page = ko.observable(1);
        self.pageDesc = ko.observable("");
        self.pageCount = option.pageCount || 5;
        self.key = option.key || function (data) {
            return data;
        };
        self.select = option.select || function (data) {
            return data;
        }
        self.option;
        self.refresh = function (option) {
            self.option = option || {};
            self.param = $.extend({page: self.page(), size: self.size}, option);
            delete self.option["page"];
            var promise = proxy.invoke(self.url, self.param);
            promise.then(function (data) {
                if (data != undefined) {
                    self.data.replace(data.data);
                    self.page(data.page);
                    self.total(data.total);
                }
                self.computePages();
                self.selected.removeAll();
            });
            return promise;
        };
        self.isPrev = function (page) {
            return page > 0;
        };
        self.goPage = function (page) {
            if (page < 1 || page > self.getTotalPage())
                return;
            self.page(page);
            self.refresh(self.option);
        };
        self.isNext = function (page) {
            return page <= self.getTotalPage();
        }
        self.isCurrent = function (page) {
            return page == self.page();
        }
        self.getTotalPage = function () {
            var total = self.total();
            var totalPage = parseInt(total / self.size);
            if (total % self.size > 0) {
                totalPage += 1;
            }
            return totalPage;
        };
        self.computePages = function () {
            //当前页
            var page = self.page();
            //记录总数
            var total = self.total();
            //总页数
            var totalPage = self.getTotalPage();
            if (totalPage < 1) {
                totalPage = 1;
            }
            //有效页号大于等于1并且小于总页数
            if (page < 1) {
                page = 1;
            }
            if (page >= totalPage) {
                page = totalPage;
            }
            //显示的页数
            self.pageDesc("总数:" + total + " 页数:" + page + "/" + totalPage);
            //显示页号
            //计算当前页号所在的区间
            var count = self.pageCount;
            //显示的页号的数组
            var pages = [];
            //当前页号所在的区间
            var section = parseInt(page / count);
            if (page % count == 0) {
                section -= 1;
            }
            var max = section * count + count;
            var min = max - count + 1;
            pages.push(min - 1);
            for (var i = min; i < max + 1; i++) {
                if (i > totalPage) {
                    break;
                }
                pages.push(i);
            }
            pages.push(max + 1);
            self.pages.replace(pages);
        };
        self.afterRender = function (element) {
            var $tr = $(element[1]);
            $(".single-checkbox", $tr).uniform();
        }
        self.goJump = function () {
            self.goPage(self.page());
        };
    };

    var templateEngine = new ko.nativeTemplateEngine();
    var template = require("text!knockout-plugins/knockout-paged-grid.html");
    var template_single = require("text!knockout-plugins/knockout-paged-grid-single.html");


    ko.bindingHandlers.koPagedGrid = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            return {controlsDescendantBindings: true};
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var $this = $(element);
            var myViewModel = valueAccessor();
            $this.empty();
            var $template = $(template);
            if (myViewModel.single == true) {
                $template = $(template_single);
            }
            var templateId = $template.attr("id");
            $template.attr("id", templateId + Math.random());
            $template.appendTo($this);
            var $container = $("<div/>");
            $container.appendTo($this);
            ko.renderTemplate($template.attr("id"), myViewModel, {templateEngine: templateEngine, afterRender: function () {
                var $group = $(".group-checkbox", $this).uniform();
                $group.change(function () {
                    var checked = $(this).is(":checked");
                    var $set = $(".single-checkbox", $this);
                    $set.each(function () {
                        var $this = $(this);
                        if ($this.is(":checked") != $group.is(":checked")) {
                            $this.click();
                        }
                    });
                    $.uniform.update($set);
                });
            }}, $container[0], "replaceNode");
        }
    };


    return PagedGrid;
});