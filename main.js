function main() {
    var kanvas = document.getElementById("kanvas");
    // var gl = kanvas.getContext("2d");
    var gl = kanvas.getContext("webgl");
    // kalo kita mau gambar di 3d, alat gambarnya webgl
    // gl = grafics library
  

    var vertices = [
        0.5, 0.5, //A: kanan atas
        0.0, 0.0, //B: bawah tengah
        -0.5, 0.5 //C: kiri atas
    ];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // mendifinisikan shaders
    // shaders itu ada macem2.
    // shaders -> sebuah source code yg akan di-run oleh gpu

    // vertex shader
    var vertexShaderCode = `
    attribute vec2 aPosition;
    void main(){ 
      float x = aPosition.x;
      float y = aPosition.y;
      gl_PointSize = 10.0;
      //kita pake vec4 karena 4 dimensi (?)
      gl_Position = vec4(aPosition.xy, 0.0, 1.0);
    }`;
  
    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); //sampai sini udah jadi .o
  
    // itu gaya nulisnya doang yg beda y
    // fragment shader
    var fragmentShaderCode = `
    precision mediump float;
    //klo kita mau make float, kita harus pake precision
      void main(){ 
        float r = 0.0;
        float g = 0.0;
        float b = 1.0;
        gl_FragColor = vec4(r, g, b, 1.0);
      }
      `;
    var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject); //sampai sini jadi .o
  
    var shaderProgram = gl.createProgram(); // wadah dari excecutable (.exe)
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram); //kita siap untuk menggambar (scr analogi)

    // kita mengajari GPU bagaimana cara mengoleksi
    // nilai posisi dari ARRAY_BUFFER
    // untuk setiap vertex yang sedang diproses
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    //gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, normalized, stride, offset)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0) //tu 0 karena ada 1 data doang
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 0.65, 0.0, 1.0); //(merah, hijau, biru, transparansi)
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    gl.drawArrays(gl.POINTS, 0, 3); //(first -> dari index brp kita mau nulis datanya. count -> kita mau gambar/render brp kali)

  }