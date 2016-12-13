define(function (require) {
    var $ = require("jquery");
    var ko = require("knockout");
    var proxy = require("proxy");
    var templateEngine = new ko.nativeTemplateEngine();
    var template = require("text!knockout-plugins/knockout.grid.page.html");

    ko.bindingHandlers.koPageGrid = {
        init: function (element, valueAccessor) {
            return {controlsDescendantBindings: true};
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var $this = $(element);
            var value = valueAccessor();
            // Templates used to render the grid
            var model = {cols: value.columns, rows: ko.utils.unwrapObservable(value.data), key: value.key,
                prev: value.prev, next: value.next, pages: ko.utils.unwrapObservable(value.pages), goPage: value.goPage,
                isGoPage: value.isGoPage, isCurPage: value.isCurPage
            };
            $this.empty();
            // Render the main grid
            var templateId = "koPageGirdTemplate" + Math.random();
            $(template).appendTo($this).attr("id", templateId);
            var container = $("<div/>").appendTo($this)[0];
            ko.renderTemplate(templateId, value, { templateEngine: templateEngine}, container, "replaceNode");
            var $set = $(".checkboxes", $this).uniform().change(function () {
                var $that = $(this);
                if ($that.is(":checked")) {
                    value.selected.push($that.val());
                }
                else {
                    value.selected.remove($that.val());
                }
            });
            var $group = $(".group-checkable", $this).uniform().change(function () {
                var checked = $(this).is(":checked");
                $set.attr("checked", checked);
                $set.prop("checked", checked);
                $set.change();
                $.uniform.update($set);
            });
        }
    };

    var PageGrid = function (option) {
        var self = this;
        self.url = option.url;
        self.columns = option.columns;
        self.key = option.key || "id";
        self.size = option.size || 10;
        self.count = option.count || 5;
        self.prev = option.prev || "上页";
        self.next = option.prev || "下页";
        self.data = ko.observableArray([]);
        self.page = ko.observable(1);
        self.total = ko.observable(0);
        self.pages = ko.observableArray([]);
        self.goPage = function (page) {
            if (page != self.page()) {
                self.page(page);
                self.refresh(self.option);
            }
        };
        self.goPrev = function () {
            if (!self.isGoPrev())
                return;
            self.goPage(self.page() - 1);
        };
        self.goNext = function () {
            if (!self.isGoNext())
                return;
            self.goPage(self.page() + 1);
        };
        self.maxPage = ko.computed(function () {
            if (self.total() == 0)
                return 1;
            var page = parseInt(self.total() / self.size);
            if (self.total() % self.size > 0)
                page += 1
            return page;
        });
        self.isGoPrev = ko.computed(function () {
            return self.page() > 1;
        });
        self.isGoNext = ko.computed(function () {
            return self.page() < self.maxPage();
        });
        self.selected = ko.observableArray([]);
        self.option = {};
        self.refresh = function (option) {
            self.option = option;
            var data = $.extend({page: self.page(), size: self.size}, self.option);
            return proxy.invoke(self.url, data).then(function (data) {
                self.total(data.total);
                self.page(data.page);
                if (self.pages().length < 1) {
                    for (var index = 1; index < self.count + 1; index++) {
                        if (index > self.maxPage())
                            break;
                        self.pages.push(index);
                    }
                }
                else if (self.pages.indexOf(self.page()) < 0) {
                    if (self.page() < self.pages()[0]) {
                        self.pages.unshift(self.page());
                        self.pages.pop();
                    }
                    else {
                        self.pages.shift();
                        self.pages.push(self.page());
                    }

                    self.data.removeAll();
                    for (var index = 0; index < data.data.length; index++) {
                        self.data.push(data.data[index]);
                    }
                    self.selected.removeAll();
                }
                });
            };
            self.find = function (callback) {
                var array = ko.utils.unwrapObservable(self.data);
                for (var index = 0; index < array.length; index++) {
                    var item = array[index];
                    if (callback(item))
                        return item;
                }
                return undefined;
            };
        };
        return PageGrid;
    });