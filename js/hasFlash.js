function detectFlash() {
    //navigator.mimeTypes是MIME类型，包含插件信息
    if(navigator.mimeTypes.length>0){
    //application/x-shockwave-flash是flash插件的名字
        var flashAct = navigator.mimeTypes["application/x-shockwave-flash"];
        return flashAct != null ? flashAct.enabledPlugin!=null : false;
    } else if(self.ActiveXObject) {
        try {
            new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            return true;
        } catch (oError) {
            return false;
        }
    }
}
 
function appendTip(id){
	$(id).css({"height":"88px","min-height":"88px"});
	$(id).html('<table class="hasFlash"><tr><td width="100">&nbsp;</td><td class="msg">您尚未安装Flash Player，您无法在线查看课程内容！</td></tr><tr><td class="down">&nbsp;</td><td class="down"><a href="http://get.adobe.com/cn/flashplayer/" target="_blank">Adobe Flash Player 下载</a></td></tr></table>');
}