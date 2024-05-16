"use strict";
import * as shader from './shaders/shadersPackage.js'
import cameraController from './engine/cameraController.js';
import Tile from './engine/gameObjects/tile.js';
import GameObject from './engine/gameObjects/gameObject.js';
import Desk from './engine/gameObjects/desk.js';
import { 
    setShaderColorAttrib, 
    setShaderPositionAttrib 
} from './supportStuff/shaderAttributes.js';

function main() { 
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl");

    if (!gl) {
        alert('Ваш браузер не поддерживает WebGl');
        return;
    }
    
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
        new Desk(-300, 200, -500, 200),
        new GameObject(0, 0, 0)
    ];

    var a = listObject[0].get(1, 3, 2);    
    a.color = '';
    setInterval(drawScene, 30);

    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        gl.useProgram(program);

        setShaderPositionAttrib(positionLocation, positionBuffer);

        setShaderColorAttrib(colorLocation, colorBuffer);
        
        listObject.forEach((e) => e.draw());
    }
}

main();
