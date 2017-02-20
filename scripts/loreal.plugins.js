/*?
* name      : $.loreal_curPageInfo(param)
* content   : 获取当前页面信息
**/
(function () {
    $.loreal_curPageInfo = function (obj) {
        var _thisPageInfo = $(obj),
            _curPage = _thisPageInfo.attr("curPage");
        return _curPage.split("_");
    }
})();

/*?
* name      : $.loreal_navInit(param)
* content   : 初始化主导航栏
**/
(function ($) {
    $.loreal_navInit = function (index) {
        var _nav = $("#nav"),
            _item = _nav.find(".item");
        _item.removeClass("current");
        _item.eq(index - 1).addClass("current");
    }
})(jQuery);

/*?
* name      : $.loreal_sideBarInit(param)
* content   : 初始化侧导航栏
**/
(function ($) {
    $.loreal_sideBarInit = function (index) {
        var _nav = $("#sideBar"),
            _item = _nav.find(".item");

        _item.removeClass("current");
        _item.eq(index - 1).addClass("current");
    }
})(jQuery);

/*?
* name      : $.loreal_curTab(param)
* content   : 初始化侧导航栏
**/
(function ($) {
    $.loreal_curTab = function (index) {
        var _nav = $("#tabCon"),
            _item = _nav.find(".item");

        _item.removeClass("current");
        _item.eq(index - 1).addClass("current");
    }
})(jQuery);

/*?
* 课程目录页 评论回复
* trainCenter/ClassList.asp
**/
(function ($) {
    $.recoedUp = function () {
        var _item = $(".com_detail").find(".com_detaItem");
        _item.each(function (i) {
            var _btn = _item.eq(i).find(".com_back")
            var _other = _item.eq(i).find(".com_other")
            _btn.click(function () {
                if (_other.hasClass("comHide")) {
                    _other.removeClass("comHide")
                    _btn.html("收起回复")

                } else {
                    _other.addClass("comHide")
                    _btn.html("展开回复")
                }
            })
        })
    }
})(jQuery);

/**
* name    : $.defaultTxt()
* time    : 2014-6-5
*/
(function () {
    $.defaultTxt = function () {

        if (!window.applicationCache) {
            var _defaultTxt = $("input[placeholder]");


            _defaultTxt
            .each(function () {
                var _that = $(this),
                    _txt = _that.attr("placeholder");

                if(_that.attr("value").length==0){
                if (_that.attr("type") == "password") {
                    _that.wrap("<div class='wrap' style=width:'" + _that.outerWidth() + ";height:" + _that.outerHeight() + ";'></div>");
                    var _wrap = _that.parent();
                    _wrap.append("<span class='wrapTxt'>" + _txt + "</span>");

                    var _wrapTxt = _that.parent().find(".wrapTxt");


                    _wrapTxt.bind("click", function () {
                        if ($.trim(_txt) == $.trim(_that.next()[0].firstChild.nodeValue)) {
                            _that.next().text("");
                            _that.focus();
                        }
                    });

                    _that.focus(function () {
                        if ($.trim(_txt) == $.trim(_that.next()[0].firstChild.nodeValue)) {
                            _that.next().text("");
                        }
                    });

                    _that.blur(function () {
                        if (_that.attr("value") == _txt || _that.attr("value").replace(/\s+/g, "").length <= 0) {
                            _that.next().text(_txt);
                        }
                    });


                }

                else {
                    _that.attr("value", _txt);
                    _that.focus(function () {
                        if (_that.attr("value") == _txt) {
                            _that.attr("value", "");
                        }
                    });

                    _that.blur(function () {
                        if (_that.attr("value") == _txt || _that.attr("value").replace(/\s+/g, "").length <= 0) {
                            _that.attr("value", _txt);
                        }
                    });
                }
                }

            });
        }


    }
})();

/**
* name    : $.replyShowHide()
* time    : 2014-9-15
*/
(function ($) {
    $.replyShowHide = function () {
        var _askCon_item = $(".askCon_item");

        _askCon_item.delegate(".replyBtn", "click", function () {
            var _that = $(this),
                _parent = _that.parents(".askCon_item"),
                _replyCon = _parent.find(".replyCon");

            if (_replyCon.css("display") == "none") {
                _replyCon.slideDown();
                _that.text("收起回复");
            }
            else {
                _replyCon.slideUp();
                _that.text("回复");
            }


        });
    }
})(jQuery);

/**
* name    : $.poWindow()
* time    : 2014-9-16
*/
(function ($) {
    $.fn.poWindow = function () {
        this.each(function () {
            var _that = $(this),
                _closeBtn = _that.find(".closeBtn");
            var _winH = $(window).height(),
                _winW = $(window).width();
            _that.fadeIn();
            $("body").append('<div class="pop_bg" style="height:' + _winH + 'px;width:' + _winW + 'px;"></div>');

            _closeBtn.bind("click", function () {
                _that.fadeOut();
                $(".pop_bg").fadeOut(function () { $(".pop_bg").remove(); });
            });

        });
    }
})(jQuery);


/*?
* 播放器 学习页
* trainCenter/online_reader.asp
**/
(function ($) {
    $.comReaderUp = function () {
        $(".readComBtn").click(function () {
            if ($(this).hasClass("readbtnCur")) {
                $(this).removeClass("readbtnCur")
                $(".readComBox").animate({ right: "-270px" })
            } else {
                $(this).addClass("readbtnCur")
                $(".readComBox").animate({ right: "0px" })
            }
        })
    }
})(jQuery);

/*?
* 信息中心--排行榜
* infoCenter/rankingList.asp
**/
(function ($) {
    $.rankingTab = function () {
        var ranCity = $(".ran_allList").find(".ran_city");
        var ranList = $(".ran_allList").find(".ran_cityRan");
        ranList.each(function (i) {
            var item = ranList.eq(i)
            item.click(function () {
                if ($(this).hasClass("ran_cityCur")) {
                    $(this).removeClass("ran_cityCur")
                    ranCity.eq(i).slideUp()
                } else {
                    ranList.removeClass("ran_cityCur")
                    $(this).addClass("ran_cityCur")
                    ranCity.slideUp()
                    ranCity.eq(i).slideDown()
                }
            })
        })
    }
})(jQuery);

/*?
* name     : $.star()
* content  : 点评星级
* author   : mo
**/
(function ($) {
    $.star = function () {
        var _starCon = $("#starCon"),
            _stars = _starCon.find(".star");

        var starShow = function (index, event) {
            var _curIndex = index;

            _stars.removeClass("icon_sbGold").addClass("icon_sbGray");


            if (!_stars.eq(_curIndex).hasClass("cur") && event == "mouseleave") {
                _curIndex = _starCon.find(".cur").index();
            }

            //附加分数说明
            if (_curIndex != -1) {
                switch(_curIndex){
                    case 0:_stars.eq(_curIndex).html('<i class="score">很差</i>').siblings().html("");break;
                    case 1:_stars.eq(_curIndex).html('<i class="score">较差</i>').siblings().html("");break;
                    case 2:_stars.eq(_curIndex).html('<i class="score">还行</i>').siblings().html("");break;
                    case 3:_stars.eq(_curIndex).html('<i class="score">推荐</i>').siblings().html("");break;
                    case 4:_stars.eq(_curIndex).html('<i class="score">力荐</i>').siblings().html("");break;
                }
                
            }
            else {
                _stars.html("");
            }

            while (_curIndex >= 0) {
                _stars.eq(_curIndex).removeClass("icon_sbGray").addClass("icon_sbGold");
                _curIndex -= 1;
            }

        }
        _stars.bind("click", function () {
            var _that = $(this),
                _i = $(this).index();

            _that.addClass("cur").siblings().removeClass("cur");
            starShow(_i, "click");
        });

        _stars.bind("mouseenter", function () {
            var _that = $(this),
                _i = $(this).index();
            starShow(_i, "mouseenter");
        });

        _stars.bind("mouseleave", function () {
            var _that = $(this),
                _i = $(this).index();
            starShow(_i, "mouseleave");
        });

    }

})(jQuery);

(function ($) {
    $.iframeH = function () {
        $("#iframe").height($("#noticeList").outerHeight() - 4);
    }
})(jQuery);