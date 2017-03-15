//游戏操控类
gameControl={
  againGameBtn:$(".againGameBtn"),
  gameoverDialog:$(".gameoverDialog"),
  countdownNumWrap:$(".countdownNumWrap"),
  //显示游戏结果对话框
  showGameoverDialog:function(){
    this.gameoverDialog.addClass("show")
  },
  //显示游戏结果对话框
  hideGameoverDialog:function(){
    this.gameoverDialog.removeClass("show")
  },
  //显示3,2,1进入游戏
  init:function(){
    var self=this;
    //结束游戏事件绑定
    this.againGameBtn.bind("touchstart",function(event){
      Game.reset();
      self.hideGameoverDialog();
      setTimeout(function(){
        Game.gamestart();
      },300)
    })
  }
}
gameControl.init();




Game.loadTexture(function(loader){
  // 初始化游戏
  Game.trigger("loadcompleted")
});





//游戏加载完成
Game.handler("loadcompleted",function(){
  //console.dir("游戏加载完毕")
   Game.init();
   Game.gamestart()
})



Game.handler("gameover",function(){
  //console.dir("游戏结束")
  setTimeout(function(){
    gameControl.showGameoverDialog();
    var photo=gameControl.gameoverDialog.find("#photo");
  },1000)
})

