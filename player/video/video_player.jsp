<!DOCTYPE html>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
<head>
  <title>HTML5 Video Player</title>

  <!-- Chang URLs to wherever Video.js files will be hosted -->
  <link href="video-js.css" rel="stylesheet" type="text/css">
  <!-- video.js must be in the <head> for older IEs to work. -->
  <script src="video.js"></script>
  <script type="text/javascript" src="/js/jquery-1.4.2.js"></script>
  <script type="text/javascript" src="/js/jquery.cookie.js"></script>
  <script type="text/javascript" src="../ApiImpl.js"></script>
  <!-- Unless using the CDN hosted version, update the URL to the Flash SWF -->
  <script>
    videojs.options.flash.swf = "video-js.swf";
    
	var totalPages = 0;
	
	function moveNext(){		
		var curTime = $.cookie("video_location");		
		var offset = 0;
		if(curTime){			
		  var myPlayer = getPlayer();	 			  
		  myPlayer.play();
		  setTimeout(function(){		  	
			myPlayer.currentTime(curTime - offset);   
		  },100);
		}
	}
	
	function pause(){
		var player = getPlayer();
		if(player.paused()){
			player.play();
		}
		else
			player.pause();
	}
	function getPlayer(){
		return  videojs("example_video_1");
	}
	function setLocation(){
		var curTime = getPlayer().currentTime();
		totalPages = Math.floor(getPlayer().duration());
	 	Api.setMaxLocation(Math.floor(curTime));
		Api.setLocation(Math.floor(curTime));		
	}
	function getLocation(){
		return Api.getLocation();
	}
	window.onbeforeunload = function(){		
 		getPlayer().pause();
 		setLocation();			
	}
	function doExit(){	
		window.close();
	}
	var offset = 1;
	$(function(){
	 	var myPlayer = getPlayer();	 	
	 	
	 	myPlayer.on("ended", videoEnded);
	 	
		var curTime = getLocation();
		
		setTimeout(function(){					  	
			if(curTime){				
				 //if (confirm("Would you like to resume from where you previously left off?")){
					myPlayer.play();					
					//alert(curTime);		  			  
					setTimeout(function(){		  	
						myPlayer.currentTime(curTime - offset);   
				  	},300);		
				  	return;														 
				//}
			}			
			myPlayer.play();			
		},800);	
	});
	
	//视频播放结束
	function videoEnded(){
		Api.onReachLastPage();
	}
  </script>


</head>
<body>

  <video id="example_video_1" class="video-js vjs-default-skin" controls preload="auto" width="985px" height="600px"   
      data-setup="{}">
     <source src="${param.file}" type='video/mp4' />
     <track kind="captions" src="demo.captions.vtt" srclang="zh" label="English"></track>
     <track kind="subtitles" src="demo.captions.vtt" srclang="zh" label="English"></track>
  </video>
	<!--
	<button onclick="moveNext()" >Continue </button>
	
	<button onclick="doExit()" >Save and Exit </button>
	<button onclick="pause()" >Pause </button>-->
</body>
</html>
