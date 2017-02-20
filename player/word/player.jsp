<!DOCTYPE HTML>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.inc"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>LOREAL</title>
<script src="/www/user/scripts/jquery.min.js"></script>
<script type="text/javascript" src="/www/user/scripts/swfobject.js"></script>
 <style type="text/css">
 *{margin:0;padding:0;}
 html,body {height:100%;overflow: hidden;}
 .tit{text-align: center;vertical-align: middle;margin: auto;color: #806242;line-height: 17px;height: 17px;font-family: "微软雅黑",Arial;font-size: 20px;font-weight: bold;padding:5px 0px 5px 0px;}
 #myId{width:980px; height:650px; border:1px solid #fff;text-align: center;vertical-align: middle;margin: auto;}
 </style>
</head>
<body onload="pageInit();">
 <div id="myId">&nbsp;</div> 	
 <script type="text/javascript">
var isready =false;
var so = new SWFObject("reader.swf", "flash","100%","100%", "9");
so.addParam("allowfullscreen","true");
so.addParam("wmode","opaque")
so.write("myId"); 

 function pageInit() {
	isready=true;
 }
 function isReady(){
	isready=true;
	return isready;	
 }
 function sendToActionScript(i,j) {
	document.getElementById("flash").loadswf('${param.file}',1);
 }
 
 function toSetMenu(){
	document.getElementById("flash").loadswf('${param.file}',1);	 
}
</script>
</body>
</html>