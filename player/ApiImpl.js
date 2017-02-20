Api = {
	getLocation:function(){
		return window.parent.getLocation();
	},	
	setLocation:function(location){		
		window.parent.setLocation(location);
	},
	onReachLastPage:function(){
		window.parent.markFinish();
	},
	goExamTest:function(curPage) {
		window.parent.goExamTest(curPage);
	},
	goComment:function(curPage) {
		window.parent.goComment();
	},
	getPic:function (){
		return window.parent.getPic();
	},
	passExam:function (curPage){
		return window.parent.passExam(curPage);
	},
	setMaxLocation:function(curPage){
		window.parent.setMaxLocation(curPage);
	},
	getMaxLocation:function(){
		return window.parent.getMaxLocation();
	}
	
};
