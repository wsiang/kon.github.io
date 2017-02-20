<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/WEB-INF/tld/struts-tags.tld" %>
<script type="text/javascript">
/**
*	验证规则说明    2011-8-16 11:40:18
*----------------------------------------------------------
*	1、label标签的for与组件的id值必须一致。
* 	例如:
*	<label for="model_roleName" class="required">角色名称:</label>
*	<s:textfield name="model.roleName"/>  struts会自动生成id="model_roleName",非struts标签需注明id="model_roleName"
*----------------------------------------------------------
*	2、在label标签里增加一个class属性，class的值为验证规则。
*		例如:
*		a、<label for="model_roleName" class="required"> 角色必填。
*		b、<label for="model_password" class="required english-number"> 密码必填,且只允许输入英文字母或数字。
*		c、<label for="model_birthday" class="date"> 生日非必填项、但会验证日期是否正确。
*----------------------------------------------------------
*	3、验证规则如下:
*		a、required：必填项
*		b、email:邮箱验证
*		c、date:时间日期验证
*		d、phone:电话与手机号验证
*		e、english:大小写英文字母验证
*		f、number:正负实数验证 znumber:正整数验证
*		g、english-number:字母和数字组合验证
*		h、double:两位小数验证
*		i、chinese:中文验证
*		j、internetURL:域名与网址验证
*		k、IPAdress:IP地址验证
*		l、IDCard:身份证验证
**/
	$(document).ready(function(){
		$("label[class*='required']").each(function(){
			$(this).prepend("<font color='red'>*</font>");
		});
    });
	function validateForm(){
		var isValidated = true;
		/** 所有输入框去掉前后空格 **/
		$("input[type='text']").each(function(){
			this.value=jQuery.trim(this.value);
		});
		$("label[class!='']").each(function(){
			/** 标签或属性名称 **/
			var label = $(this).text().replace("*","").replace(":","").replace("：","")
			label = "["+ jQuery.trim(label) +"]";
			/**  组件名称与对象  **/
			var name = $(this).attr("for").replace("_",".");
			var obj = $(document.getElementsByName(name)[0]);
			/**  组件标签与类型   比如:input、select、radio、checkbox  **/
			var tagName = obj.attr("tagName");
			var type = "";
			if(tagName=='INPUT'){
				type = obj.attr("TYPE");
			}else if(tagName=='SELECT'){
				type = 'select';
			}else if(tagName=='TEXTAREA'){
				type = 'text';
			}
			var className = jQuery.trim($(this).attr("class"));
			var val = jQuery.trim(obj.val());
			/** 判断是都必填,并验证 值正确性 **/
			if(className.indexOf("required")!=-1){
				/** 验证必填或必选 **/
				if(requiredVerify(label,obj,type,name)){
					if(className!="required"){
						var types = className.split(" ");
						for(var i=0;i<types.length;i++){
							if(types[i]!="required"){
								isValidated = validateValue(label,obj,val,types[i]);
								if(!isValidated)return false;
							}
						}
					}
					return;
				}else{
					isValidated = false;
					return false;
				}
			}else{ /**  非必要填的验证  **/
				if(jQuery.trim(obj.val())!=""){
					isValidated = validateValue(label,obj,val,className);
					if(!isValidated)return false;
				}
			}
		});
		return isValidated;
	}
	/**  必填验证  **/
	function requiredVerify(label,obj,type,name){
		switch(type){
			case 'text' :
				return requiredText(label,obj);
			case 'password' :
				return requiredText(label,obj);
			case 'textarea' :
				return requiredText(label,obj);
			case 'select' :
				if(obj.val()=="" || obj.val()=="0"){
					alert('<s:text name="public.label.please.select"/>'+label+"！");
					obj.focus();
					return false;
				}
				break;
			case 'file' :
				if(obj.val()==""){
					alert('<s:text name="public.label.please.select.file"/>');
					obj.focus();
					return false;
				}
				break;
			case 'checkbox' :
				return requiredChecked(label,obj,name);
			case 'radio' :
				return requiredChecked(label,obj,name);
			default:
				return true;
		}
		return true;
	}
	/** 普通输入框为空判断 **/
	function requiredText(label,obj){
		if(jQuery.trim(obj.val())==""){
			alert(label+'<s:text name="public.error.null"/>');
			obj.focus();
			return false;
		}
		return true;
	}
	/** Radio与Checkbox必选判断 **/
	function requiredChecked(label,obj,name){
		var objs = document.getElementsByName(name);
		for(var i=0;i<objs.length;i++){
			if(objs[i].checked){
				return true;
			}
		}
		alert('<s:text name="public.label.please.select"/>'+label+"！");
		obj.focus();
		return false;
	}
	function validateValue(label,obj,val,type){
		var flag = true;
		switch(type){
			/** 邮箱验证  **/
			case 'email' :
				var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				flag = pattern.test(val);
				if(!flag){
					alert(label+'<s:text name="public.error.pattern"/>');
					obj.focus();
				}
				break;
			/** 时间日期验证  **/
			case 'date' :
				var pattern;
				if(val.length<10 || val.length>19){
					alert('<s:text name="public.error.date.input"/>');
					obj.focus();
					return false;
				}else if(val.length==10){
					pattern = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2]\d|3[0-1])$/;
				}else if(val.length==16){
					pattern = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2]\d|3[0-1]) ([0-1]\d|2[0-3]):[0-5]\d$/;
				}else if(val.length==19){
					pattern = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2]\d|3[0-1]) ([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
				}
				flag = pattern.test(val);
				if(!flag){
					alert(label+'<s:text name="public.error.pattern"/>');
					obj.focus();
				}
				break;
			/** 电话与手机验证  **/
			case 'phone' :
				var i, j, strTemp;
				strTemp = "0123456789-()#+ ";
				for (i = 0; i < val.length; i++) {
					j = strTemp.indexOf(val.charAt(i));
					if (j == -1) {
						alert(label+'<s:text name="public.error.pattern"/>');
						obj.focus();
						return false;
					}
				}
				return true;
			/** 只允许输入英文字母 **/
			case 'english' :
				var pattern = /^[A-Za-z]+$/;
				flag = pattern.test(val);
				if(!flag){
					alert(label+'<s:text name="public.warn.only.input.english"/>');
					obj.focus();
				}
				break;
			/** 只允许输入数值 **/
			case 'number' :
				var pattern = /^[-]?[0-9]+[\.]?[0-9]+$/;
				flag = pattern.test(val);
				if(!flag){
					alert(label+'<s:text name="public.warn.only.input.number"/>');
					obj.focus();
				}
				break;
				/** 只允许输入正数值 **/
			case 'znumber' :
				var pattern = /^\+?[0-9][0-9]*$/;
				flag = pattern.test(val);
				if(!flag){
					alert(label+'<s:text name="public.warn.only.input.znumber"/>');
					obj.focus();
				}
				break;
			/** 只允许输入字母与数字 **/
			case 'english-number':
				var pattern = /^[A-Za-z0-9]+$/;
				flag = pattern.test(val);
				if(!flag){
					alert(label+'<s:text name="public.warn.only.input.english-number"/>');
					obj.focus();
				}
				break;
			/** 只允许输入两位小数的正实数 **/
			case 'double':
				var pattern = /^[0-9]+(.[0-9]{2})?$/;
				flag = pattern.test(val);
				if(!flag){
					alert(label+'<s:text name="public.warn.only.input.double"/>');
					obj.focus();
				}
				break;
			/** 只允许输入汉字 **/
			case 'chinese':
				var pattern = /^[u4e00-u9fa5],{0,}$/;
				flag = pattern.test(val);
				if(!flag){
					alert(label+'<s:text name="public.warn.only.input.chinese"/>');
					obj.focus();
				}
				break;
			/** 网址粗略验证 **/
			case 'internetURL':
				var reg = /[a-zA-z]+:\/\/[^\s]*/;
				if(val.indexOf('www')==0){
					alert(label+'<s:text name="public.error.pattern.internetURL0"/>');
					obj.focus();
					return false;
				}
				flag = reg.test(val);
				if(!flag){
					alert(label+'<s:text name="public.error.pattern.internetURL1"/>');
					obj.focus();
				}
				break;
			/** IP地址 **/
			case 'IPAdress':
				var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
				flag = reg.test(val);
				if(!flag){
					alert(label+'<s:text name="public.error.pattern"/>');
					obj.focus();
				}
				break;
			/**  身份证验证  **/
			case 'IDCard':
				flag = isChinaIDCard(val);
				if(!flag){
					alert(label+'<s:text name="public.error.pattern"/>');
					obj.focus();
				}
				break;
			default:
				break;
		}
		return flag;
	}
	function submitForm(){
		if(validateForm()){
			/** 屏蔽所有按钮 **/
			$("input[type='button']").each(function(){
				this.disabled=true;
			});
			document.myForm.submit();
		}
	}
</script>