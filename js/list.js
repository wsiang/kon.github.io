	function allcheck(){
		var allchecks = document.getElementsByName("checkboxall");
		var checkbox = document.getElementsByName("selected");  
		if(allchecks[0].checked){
			for(var i=0;i<checkbox.length;i++){
				checkbox[i].checked = true;
			}
		}else{
			for(var i=0;i<checkbox.length;i++){
				checkbox[i].checked = false;
			}
		}
	}
	function add(){
		window.location.href = actionName+"!doEdit.action";
	}
	function search(){
		document.myForm.submit();
	}
	function searchAll(){
		clearForm();
		document.myForm.submit();
	}
	function edit(){
		var checkbox = document.getElementsByName("selected");
		var num = 0;
		var id = "";
		for(i=0;i<checkbox.length;i++){
			if(checkbox[i].checked){ 
				num += 1;
				id = checkbox[i].value; 
			}
		}
		if(num == 0){
			alert("请选择一条记录再点击修改！");
		}else if(num > 1){
			alert("不能修改多条记录！");
		}else{
			window.location.href = actionName+"!doEdit.action?id="+id; 
		}
	}
	function deletes(actUri){
		var checkbox = document.getElementsByName("selected");
		var num = 0;
		var id = "";
		for(i=0;i<checkbox.length;i++){
			if(checkbox[i].checked){ 
				num += 1; 
				var id0 = checkbox[i].value;
				if(num == 1){
					id = id0;
				}else{
					id += (","+id0);
				}
			}
		}
		if(num == 0){
			alert("请选择一条或多条记录后再删除！");
		}else{
			if(confirm('确定删除选中的记录吗?')){
				var url=actionName+"!doDelete.action?selected="+id;
				if(actUri!=undefined && actUri!=null && actUri!=''){
					url=actUri+"?selected="+id;
				}
				location.href = url;
			}
		}
	}
	function clearForm(){
		var inputlist = document.getElementsByTagName("input");
		for(var i=0;i<inputlist.length;i++){
			if(inputlist[i].type=="text"){
				inputlist[i].value="";
			}
		}
		if(document.getElementsByTagName("select")){
			var selectlist = document.getElementsByTagName("select");
			for(var i=0;i<selectlist.length;i++){
				selectlist[i].options[0].selected=true;
			}
		}
	}
	/** 显示查询表单 **/
	function showSearchForm(){
		 document.getElementById("top_box").style.display="";
		 document.getElementById("table_aa").style.display="none";
		 document.getElementById("displaySearchForm").value="";
		 //setFrameHeight();
	}
	/** 隐藏查询表单 **/
	function hiddenSearchForm(){
		 document.getElementById("top_box").style.display="none";
		 document.getElementById("table_aa").style.display="";
		 document.getElementById("displaySearchForm").value="none";
	}
	//禁止用F5键 
	function document.onkeydown()
	{
	    if(event.keyCode==116)
	    {
	        event.keyCode   =   0;
	        event.cancelBubble   =   true;
	        return false;
	    }
	}
	/**
	 * 单击执行的方法
	 * @param value value 此行的checkbox的值或radio的值或指定keyId的值
	 * @param obj  TR对象
	 * @return
	 */
	function checkModel(value,obj){
		$(obj).find("input[type='checkbox']").each(function(){
			this.checked=!this.checked;
		})
		$(obj).find("input[type='radio']").each(function(){
			this.checked=true;
		})
	}
	/**
	 * 双击每行执行的方法
	 * @param value 此行的checkbox的值或radio的值或指定keyId的值
	 * @param obj TR对象
	 * @return
	 */
	function editModel(value,obj){
		window.location.href = actionName+"!doEdit.action?id="+value; 
	}
	/**
	 * checkbox的onclick方法
	 * @param obj
	 * @return
	 */
	function checkDomain(obj){
		var cl = $(obj).parent().parent().attr("onclick");
		if(cl!=null){
			obj.checked=!obj.checked;
		}
	}
	//禁止右键弹出菜单
//  function  document.oncontextmenu()
//	{
//	    return false;
//	}