function showInputDialog(divId){
	var elementId = 'dialog';
	if(divId && divId != null && divId != 'undefined') elementId = divId;
	
	
	if(!document.getElementById(elementId+"_cover")){
		$("body").append("<div id=\""+elementId+"_cover\"></div>");
	}
	var bodyHeight = $(window).height();
	var cover = $("#" + elementId +"_cover");
	
	
	
	cover.css({"height":bodyHeight});
	cover.addClass("dialog_cover");
	
	
	cover.fadeTo("fast",0.6);
	
	
	var box = $("#"+elementId).parent();
	
	var top = ($(window).height()-box.height())/2+$(window).scrollTop();
	var left = ($(window).width()-box.width())/2;
	
	box.css({"display":"block",left:left+"px"});
	box.animate({"margin-top":"0",top:top+"px"},500);
	$("#"+elementId).find("input[type='button']").each(function(){this.disabled=false});
}
function hiddenInputDialog(divId){
	var elementId = 'dialog';
	if(divId && divId != null && divId != 'undefined') elementId = divId;
	
	$("#"+elementId+"_cover").fadeOut("fast");
	var box = $("#"+elementId).parent();
	box.animate({top:"0","margin-top":"-200px"},500).hide(100);
	box.find("input[type='text'],input[type='password']").each(function(){
		this.value="";
	});
}
$(window).scroll(function(){
	var dis = $("#dialog_box").css("display");
	if(dis=='' || dis=='block'){
		var top = ($(window).height()-$("#dialog_box").height())/2+$(window).scrollTop();
		$("#dialog_box").css({top:top+"px"});
	}
})