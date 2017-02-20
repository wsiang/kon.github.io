	$(function() {
		
		enableMaxlength();
	});
	
	function enableMaxlength(){
		$("textarea[maxlength]").keyup(function(){
			var _this = $(this);
			var maxlength = _this.attr("maxlength");
			var word = _this.val();
			// alert(word.length);
			if(word.length > maxlength){
				_this.val(word.substring(0,maxlength - 1));	
			}
		});
	}
	
	function loadData(){
	 	var row = $(".dateTable td :checkbox:checked");
	 	if(row.length == 0){
	 		alert("请选择一条要编辑记录.");
	 		return;
	 	}
	 	if(row.length > 1)
	 	{
	 		alert("请只选择一条记录。");
	 		return false;
	 	}
	 	var id = row.eq(0).val();
	 	var url = getBaseUrl() + "!doEdit.action?id=" + id;
	 	location.href = url;
	 	
	}
	function bindRemoveHandle(){
		$("button.el_itemRemoveBtn").click(function(){
			var _this = $(this);
			
			var url = getBaseUrl() + "!doDelete.action?selected=" + _this.attr('rowId');
			ajaxDelete(url);
		});
	}
/**
 * 下拉列表，加载选择项
 */
(function($) {
	$.fn.loadItems = function() {
		return this.each(function() {
			var _this = $(this);
			
			loadData($(this),$(this).attr('dataUrl'));
			
			if(_this.attr("child")){
				
				_this.bind("change",function(){
					
					loadChild(_this,_this.val());
					
				});
			}
			
			function loadChild(parent,value){
				var childSelector = $("#" + parent.attr("child"));							
				var url = "/common/support!queryChildren.action?parent.id=" + value;				
				loadData(childSelector,url);
			}

			function loadData(selector,url){
				var _this = selector;
				$.getJSON(url,function(data){
					
						var value = _this.attr('oldValue');
						_this.empty();
						if(_this.attr('hasDefault')){
							_this.append($("<option>").val("0").text("--请选择--"));	
						}
						
						$.each(data,function(){																
							_this.append($("<option>").val(this.id).text(this.value));	
						});
						if(value)					
							_this.val(value);
						else if(!_this.attr('hasDefault')){
							value = data[0].id;
							_this.val(value);
						}
						if(_this.attr("child")){
							loadChild(_this,value);
						}
					
			});	
				
			}		
		});
			
	};
	
	
	
})(jQuery);


	
	
	function removeData(){
		
		var rows = $(".dateTable td :checkbox:checked");
	 	if(rows.length == 0){
	 		cbd_alert("请选择一条要删除的记录.");
	 		return;
	 	}
	 	var url = getBaseUrl() + "!doDelete.action?";
		 	$.each(rows,function(){
		 			url += param('selected',this.value);
		 });
	 	ajaxDelete(url);
	 	
	}
	function ajaxDelete(url,asyn){	
		var href = location.href;
	 	cbd_confirm("你确定要删除这条记录?",function(){	 				 
		 	$.getJSON(url,function(r){
		 		if(r.success){
		 			if(asyn){
		 				cbd_alert(r.msg);
		 			}
		 			else
		 				location.href = href;
		 		}
		 		else{
		 			cbd_alert(r.msg);
		 		}
		 	});
	 		
	 	});	
	 	
	}
	function exportList(){
	 	cbd_confirm("你确定要导出吗?",function(){
	 		_fn_close();
	 		location.href = getBaseUrl() + "!export.action";
	 	});
	}

	function go(val){
		var queryUrl = getQueryUrl();
		if(!queryUrl)
			queryUrl =  getBaseUrl() + "!doList.action";
		
		var c = "?";
		if(queryUrl.indexOf('?')>=0)
		{
			c = "&";
		}
		queryUrl += c + "pageIndex=" +  val;
		var criteria = getCriteria();
		if(criteria != null)
			queryUrl += criteria;
		
		location.href = queryUrl;
	}
	function goByUrl(val){
		var url = getQueryUrl();
		location.href = url + "?pageIndex=" +  val;
	}
	
	function goSearch(val){
		var url = getBaseUrl() + "/search.action";
		var type=$('#search_type').val();
	    var value=$('#search_value').val();
		location.href = url + "?pageIndex=" +  val +"&type="+type+"&value="+value;
	}
	
	function gotoSearch(){
		var page = $("#curPage").val();
		goSearch(page);
	}
	
	function gotoPage(){
		var page = $("#curPage").val();
		if(page == '' || isNaN(page))
			go(1);
		else
			go(page);
	}
	//具体页面可重写该方法，提供查询条件
	function getCriteria(){
		return null;
	}
	
	function getBaseUrl(){
		return $("body").attr("baseUrl");	
		
	}
	function getQueryUrl(){
		return $("body").attr("queryUrl");	
		
	}
	function param(name,val){
		if(!val)
			return "";
		return "&" + name + "=" + val;	
	}
	
	String.prototype.format = function(args) {
	    var result = this;
	    if (arguments.length > 0) {    
	        if (arguments.length == 1 && typeof (args) == "object") {
	            for (var key in args) {
	                if(args[key]!=undefined){
	                    var reg = new RegExp("({" + key + "})", "g");
	                    result = result.replace(reg, args[key]);
	                }
	            }
	        }
	        else {
	            for (var i = 0; i < arguments.length; i++) {
	                if (arguments[i] != undefined) {
	                    var reg = new RegExp("({[" + i + "]})", "g");
	                    result = result.replace(reg, arguments[i]);
	                }
	            }
	        }
	    }
	    
	    result = result.replace(/\{[a-zA-Z.]*\}/g, "");
	   
	    return result;
	};

	 function uploader(opt){	 
		 	
		 	var url = '/import!importFile.action?temp=true&type=' + param('type',opt.type) + param('dir',opt.dir);

			$.ajaxFileUpload({
					
					url: url, 
					
					fileElementId: opt.fileElementId, 				
					
					dataType: 'json',
					
					success: function(data) {
							if(data.success){
								opt.onSuccess(data);						
							}
							else{
								alert(data.msg);
							}
					}
			}); 	
		 }
		 
	function processAttach(ctn,uploadFile,hiddenName,hideFileName){
		var fileNameSpan = ctn.find(".fileNameSpan");
		if(!hideFileName)
		fileNameSpan.text(uploadFile.originalName);
		ctn.find(".delSpan").show();
		ctn.attr("fileId",uploadFile.id);
		var hiddenExp = "input[name='" +  hiddenName + "']";
		var hidden = ctn.find(hiddenExp);
		if(hidden.length){
			hidden.val(uploadFile.id);
		}
		else{
			$('<input type="hidden">').attr("name",hiddenName).val(uploadFile.id).appendTo(fileNameSpan);			
		}
	}
	function delPic(ctnId,callback){
	 	var ctn = $("#" + ctnId);
	 	var id = ctn.attr("fileId");
	 	cbd_confirm('您确定要删除这个附件吗?',function(){
				$.getJSON("/import!doDelFile.action",{id:id},function(data){
					_fn_close();
		 			if(data.success){
		 				if(callback)
		 					callback();
		 				
		 				ctn.find(".fileNameSpan").empty();
		 				ctn.find(".delSpan").hide();
		 				
		 			}else{
		 				cbd_alert(data.msg);
		 			}
		 		});
		});
	 }
	
	 
	 /************************************************************************************
	 * name		: $.cbd_clearDefaultTxt()
	 *
	 * content	: 提交前清除默认文本
	 ************************************************************************************/
	(function($) {
		$.cbd_clearDefaultTxt = function() {
			$("input.isEmpty").val("");		
		};
	})(jQuery);
	
	function bindPlugin(ctn){
		
		ctn.find("input[defaultTxt='e-mail']").autocomplete("/user/user!likeByEmail.action", {
			width: 260,
			mustMatch: true,
			selectFirst: false,
			formatItem: function(row,i,max){
				var obj =eval("(" + row + ")"); //转换成js对象 
				return obj.email;  
				
			},
			formatResult: function(row) { 
				var obj = eval("(" + row + ")");  
				return obj.email; 
			}

		}).result(function(event, row, formatted) {
             var obj = eval("(" + row + ")");  
             
             if(ctn.find("input.id_holder").length)
             	 ctn.find("input.id_holder").val(obj.id);
             else
             	ctn.append($('<input type="hidden" class="id_holder" >').val(obj.id));   
             ctn.find('input.isEmpty').val("");		 
             ctn.find("input[defaultTxt]").removeClass('isEmpty');
             ctn.find("input[defaultTxt='name']").val(obj.name);
             ctn.find("input[defaultTxt='mobile']").val(obj.adminUpdatedMobile);
             if(obj.channel)
             	ctn.find("input[defaultTxt='channel']").val(obj.channel.name);
             else
             	 ctn.find("input[defaultTxt='channel']").val("");
             ctn.find("input[defaultTxt='band']").val(obj.jobBand);
             
        });
        
	}
	
	
	
	function cbd_confirm(info,func){
		$.cbd_tipPop1({type : "noTit",info:info,onSave:func});		
	}
	function cbd_prompt(func){
		$.cbd_tipPop1({type : "default",onSave:func});		
	}
	function cbd_show(renderHtml, func){
		$.cbd_tipPop1({type : "custom", renderHtml : renderHtml, onSave:func});		
	}
	function cbd_alert(info,func){
		$.cbd_tipPop1({type : "noBtn",info:info,onSave:func});
	}
	function cbd_confirm_attend(func){
		$.cbd_tipPop1({type : "confirm_attend",onSave:func});		
	}
	function cbd_survey_release(info,func){
		$.cbd_tipPop1({type:"surveyPublish",info:info,onSave:func});
	}
	function cbd_exam_release(info,func){
		$.cbd_tipPop1({type:"examPublish",info:info,onSave:func});
	}
	function cbd_alert_tip(info){
		$.cbd_tipPop1({type : "noBtnTip",info:info});		
	}
	function _fn_close() {
		$(".tipPop").fadeOut(function() {
			$(this).remove();
			$(".tipPop_bg").remove();
		});
	}

	
	Array.prototype.removeAt=function(index){
		var obj = this[index];
		this.splice(index,1);
		return obj;
	} 

jQuery.extend({     
    /**
    * @see 将javascript数据类型转换为json字符串  
    * @param 待转换对象,支持  object,array,string,function,number,boolean,regexp  
    * @return 返回json字符串
    */     
    toJSON:function(object){       
        var type = typeof object;       
        if ('object' == type) {         
            if (Array == object.constructor)
                type = 'array';         
            else if (RegExp == object.constructor)  
                type = 'regexp';         
            else
                type = 'object';       
        }       
        switch (type) {       
            case 'undefined':       
            case 'unknown':         
                return;          
            case 'function':       
            case 'boolean':       
            case 'regexp':         
                return object.toString();         
            case 'number':         
                return isFinite(object) ?   object.toString() : 'null';         
            case 'string':         
                return '"' + object.replace(/(|")/g, "$1").replace(/n|r|t/g, function(){           
                            var a = arguments[0];          
                            return (a == 'n') ? 'n': (a == 'r') ? 'r': (a == 't') ? 't': ""         
                        }) + '"';         
            case 'object':         
                if (object === null)
                    return 'null';         
                var results = []; 
                for (var property in object) {           
                    var value = jQuery.toJSON(object[property]);           
                    if (value !== undefined) results.push(jQuery.toJSON(property) + ':' + value);         
                }         
                return '{' + results.join(',') + '}';         
            case 'array':         
                var results = [];         
                for (var i = 0; i < object.length; i++) {           
                    var value = jQuery.toJSON(object[i]);           
                    if (value !== undefined) results.push(value);        
                }         
                return '[' + results.join(',') + ']';        
        }     
    }   
});


/************************************************************************************
 * name		: $.cbd_tipPop(opt)
 *
 * content	: 提示弹出窗
 ************************************************************************************/
(function($) {
	$.cbd_tipPop1 = function(opt) {
		var _opt = opt,
			_type = _opt.type;
			_onSave = opt.onSave;
			_info = opt.info;
			_renderHtml = opt.renderHtml;
		
		function _fn_init(html) {
			var _html = html,
				_tipPop = $(".tipPop"),
				_tipPop_len = _tipPop.size(),
				_tipPop_close,
				_tipPop_btn,
				_tipPop_btn_close;

			function _fn_close() {
				$(".tipPop").fadeOut(function() {
					$(this).remove();
					$(".tipPop_bg").remove();
				});
			};

			function _fn_init() {
				$("body").append(html).append('<div class="tipPop_bg"></div>');
				_tipPop = $(".tipPop"),
				_tipPop_len = _tipPop.size(),
				_tipPop_close = _tipPop.find(".tipPop_head_close"),
				_tipPop_btn = _tipPop.find(".el_btn").first();
				_tipPop_btn_close = _tipPop.find(".el_btn.close");
				$("p.infoTxt").html(_info);
				$(".tipPop").fadeIn();
				_tipPop_close.click(_fn_close);
				if(_type == 'default')
					_tipPop_btn.click(function(){
						_tipPop_btn.prop("disabled",true);
						_onSave($('#refuseTxt').val());
						//_fn_close();
					});
				else if(_type == 'noBtn'){
					_tipPop_btn.click(function(){
						_fn_close();
					});
					_tipPop_close.click(function(){
						if(_onSave){
							_onSave();
						}
					});
				}else if (_type == 'noBtnTip') {
					_tipPop_close.hide();
					_tipPop.find(".tipPop_head").addClass('tipPop_head_noclose');
				}
				else if (_type == "surveyPublish"){
					_tipPop_btn.click(function(){
						_tipPop_btn.prop("disabled",true);
						_onSave($('#checkbox_clear').prop("checked"));
					});
				}
				else if (_type == "examPublish"){
					_tipPop_btn.click(function(){
						_tipPop_btn.prop("disabled",true);
						_onSave($('#checkbox_clear').prop("checked"));
					});
				}
				else if(_type == "custom")
				{
					_tipPop_btn.click(function(){
						_onSave();
					});
				}
				else {					
					_tipPop_btn.click(function(){
						_tipPop_btn.prop("disabled",true);
						_onSave();
						//_fn_close();
					});
					if(_tipPop_btn_close.size()){
						_tipPop_btn_close.click(function(){
							_fn_close();
						});
					}
				}
					
			};

			if (_tipPop_len) {
				_tipPop.fadeOut(function() {
					$(this).remove();
					_fn_init();
				});
			} else {
				_fn_init();
			}
			
		};
		
		switch(_type){
			case "default" :
				$.get("/www/user/templates/tip_default.html", function(html){
					_fn_init(html);
				});
				break;
			case "noTit" :
				$.get("/www/user/templates/tip_noTit.html", function(html) {
					_fn_init(html);
				});
				break;
			case "noBtn" :
				$.get("/www/user/templates/tip_noBtn.html", function(html) {
					_fn_init(html);
				});
				break;

			case "noBtnTip" :
				$.get("/www/user/templates/tip_noBtn.html", function(html) {
					_fn_init(html);
				});
				break;
				
			case "custom" :
				(function() {
					_fn_init(_renderHtml);
				})();

				break;
				
			case "confirm_attend" :
				(function() {
					var _html = '';
					
					_html = '\
						<div class="tipPop indexConfirm" tipPopType="noTit">\
							<div class="tipPop_head">\
								<a class="tipPop_head_close"></a>\
							</div>\
							<div class="tipPop_main">\
								<div class="tipPop_main_inner">\
									<div class="tipPop_main_con">\
										<p class="infoTxt">我确定参加这次培训<br/><b class="red">注意:</b> 一旦你确定参加培训, 就不允许再改变. 如果你没有出席培训, 你将会被列入黑名单, 这回从你的账户里扣除50积分, 接下来的培训你将得不到优先安排。</p>\
									</div>\
									<div class="tipPop_main_btns">\
										<button class="el_blueBtn el_btn"><span>确定</span></button>\
									</div>\
								</div>\
								<div class="tipPop_main_bot"></div>\
							</div>\
						</div>\
					';
					
					_fn_init(_html);
				})();

				break;
				
			case "surveyPublish" :
				$.get("/www/admin/templates/tip_surveyPublish.html", function(html) {
					_fn_init(html);
				});
				break;
			case "examPublish" :
				$.get("/www/admin/templates/tip_examPublish.html", function(html) {
					_fn_init(html);
				});
				break;
		}
	};
})(jQuery);

  //重写 $.ajax,给每个ajax请求增加时间戳参数，以避免缓存
  (function($){  
        //备份jquery的ajax方法  
        var _ajax=$.ajax;  
          
        //重写jquery的ajax方法  
        $.ajax=function(opt){
        	if(!opt.data){
        		opt.data = {};
        	}  
           	opt.data.time = new Date();
            _ajax(opt);  
        };  
    })(jQuery);  
    
    
    function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
		return unescape(r[2]);
		return null;
	} 
	
	

