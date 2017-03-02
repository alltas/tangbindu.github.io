//清空画布
var demo2_canvas_gl=demo2_canvas.getContext("webgl");
//设置一个清除的颜色，清除画板（四位浮点型数字）
demo2_canvas_gl.clearColor(0.0,.68,0.3,1.0);
//使用颜色“图案”进行填充
demo2_canvas_gl.clear(demo2_canvas_gl.COLOR_BUFFER_BIT);
setTimeout(function(){
  //记得四个浮点数为0, 如果任何一个不为0都会与后面的色彩进行叠加计算
  demo2_canvas_gl.clearColor(0.0,0.0,0.0,0.0);
  demo2_canvas_gl.clear(demo2_canvas_gl.COLOR_BUFFER_BIT);
},3000)
