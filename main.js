function main() {
  var kanvas = document.getElementById("kanvas");
  var gl = kanvas.getContext("webgl");

  var vertices = [
      0.5, 0.0, 0.0, 1.0, 1.0,   // A: kanan atas    (BIRU LANGIT)
      0.0, -0.5, 1.0, 0.0, 1.0,  // B: bawah tengah  (MAGENTA)
      -0.5, 0.0, 1.0, 1.0, 0.0,  // C: kiri atas     (KUNING)
      0.0, 0.5, 1.0, 1.0, 1.0    // D: atas tengah   (PUTIH)
  ];

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Vertex shader
  var vertexShaderCode =  `
  attribute vec2 aPosition;
  attribute vec3 aColor;
  uniform float uTheta;
  varying vec3 vColor;
  void main() {
      float x = -sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.y;
      float y = cos(uTheta) * aPosition.x + sin(uTheta) * aPosition.y;
      gl_Position = vec4(x, y, 0.0, 1.0);
      vColor = aColor;
  }
  `;
  var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  gl.compileShader(vertexShaderObject);   // sampai sini sudah jadi .o

  // Fragment shader
  var fragmentShaderCode = `
  precision mediump float;
  varying vec3 vColor;
  void main() {
      gl_FragColor = vec4(vColor, 1.0);
  }
  `;
  var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
  gl.compileShader(fragmentShaderObject);   // sampai sini sudah jadi .o

  var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
  gl.attachShader(shaderProgram, vertexShaderObject);
  gl.attachShader(shaderProgram, fragmentShaderObject);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // Variabel lokal
  var theta = 0.0;
  var freeze = false;

  // Variabel pointer ke GLSL
  var uTheta = gl.getUniformLocation(shaderProgram, "uTheta");

  // Kita mengajari GPU bagaimana caranya mengoleksi
  //  nilai posisi dari ARRAY_BUFFER
  //  untuk setiap verteks yang sedang diproses
  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 
      5 * Float32Array.BYTES_PER_ELEMENT, 
      0);
  gl.enableVertexAttribArray(aPosition);
  var aColor = gl.getAttribLocation(shaderProgram, "aColor");
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 
      5 * Float32Array.BYTES_PER_ELEMENT, 
      2 * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(aColor);

  // Grafika interaktif
  // Tetikus
  function onMouseClick(event) {
      freeze = !freeze;
  }
  document.addEventListener("click", onMouseClick);
  // Papan ketuk
  function onKeydown(event) {
      if (event.keyCode == 32) freeze = !freeze;
  }
  function onKeyup(event) {
      if (event.keyCode == 32) freeze = !freeze;
  }
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("keyup", onKeyup);

  function render() {
      gl.clearColor(1.0,      0.65,    0.0,    1.0);  // Oranye
      //            Merah     Hijau   Biru    Transparansi
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (!freeze) {
          theta += 0.1;
          gl.uniform1f(uTheta, theta);
      }
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// function main() {
//     var kanvas = document.getElementById("kanvas");
//     // var gl = kanvas.getContext("2d");
//     var gl = kanvas.getContext("webgl");
//     // kalo kita mau gambar di 3d, alat gambarnya webgl
//     // gl = grafics library
//     //harus lewat vertex(posisi) dulu baru bisa ke fragment(warna)

//     var vertices = [
//         0.5, 0.5, //A: kanan atas
//         0.0, 0.0, //B: bawah tengah
//         -0.5, 0.5 //C: kiri atas
//     ];

//     var buffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

//     // mendifinisikan shaders
//     // shaders itu ada macem2.
//     // shaders -> sebuah source code yg akan di-run oleh gpu

//     // vertex shader
//     var vertexShaderCode = `
//     attribute vec2 aPosition;
//     void main(){ 
//       float x = aPosition.x;
//       float y = aPosition.y;
//       gl_PointSize = 10.0;
//       //kita pake vec4 karena 4 dimensi (?)
//       gl_Position = vec4(aPosition.xy, 0.0, 1.0);
//     }`;
  
//     var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
//     gl.shaderSource(vertexShaderObject, vertexShaderCode);
//     gl.compileShader(vertexShaderObject); //sampai sini udah jadi .o
  
//     // itu gaya nulisnya doang yg beda y
//     // fragment shader
//     var fragmentShaderCode = `
//     precision mediump float;
//     //klo kita mau make float, kita harus pake precision
//       void main(){ 
//         float r = 0.0;
//         float g = 0.0;
//         float b = 1.0;
//         gl_FragColor = vec4(r, g, b, 1.0);
//       }
//       `;
//     var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
//     gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
//     gl.compileShader(fragmentShaderObject); //sampai sini jadi .o
  
//     var shaderProgram = gl.createProgram(); // wadah dari excecutable (.exe)
//     gl.attachShader(shaderProgram, vertexShaderObject);
//     gl.attachShader(shaderProgram, fragmentShaderObject);
//     gl.linkProgram(shaderProgram);
//     gl.useProgram(shaderProgram); //kita siap untuk menggambar (scr analogi)

//     // kita mengajari GPU bagaimana cara mengoleksi
//     // nilai posisi dari ARRAY_BUFFER
//     // untuk setiap vertex yang sedang diproses
//     var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
//     //gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, normalized, stride, offset)
//     gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0) //tu 0 karena ada 1 data doang
//     gl.enableVertexAttribArray(aPosition);

//     gl.clearColor(1.0, 0.65, 0.0, 1.0); //(merah, hijau, biru, transparansi)
//     gl.clear(gl.COLOR_BUFFER_BIT);
  
//     // gl.drawArrays(gl.POINTS, 0, 3); <=ini cara buat titik kotak
//     //(first -> dari index brp kita mau nulis datanya. count -> kita mau gambar/render brp kali)
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);
//     //gl.drawArrays(gl_TRIANGLE, 0, 3);
//     //gl.drawArrays(gl_TRIANGLE.FAN, 0, 3);

//   }