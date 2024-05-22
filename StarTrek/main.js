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
import Figure from './engine/gameObjects/figure.js';
import FigureController from './engine/figureController.js';
import figureTypes from './engine/figureTypes.js';

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
    
    FigureController.setupUiController();

    cameraController.enableCameraController();
    
    GameObject.setBuffers(positionBuffer, colorBuffer);
    GameObject.setMatrixLocation(matrixLocation);
    
    var c = new Figure(0, 0, -500, 'black', figureTypes.Pawn);
    var c2 = new Figure(0, 0, 0, 'white', figureTypes.Pawn);
    var c3 = new Figure(0, 0, -500, 'black', figureTypes.Pawn);

    var desk = new Desk(-300, 200, -500, 200);

    FigureController.setDesk(desk);

    var gameObjects = [
        desk,
        c, c2, c3
    ];

    gameObjects[0].get(3, 3, 1).setFigure(c);
    gameObjects[0].get(1, 3, 3).setFigure(c2);
    gameObjects[0].get(1, 2, 4).setFigure(c3);

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

        // Дальше можно отрисовывать объекты.
        gameObjects.forEach((e) => e.draw());
    }
}

main();
