//d3绘制一个点
var demo3=function(){
  //demo3 webgl
  var demo3_canvas_gl;
  demo3_canvas_gl=demo3_canvas.getContext("webgl",true);
  //重制宽高（适配retina）
  demo3_canvas.width=demo3_canvas.clientWidth*window.devicePixelRatio;
  demo3_canvas.height=demo3_canvas.clientHeight*window.devicePixelRatio; 
  //设置视图区域
  demo3_canvas_gl.viewport(0, 0, demo3_canvas.width,demo3_canvas.height);
  //顶点着色器
  var VSHADER_SOURCE = 
    [
      'void main() {',
      '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);', //Set the vertex coordinates of the point
      '  gl_PointSize = 40.0;',                    //Set the point size
      '}'
    ].join("\n");
  //片源着色器
  var FSHADER_SOURCE =
    [
      'void main() {',
      '  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);', //Set the point color
      '}'
    ].join("\n");
  //初始化着色器 gl,顶点代码，片源代码
  initShaders(demo3_canvas_gl, VSHADER_SOURCE, FSHADER_SOURCE);
  //设置清除的色彩模型
  demo3_canvas_gl.clearColor(0.0, 0.68, 0.3, 1.0);
  //使用色彩模型清楚
  demo3_canvas_gl.clear(demo3_canvas_gl.COLOR_BUFFER_BIT);
  //绘制point
  demo3_canvas_gl.drawArrays(demo3_canvas_gl.POINTS, 0, 1);
}()

/**
 * 初始化着色器
 * @param gl webgl对象
 * @param vshader 顶点着色器程序(string)
 * @param fshader 片源着色器程序 (string)
 * @return true 返回true表示初始化着色器成功
 */
function initShaders(gl, vshader, fshader) {
  //创建程序
  var program = createProgram(gl, vshader, fshader);
  //使用程序
  gl.useProgram(program);
  gl.program = program;
}
/**
 * Create the linked program object
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
function createProgram(gl, vshader, fshader) {
  //Create shader object
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }
  //Create a program object
  var program = gl.createProgram();
  if (!program) {
    return null;
  }
  //Attach the shader objects
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  //Link the program object
  gl.linkProgram(program);
  //Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}
/**
 * Create 着色器对象
 * @param gl webgl
 * @param 不同类型着色器对象
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
function createShader(gl, type, source) {
  //Create shader object
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log('unable to create shader');
    return null;
  }
  //Set the shader program
  gl.shaderSource(shader, source);
  //Compile the shader
  gl.compileShader(shader);
  //Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

