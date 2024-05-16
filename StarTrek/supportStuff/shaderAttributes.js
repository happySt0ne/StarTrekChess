var gl = document.querySelector("#canvas").getContext("webgl");

function setShaderPositionAttrib(positionLocation, positionBuffer) {
    gl.enableVertexAttribArray(positionLocation);

    var size = 3;         
    var type = gl.FLOAT;  
    var normalize = false;
    var stride = 0;       
    var offset = 0;       
    gl.vertexAttribPointer(
        positionLocation, size, type, normalize, stride, offset
    );
}

function setShaderColorAttrib(colorLocation, colorBuffer) {
    gl.enableVertexAttribArray(colorLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    var size = 3;                 
    var type = gl.UNSIGNED_BYTE;  
    var normalize = true;         
    var stride = 0;               
    var offset = 0;               
    gl.vertexAttribPointer(
        colorLocation, size, type, normalize, stride, offset
    );
}

export { setShaderColorAttrib, setShaderPositionAttrib };
