/*var a=1;
function fu(){
  a++;
  if(a%2==1){
    nihao.style.display="none";
  }else{
    nihao.style.display="block";
  }
  requestAnimationFrame(fu)
}
requestAnimationFrame(fu)
*/
/*setInterval(function(){
  var lastchild=tower.querySelectorAll("li")[tower.querySelectorAll("li").length-1];
  lastchild.style.height="0px"
      //lastchild.parentNode.removeChild(lastchild);
  //tower.querySelectorAll("li")[0].parentNode.insertBefore(lastchild,tower.querySelectorAll("li")[0]);
},1000)*/



/*tower.querySelectorAll("li").addEventListener("tra")
function nextFloor(){
  var lastchild=tower.querySelectorAll("li")[tower.querySelectorAll("li").length-1];
}
*/

// var TowerObj={
//   floors:tower.querySelectorAll("li"),
//   floorLength:tower.querySelectorAll("li").length,
//   firstFloor:function(){return tower.querySelectorAll("li")[tower.querySelectorAll("li").length-1]},
//   lastFloor:function(){return tower.querySelectorAll("li")[0]},
//   floorHeight:parseInt(getComputedStyle(tower.querySelectorAll("li")[0]).marginBottom)+tower.querySelectorAll("li")[0].clientHeight,
//   towerBottom:parseInt(getComputedStyle(tower).bottom),
//   nextFloor:function(){
//     //隐藏第一层
//     tower.insertBefore(this.firstFloor(),this.lastFloor());
//     tower.style.bottom=this.towerBottom+this.floorHeight+"px";
//     //移动宝塔
//     tower.style.transition="transform 0.2s ease-in";
//     tower.style.transform="translate3D(0,"+this.floorHeight+"px,0)"
//   }
// }
// tower.addEventListener("webkitTransitionEnd",function(){
//     tower.style.transition="";
//     tower.style.transform="translate3D(0,0,0)";
//     tower.style.bottom=TowerObj.towerBottom+"px";
// })

// setInterval(function(){
//    TowerObj.nextFloor();
//  },1000)










