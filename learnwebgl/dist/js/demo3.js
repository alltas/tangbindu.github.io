//纯颜色填充
var demo3_canvas_gl=demo3_canvas.getContext("webgl");
//设置一个清除的颜色，清除画板（四位浮点型数字）
demo3_canvas_gl.clearColor(0.0,.68,0.3,1.0);
//使用颜色“图案”进行填充
demo3_canvas_gl.clear(demo3_canvas_gl.COLOR_BUFFER_BIT);
function webGLStart() {
  var canvas = document.getElementById("lesson01-canvas");
  initGL(canvas);
  initShaders();
  initBuffers();
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  drawScene();

  function initBuffers(){
    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    vertices = [
         1.0,  1.0,  0.0,
        -1.0,  1.0,  0.0,
         1.0, -1.0,  0.0,
        -1.0, -1.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 4;
  }
}
