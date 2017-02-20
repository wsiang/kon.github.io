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
			},

		}).result(function(event, row, formatted) {
             var obj = eval("(" + row + ")");  
             
             ctn.find("input[defaultTxt='e-trainerIds']").val(obj.id);
             ctn.find("input[defaultTxt='name']").val(obj.name);
             ctn.find("input[defaultTxt='mobile']").val(obj.mobile);
             
        });
	}
	
	
