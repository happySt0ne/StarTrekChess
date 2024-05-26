"use strict";
import { 
    setShaderColorAttrib, setShaderPositionAttrib 
} from './supportStuff/shaderAttributes.js';

import * as shader from './shaders/shadersPackage.js'
import Game from './engine/game.js';
import './supportStuff/setExtencions.js'

function main() { 
    var gl = document.querySelector("#canvas").getContext("webgl");

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

    var setupData = {
        positionBuffer : positionBuffer,
        colorBuffer : colorBuffer,
        matrixLocation: matrixLocation
    };

    var game = new Game(setupData);

    gl.useProgram(program);

    setInterval(drawScene, 30);
    
    function drawScene() {
        setShaderPositionAttrib(positionLocation, positionBuffer);
        setShaderColorAttrib(colorLocation, colorBuffer);

        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        game.draw();
    }
}

main();
