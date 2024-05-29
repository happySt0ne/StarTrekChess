var gl = document.querySelector("#canvas").getContext("webgl");

function setStrokeCuboidPoints(x, y, z, width, height, depth) {
    var x2 = x + width;
    var y2 = y + height;
    var z2 = z + depth;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        // нижний
        x, y, z, x2, y, z,
        x2, y, z, x2, y, z2,
        x2, y, z2, x, y, z2,
        x, y, z2, x, y, z,
        
        // передняя
        x, y, z, x, y2, z,
        x, y2, z, x2, y2, z,
        x2, y2, z, x2, y, z,
        x2, y, z, x, y, z,

        // правая
        x2, y2, z, x2, y2, z2,
        x2, y2, z2, x2, y, z2,
        x2, y, z2, x2, y, z,
        x2, y, z, x2, y2, z,

        // левая
        x, y, z, x, y, z2,
        x, y, z2, x, y2, z2,
        x, y2, z2, x, y2, z,
        x, y2, z, x, y, z,
        
        // Задняя
        x, y, z2, x, y2, z2,
        x, y2, z2, x2, y2, z2,
        x2, y2, z2, x2, y, z2,
        x2, y, z2, x, y, z2,

        // Верхняя
        x, y2, z, x, y2, z2,
        x, y2, z2, x2, y2, z2,
        x2, y2, z2, x2, y2, z,
        x2, y2, z, x, y2, z,

    ]), gl.STREAM_DRAW);
}

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
    ]), gl.STREAM_DRAW);
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

function setCuboidColorGreen() {
    var array = new Uint8Array(
        [...Array(118)].map((_, index) => (index % 3 === 1) ? 80 : 0)
    );
    
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
}

function setCuboidColorRed() {
    var array = new Uint8Array(
        [...Array(118)].map((_, index) => (index % 3 === 0) ? 190 : 0)
    );
    
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
}

function setCuboidColorWhite() {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array([...Array(118)].map(() => 255)),
    gl.STATIC_DRAW);
}

function setCuboidColorBlack() {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array([...Array(118)].map(() => 0)),
    gl.STATIC_DRAW);
}

export {
    setCuboidColors, setCuboidPoints, 
    setCuboidColorBlack, setCuboidColorWhite, 
    setCuboidColorRed, setCuboidColorGreen,
    setStrokeCuboidPoints
}