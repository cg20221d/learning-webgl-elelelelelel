function main(){
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    // Vertex shader => nanti kita pake untuk mendeklarasikan string
    var vertexShaderCode =
    "void main() {" +
    "}";

    // Fragment shader
    var fragmentShaderCode = `
    void main() {

    }
    `;
}