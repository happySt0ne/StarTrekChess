"use strict";
import * as shader from './shaders/shadersPackage.js'
import Camera from './engine/camera.js';
import cameraController from './engine/cameraController.js';
import { setCuboidColors, setCuboidPoints } from './shaders/shadersHelper.js';
import Tile from './engine/gameObjects/tile.js';
import GameObject from './engine/gameObjects/gameObject.js';

function main() { 
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl");
    if (!gl) return;
    
    var program = webglUtils.createProgramFromSources(
        gl, [shader.vertexShaderCode, shader.fragmentShaderCode]
    );

    var positionLocation = gl.getAttribLocation(program, "a_position");
    var colorLocation = gl.getAttribLocation(program, "a_color");

    var matrixLocation = gl.getUniformLocation(program, "u_matrix");

    var positionBuffer = gl.createBuffer();
    var colorBuffer = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    
    cameraController.enableCameraController();
    
    GameObject.setBuffers(positionBuffer, colorBuffer);
    GameObject.setMatrixLocation(matrixLocation);

    var listObject = [
        new Tile(1, 1, 1), 
        new Tile(1, 150, 1)
    ];

    setInterval(drawScene, 30);

    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        gl.useProgram(program);

        gl.enableVertexAttribArray(positionLocation);

        var size = 3;         
        var type = gl.FLOAT;  
        var normalize = false;
        var stride = 0;       
        var offset = 0;       
        gl.vertexAttribPointer(
            positionLocation, size, type, normalize, stride, offset
        );

        gl.enableVertexAttribArray(colorLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

        var size = 3;                 
        var type = gl.UNSIGNED_BYTE;  
        var normalize = true;         
        var stride = 0;               
        var offset = 0;               
        gl.vertexAttribPointer(
            colorLocation, size, type, normalize, stride, offset
        );
        
        listObject.forEach((e) => {e.draw()});
    }
}

main();
