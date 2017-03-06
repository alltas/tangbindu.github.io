function initwebgl(canvas){
  //webgl object
  var gl;
  //定宽高（适配retina）
  canvas.width=canvas.clientWidth*window.devicePixelRatio;
  canvas.height=canvas.clientHeight*window.devicePixelRatio;
  //获取gl
  gl=canvas.getContext("webgl",true); 
  //定视图区
  gl.viewport(0, 0, canvas.width,canvas.height);
  //定色彩模型
  gl.clearColor(0.0, 0.68, 0.3, 1.0);
  //清理画布
  gl.clear(gl.COLOR_BUFFER_BIT);
  return gl;
}