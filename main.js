function main(){
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    // Vertex shader => nanti kita pake untuk mendeklarasikan string
    var vertexShaderCode =
    "void main() {" +
    "}";
    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); //sampai sini udah jadi .o

    // Fragment shader
    var fragmentShaderCode = `
    void main() {

    }
    `;
    var fragmentShaderObject = gl.createShader (gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject); //sampai sini sudah jadi .o

    var shaderProgram =(gl.createProgram); //wadah dari executable (.exe)
    gl.attackShader(shaderProgram, vertexShaderObject);
    gl.attackShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram); //<3
    //kalau kamu ada gl lebih dari 1, <3 dibuat jadi gl1 gl2

    gl.clearColor(1.0,   0.65,   0.0,   1.0);
    //           Merah   Hijau   Biru   Transparan
    gl.clear(gl.COLOR_BUFFER_BIT);


    // di vartex sama fragment itu gaya nulisnya doang yg beda
}