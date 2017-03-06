//o3绘制一个点
var demo3=function(){
  var gl=initwebgl(demo3_canvas);
  //-------private-------
  //顶点着色器
  var VSHADER_SOURCE = [
      'void main() {',
      '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);', //Set the vertex coordinates of the point
      '  gl_PointSize = 40.0;',                    //Set the point size
      '}'
    ].join("\n");
  //片元着色器
  var FSHADER_SOURCE =[
    'void main() {',
    '  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);', //Set the point color
    '}'
  ].join("\n");
  //初始化着色器 gl,顶点代码，片元代码
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  //绘制point
  gl.drawArrays(gl.POINTS, 0, 1);
}()

/**
 * 初始化着色器
 * @param gl webgl对象
 * @param vshader 顶点着色器程序(string)
 * @param fshader 片元着色器程序 (string)
 * @return true 返回true表示初始化着色器成功
 */
function initShaders(gl, vshader, fshader) {
  //创建程序
  var program = createProgram(gl, vshader, fshader);
  //使用程序
  gl.useProgram(program);
  gl.program = program;
  /**
   * 创建webgl使用的程序对象
   * @param gl webgl
   * @param vshader 顶点着色器
   * @param fshader 片源着色器
   * @return opengl to webgl(program程序对象)
   */
  function createProgram(gl, vshader, fshader) {
    //创建顶点着色器和片元着色器
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fshader);
    //创建程序对象，程序对象涵盖了着色器，可以和着色器进行数据交互
    var program = gl.createProgram();
    //为程序对象分配顶点着色器和片元着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    //连接着色器（程序对象是中间桥梁呀）
    // 检查连接结果
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      var error = gl.getProgramInfoLog(program);
      console.log('程序连接失败: ' + error);
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
   * @param 着色器源程序（字符串）
   */
  function createShader(gl, type, source) {
    //创建着色器
    var shader = gl.createShader(type);
    //给着色器添加着色代码
    gl.shaderSource(shader, source);
    //编译着色器
    gl.compileShader(shader);
    //检查着色器的编译状态
    //gl.getShaderParameter(shader,gl.COMPILE_STATUS)
    return shader;
  }
}
