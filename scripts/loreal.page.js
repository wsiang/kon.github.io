/*************************************
* name		: PagesInit
* content	: 各页面调用函数
************************************/
var PagesInit = {
    // 所有页面调用
    all: function (opt) {
        var _opt = opt,
			_curNavIndex = _opt.curNavIndex,
            _curSideBarIndex = _opt.curSideBarIndex,
            _curTabIndex = _opt.curTabIndex;

        $.loreal_navInit(_curNavIndex); // 主导航栏初始化

        $.loreal_sideBarInit(_curSideBarIndex); // 侧栏初始化

        $.loreal_curTab(_curTabIndex);

    },

    // 用户主页调用
    u_index: function () {

    },
    u_trianC: function () {
        $.comReaderUp();
        $.star();
    },
    u_conver: function (_opt) {
        $.replyShowHide();
    },
    u_info: function (_opt) {
        $.rankingTab();
    },
    u_noti: function (_opt) {
        $.iframeH();
    }
};


/*************************************
* name		: use
* content	: 调用函数
************************************/
$(document).ready(function () {
    var _optArr = $.loreal_curPageInfo($(".user")); // 当前页信息

    switch (_optArr[0]) {
        case "0":
            $.defaultTxt();
            break;
        case "1":

            break;
        case "2":
            PagesInit.u_trianC();
            switch (_optArr[1]) {
                case "1": $.recoedUp();

            }
            break;
        case "3":
            break;
        case "4":
            PagesInit.u_info();
            break;
        case "7":
            PagesInit.u_noti();
            break;
    }

    PagesInit.all({
        curNavIndex: parseInt(_optArr[0]),
        curSideBarIndex: parseInt(_optArr[1]),
        curTabIndex: parseInt(_optArr[2])
    });
});