function IceVideo(opt) {
    var vObjr = new Object;
    vObjr.canplay = false;  //是否首次触发timeupdate事件并且currenttime大于0的flag
    vObjr.pauseFlag =false;     //是否暂停
    vObjr.endFlag =false;    //是否结束
    vObjr.currentTime =null;    //获取目前播放的时间api方法
    vObjr.play =null;       //播放的api方法
    vObjr.pause =null;      //暂停的api方法
    vObjr.destory =null;    //销毁的api方法
    vObjr.videoObj =null;   //video domobj
    vObjr.canvasObj =null;  //video canvasObj
    vObjr.canvasCxt =null;  //video canvasCxt
    vObjr.timeRecodeFlag =false;    //标记执行一次的flag
    vObjr.playActionTime =null;     //第一次调用play()方法的时间点
    vObjr.playIngTime =null;     //正式开始播放有画面出现的时间点

    var options = {
        frameWidth: opt.frameWidth,
        frameHeight: opt.frameHeight,
        areaId: opt.areaId,     //video播放区域
        videoId: opt.videoId,       //动态创建插入的<video>标签的id
        srcs: opt.srcs,       //视频文件资源路径，是一个数组,数组包含同一个视频文件各种格式的资源路径(.mp4,.avi,.mkv等等)
        poster: opt.poster,     //视频的第一帧图片
        srcTypes: opt.srcTypes,     //对应的支持视频格式，要与srcs一一对应
        direction: opt.direction || "landscape",    //横屏portrait or 竖屏landscape
        adaptation: opt.adaptation || "center",   //适配方案,中心对称缩放zoom,自适应auto
        replay: opt.replay || false,    //是否要循环播放
        canvas: opt.canvas || false,    //是否使用canvas方案代替video方案进行播放
        canvasId: opt.canvasId || '',
        playCallBack: opt.playCallBack || null,     //正式开始播放时可执行的回调函数
        pauseCallBack: opt.pauseCallBack || null,       //播放暂停时可执行的回调函数
        endedCallBack: opt.endedCallBack || null,       //播放结束时可执行的回调函数
        errorCallBack: opt.errorCallBack || null,       //发生错误时可执行的回调函数
        destoryCallBack: opt.destoryCallBack || null,    //销毁播放对象时可执行的回调函数
        nocanvasCallBack: opt.nocanvasCallBack || null   //不支持canvas时可执行的回调函数
    };
    //恒屏幕转屏适配方案
    var a = document.documentElement.clientHeight;
    var s = document.documentElement.clientWidth;
    var e = function(e, n) {
        $(e).parent().css({
            "width": a,
            "height": s,
            "position": "absolute",
            "top": "0",
            "left": "100%",
            "-webkit-transform": "rotate(90deg)",
            "transform": "rotate(90deg)",
            "-webkit-transform-origin": "top left",
            "transform-origin": "top left"
        });
        $(e).parent().prev().css({
            "width": a,
            "height": s,
            "position": "absolute",
            "top": "0",
            "left": "100%",
            "-webkit-transform": "rotate(90deg)",
            "transform": "rotate(90deg)",
            "-webkit-transform-origin": "top left",
            "transform-origin": "top left"
        });
    };
    var f = function(e, n) {
        $(e).parent().css({
            "top": "0",
            "left": "0%",
            "width": "100%",
            "height": "100%",
            "-webkit-transform": "rotate(0deg)",
            "transform": "rotate(0deg)",
            "-webkit-transform-origin": "top left",
            "transform-origin": "top left"
        });
        $(e).parent().prev().css({
            "top": "0",
            "left": "0%",
            "width": "100%",
            "height": "100%",
            "-webkit-transform": "rotate(0deg)",
            "transform": "rotate(0deg)",
            "-webkit-transform-origin": "top left",
            "transform-origin": "top left"
        });
    };
    //中心对称缩放适配方案
    var d = function(e, n) {
        var width =$('#'+options.areaId).width();
        var height =$('#'+options.areaId).height();
        var t =((options.frameHeight*width)/(options.frameWidth*height)).toFixed(6);
        if(t>1){
            var n =-(t-1)*100;
            $(e).css({
                "margin-top": n+"%"
            });
        }
    };
    /* 获取设备分辨率 */
    var getPixelRatio =function(context) {
        var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;                
        return (window.devicePixelRatio || 1) / backingStore;
    };
    //canvas播放video方案
    var playCanvas =function(){
        if(vObjr.pauseFlag || vObjr.endFlag){
            return;
        }
        vObjr.canvasCxt.drawImage(vObjr.videoObj, 0, 0, vObjr.canvasObj.width, vObjr.canvasObj.height);
        requestAnimationFrame(playCanvas);
    };
    //初始化canvas画布
    var initCanvas =function(){
        var ratio = getPixelRatio(vObjr.canvasCxt);
        
        if (options.direction == "portrait") {  //横向全屏处理
            /* 设置canvas大小 */
            var cw =$('#'+options.canvasId).parent().width();
            var ch =$('#'+options.canvasId).parent().height();
            $(vObjr.canvasObj).width(ch);
            $(vObjr.canvasObj).height(cw);

            /* 设置canva内容大小 */
            /* 高清屏幕处理 */
            vObjr.canvasObj.width = ch * ratio;
            vObjr.canvasObj.height = cw * ratio;

            vObjr.canvasCxt.drawImage(vObjr.videoObj, 0, 0, vObjr.canvasObj.height, vObjr.canvasObj.width);
            playCanvas();
        }else{
            /* 设置canvas大小 */
            /* 设置canvas大小 */
            var parent_h=$('#'+options.canvasId).parent().height();
            var parent_w=$('#'+options.canvasId).parent().width();
            var canvas_wh_scale=options.frameWidth/options.frameHeight
            var parent_wh_scale=parent_w/parent_h;
            //用parent的高度
            var ch=canvas_wh_scale>parent_wh_scale ? parent_h : parent_w/options.frameWidth*options.frameHeight;
            //用parent的w
            var cw=canvas_wh_scale>parent_wh_scale ? parent_h/options.frameHeight*options.frameWidth : parent_w;
            //判断是否居中
            $(vObjr.canvasObj).width(cw);
            $(vObjr.canvasObj).height(ch);
            if($(vObjr.canvasObj).height()>$(vObjr.canvasObj).parent().height()){
                $(vObjr.canvasObj).css("margin-top",($(vObjr.canvasObj).parent().height()-$(vObjr.canvasObj).height())/2);
            }
            if($(vObjr.canvasObj).width()>$(vObjr.canvasObj).parent().width()){
                $(vObjr.canvasObj).css("margin-left",($(vObjr.canvasObj).parent().width()-$(vObjr.canvasObj).width())/2);
            }


            /* 设置canva内容大小 */
            /* 高清屏幕处理 */
            vObjr.canvasObj.width = cw * ratio;
            vObjr.canvasObj.height = ch * ratio;

            vObjr.canvasCxt.drawImage(vObjr.videoObj, 0, 0, vObjr.canvasObj.width, vObjr.canvasObj.height);
            playCanvas();
        }
    };
    //屏幕发生横竖变化
    var changing =function(){
        if (options.direction == "portrait") {  //横向全屏处理
            if(window.orientation==90 || window.orientation==-90){//横屏状态
                if(options.canvas){
                    f("#" + options.canvasId);
                    var ratio = getPixelRatio(vObjr.canvasCxt);
                    /* 设置canvas大小 */
                    var cw =$('#'+options.canvasId).parent().width();
                    var ch =$('#'+options.canvasId).parent().height();
                    $(vObjr.canvasObj).width(cw);
                    $(vObjr.canvasObj).height(ch);

                    /* 设置canva内容大小 */
                    /* 高清屏幕处理 */
                    vObjr.canvasObj.width = cw * ratio;
                    vObjr.canvasObj.height = ch * ratio;

                    vObjr.canvasCxt.drawImage(vObjr.videoObj, 0, 0, vObjr.canvasObj.width, vObjr.canvasObj.height);
                    playCanvas();
                }else{
                    f("#" + options.videoId);
                }
            }else{
                if(options.canvas){
                    e("#" + options.canvasId); 
                    var ratio = getPixelRatio(vObjr.canvasCxt);
                    /* 设置canvas大小 */
                    var cw =$('#'+options.canvasId).parent().width();
                    var ch =$('#'+options.canvasId).parent().height();
                    $(vObjr.canvasObj).width(ch);
                    $(vObjr.canvasObj).height(cw);

                    /* 设置canva内容大小 */
                    /* 高清屏幕处理 */
                    vObjr.canvasObj.width = ch * ratio;
                    vObjr.canvasObj.height = cw * ratio;

                    vObjr.canvasCxt.drawImage(vObjr.videoObj, 0, 0, vObjr.canvasObj.height, vObjr.canvasObj.width);
                    playCanvas();
                }else{
                    e("#" + options.videoId); 
                }
            }
        }
    };
    //正式开始播放的action函数
    var playing = function() {
        if (vObjr.videoObj.currentTime > 0 && !vObjr.canplay) {
            vObjr.playIngTime =new Date().getTime();
            var blackTime =vObjr.playIngTime-vObjr.playActionTime;
            vObjr.canplay = true;
            if(options.canvas){
                initCanvas();
            }
            hidePoster();
            if (typeof(options.playCallBack) === "function") {
                options.playCallBack(blackTime);
            }
        }
    };
    //结束播放的action函数
    var ending = function() {
        vObjr.endFlag =true;
        if (typeof(options.endedCallBack) === "function") {
            options.endedCallBack()
        }
        if (options.replay) {
            vObjr.play();
        }
    };
    //发生异常的action函数
    var erroring =function(){
        if (typeof(options.errorCallBack) === "function") {
            options.errorCallBack(vObjr.videoObj.error.code);
        }
    };
    //隐藏封面函数
    var hidePoster =function(){
        if(options.canvas){
            $("#" + options.canvasId).parent().prev().hide();
        }else{
            $("#" + options.videoId).parent().prev().hide();
        }
    };
    //目前播放的时间位置
    vObjr.getCurrentTime =function(){
        return vObjr.videoObj.currentTime || null;
    };
    //执行播放
    vObjr.play = function() {
        if(!vObjr.timeRecodeFlag){
            vObjr.playActionTime =new Date().getTime();
            vObjr.timeRecodeFlag =true;
        }
        if(vObjr.videoObj.currentTime>0 && (vObjr.pauseFlag || vObjr.endFlag)){
            vObjr.pauseFlag =false;
            vObjr.endFlag =false;
            if(options.canvas){
                playCanvas();
            }
        }
        vObjr.videoObj.play();
    };
    //执行暂停
    vObjr.pause = function() {
        vObjr.videoObj.pause();
        vObjr.pauseFlag =true;
        if (typeof(options.pauseCallBack) === "function") {
            options.pauseCallBack();
        }
    };
    //执行销毁
    vObjr.destory = function() {
        vObjr.videoObj.removeEventListener("timeupdate", playing, false);
        vObjr.videoObj.removeEventListener("ended", ending, false);
        vObjr.videoObj.removeEventListener("error", erroring, false);
        $("#" + options.areaId).empty();
        vObjr.videoObj =null;
        if(options.canvas){
            $("#" + options.videoId).parent().remove();
            vObjr.canvasObj =null;
            vObjr.canvasCxt =null;
        }
        if (typeof(options.destoryCallBack) === "function") {
            options.destoryCallBack()
        }

        vObjr = null;
    };
    //iceVideo初始化
    var init = function() {
        if(options.canvas){
            //创建相应的dom区域
            var hideVideoDom ='<div style="height:0px;width:0px;display:none;"><video id="';
            hideVideoDom +=options.videoId;
            hideVideoDom +='" x-webkit-airplay="true" playsinline="true"webkit-playsinline="true" preload="auto">';
            for(var i=0; i<options.srcs.length; i++){
                hideVideoDom +='<source src="';
                hideVideoDom +=options.srcs[i];
                hideVideoDom +='" type="video/';
                hideVideoDom +=options.srcTypes[i];
                hideVideoDom +='">';
            }
            hideVideoDom +='</video></div>';
            $("body").append(hideVideoDom);
            if(options.direction =='landscape'){
                var canvasDom = '<div style="position:relative;top:0;left:0;width:100%;height:100%;overflow:hidden;"><div style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:1;background-image:url('+options.poster+');background-repeat:no-repeat;background-size:cover;"></div><div style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;"><canvas id="';
            }else{
                var canvasDom = '<div style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:1;background-image:url('+options.poster+');background-repeat:no-repeat;background-size:cover;"></div><div style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;"><canvas id="';
            }
            canvasDom +=options.canvasId;
            if(options.direction =='landscape'){
                canvasDom +='"></canvas></div></div>';
            }else{
                canvasDom +='"></canvas></div>';
            }
            
            $("#" + options.areaId).append(canvasDom);
            //横竖屏幕适配
            if(options.direction == "portrait") {
                e("#" + options.canvasId);
            }
            //初始化属性
            vObjr.videoObj =$('#'+options.videoId)[0];
            vObjr.canvasObj =$('#'+options.canvasId)[0];
            vObjr.canvasCxt =vObjr.canvasObj.getContext('2d');
            if(!vObjr.canvasObj || !vObjr.canvasCxt){
                if(options.nocanvasCallBack){
                    options.nocanvasCallBack();
                }
            }
        }else{
            if(options.direction =='landscape'){
                var videoDom = '<div style="position:relative;top:0;left:0;width:100%;height:100%;overflow:hidden;"><div style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:1;background-image:url('+options.poster+');background-repeat:no-repeat;background-size:cover;"></div><div style="overflow:hidden;width:100%;height:100%;"><video style="width:100%;" id="';
            }else{
                var videoDom = '<div style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:1;background-image:url('+options.poster+');background-repeat:no-repeat;background-size:cover;"></div><div style="overflow:hidden;width:100%;height:100%;"><video style="width:100%;" id="';
            }
            videoDom +=options.videoId;
            videoDom +='" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" preload="auto">';
            for(var i=0; i<options.srcs.length; i++){
                videoDom +='<source src="';
                videoDom +=options.srcs[i];
                videoDom +='" type="video/';
                videoDom +=options.srcTypes[i];
                videoDom +='">';
            }
            if(options.direction =='landscape'){
                videoDom +='</video></div></div>';
            }else{
                videoDom +='</video></div>';
            }
            
            $("#" + options.areaId).append(videoDom);
            vObjr.videoObj =$('#'+options.videoId)[0];
            if (options.direction == "portrait") {
                e("#" + options.videoId);
            } else {
                if(options.adaptation =='center'){
                    d("#" + options.videoId, "center center");
                }
            }
        }
        
        //绑定常用事件
        vObjr.videoObj.addEventListener("timeupdate", playing, false);
        vObjr.videoObj.addEventListener("ended", ending, false);
        vObjr.videoObj.addEventListener("error", erroring, false);
        window.addEventListener('orientationchange', changing, false);
    };
    //初始化
    init();
    return vObjr;
};