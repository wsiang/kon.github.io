$(function(){
   
   getMsg();

});

function getMsg()
{

 var url='/msg/msg!newMsgCount.action?r='+new Date().getTime();

 $.getJSON(url,function(data){
   
	if(data.success)
	{
	   if( data.obj>0 )
	   {
		  $('#newMsg').show().html( data.obj );
	   }else
	   {
		   $('#newMsg').hide().html('');
	   }
	}
	setTimeout(getMsg,60000);
 });

}