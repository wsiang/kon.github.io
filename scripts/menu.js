function currentPage(index){
	var _index = index-1,
		_aim = $(".nav>ul>li");
		
	_aim.eq(_index).find(".item").addClass("current");
}

function currentFooterItem(index) {
	var _index = index-1,
		_aim = $(".footer>a");
		
	_aim.eq(_index).addClass("cur");
}
