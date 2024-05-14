var gl = document.querySelector("#canvas").getContext("webgl");

function setCuboidPoints(x, y, z, width, height, depth) {
    var x2 = x + width;
    var y2 = y + height;
    var z2 = z + depth;
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        // передняя грань
        x, y, z,
        x2, y, z,
        x2, y2, z,
        
        x2, y2, z,
        x, y2, z,
        x, y, z,
  
        // левая грань
        x, y, z,
        x, y, z2,
        x, y2, z2,
  
        x, y2, z2,
        x, y2, z,
        x, y, z,
  
        // верхняя грань
        x, y, z,
        x, y, z2,
        x2, y, z,
        
        x2, y, z,
        x2, y, z2,
        x, y, z2,
  
        // задняя грань
        x, y, z2,
        x, y2, z2,
        x2, y2, z2,
  
        x, y, z2,
        x2, y, z2,
        x2, y2, z2,
  
        // нижняя грань
        x2, y2, z2,
        x2, y2, z,
        x, y2, z2,
  
        x, y2, z2,
        x, y2, z,
        x2, y2, z,
  
        // правая грань
        x2, y, z,
        x2, y, z2,
        x2, y2, z2,
  
        x2, y2, z2,
        x2, y2, z,
        x2, y, z,
    ]), gl.STATIC_DRAW);
  }
  
function setCuboidColors() {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array([
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,

                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,

                200,  70, 120,
                200,  70, 120,
                200,  70, 120,
                200,  70, 120,
                200,  70, 120,
                200,  70, 120,

                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,

                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,

                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
        ]),
    gl.STATIC_DRAW);
}

export {setCuboidColors, setCuboidPoints}