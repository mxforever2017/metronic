

define(function (require) {

    var ko = require('knockout');
    var box = require('cab/box');
    var config = require('common/config');
    var tree = require('jp/jstree/jstree');
    var units = require('cab/units');

    $(document).on('click', '#a_sz', function () {
        if ($(this).attr('data-state') == '1') {
            $('#menu').hide();
            $('#main').css('margin-left', '0px');
            $(this).attr('data-state', '0');
        } else {
            $('#menu').show();
            $('#main').css('margin-left', '210px');
            $(this).attr('data-state', '1');
        }
    });

    function crumb() {

        var that = this;

        var element = '#menu_child';
        var currentParent = '';

        that.handle_crumb = function (fragment) {

            var crumb = [];
            if (fragment != '' && fragment != 'home' && fragment != 'not-found') {
                box.getCurrentMember(function (member) {
                    if ($('#a_sz').attr('data-state') == '1') {
                        $('#menu').show();
                        $('#main').css('margin-left', '210px');
                    }
                    if ($('#a_sz').attr('data-state') == '0') {
                        $('#menu').hide();
                        $('#main').css('margin-left', '0px');
                    }

                    // 经过路由查找模块以及父模块
                    var api = config.core.findMenusByRouter;
                    var data = { RouterName: fragment };
                    var success = function (result) {

                        crumb.push('<a href="home.html">&nbsp;首页</a>');

                        for (var i = 0; i < result.length; i++) {
                            if (result[i].ParentId == 0) {

                                if (currentParent != result[i].Name) {
                                    // 根据一级菜单找出所有子级菜单
                                    var api = config.core.findChildMenuAll;
                                    var data = { ParentId: result[i].Id, MemberId: member.Id };
                                    var success = function (result) {

                                        var data = units.arrayToTree(result, 'id', 'parentid');

                                        var vOutput = ['<div class="accordion-group">'];
                                        for (var i = 0; i < data.length; i++) {
                                            if (data[i].hasOwnProperty('children')) {
                                                vOutput.push('<a href="#shell_menu_' + data[i].id + '" class="nav-header" data-parent="#menu_child" data-toggle="collapse">');
                                                vOutput.push('<i style="font-size:14px;" class="icon-caret-right"></i>&nbsp;');
                                                vOutput.push(data[i].text);
                                                vOutput.push('</a>');

                                                //if (i == 0) {
                                                //    vOutput.push('<ul id="shell_menu_' + data[i].id + '" style="" class="nav nav-list in collapse">');
                                                //} else {
                                                //    vOutput.push('<ul id="shell_menu_' + data[i].id + '" style="" class="nav nav-list collapse">');
                                                //}  2015-08-06修改为第一次不展开
                                                vOutput.push('<ul id="shell_menu_' + data[i].id + '" style="" class="nav nav-list collapse">');

                                                for (var j = 0; j < data[i].children.length; j++) {
                                                    var text = data[i].children[j].text;
                                                    vOutput.push('<li><a href="#' + data[i].children[j].router + '"><i class="icon-arrow-right"></i>&nbsp;');
                                                    vOutput.push(text);
                                                    vOutput.push('</a></li>');

                                                    if (j + 1 == data[i].children.length) {
                                                        vOutput.push('</ul>');
                                                    }
                                                }
                                            } else {
                                                if (i == 0) {
                                                    vOutput.push('<ul class="nav nav-list">');
                                                }
                                                vOutput.push('<li><a href="#' + data[i].router + '" title="' + data[i].text + '"><i class="icon-arrow-right"></i>&nbsp;' + data[i].text + '</a></li>');
                                                if (i + 1 == data.length) {
                                                    vOutput.push('</ul>');
                                                }
                                            }
                                        }
                                        vOutput.push('</div>');
                                        $(element).html(vOutput.join(''));
                                    };
                                    box.call(api, data, success);
                                }

                                currentParent = result[i].Name;
                                crumb.push('&nbsp;&gt;&nbsp;<a href="#');
                                crumb.push(result[i].Router);
                                crumb.push('">');
                                crumb.push(result[i].Name);
                                crumb.push('</a>');


                            } else {
                                crumb.push('&nbsp;&gt;&nbsp;');
                                crumb.push(result[i].Name);
                            }
                        }

                        $('[data-type="cab_crumb"]').html(crumb.join(''));
                    };
                    box.call(api, data, success);
                });

            } else {
                location.href = 'home.html';
            }
        };
    };

    return new crumb();
});