//纯颜色填充
var demo1_canvas_gl=demo1_canvas.getContext("webgl");
//设置一个清除的颜色，清除画板（四位浮点型数字）
demo1_canvas_gl.clearColor(0.0,.68,0.3,1.0);
//使用颜色“图案”进行填充
demo1_canvas_gl.clear(demo1_canvas_gl.COLOR_BUFFER_BIT);