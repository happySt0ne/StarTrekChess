"use strict";
import * as shader from './shaders/shadersPackage.js'
import m4 from './m4.js'
import { radToDeg, degToRad } from './mathSupporter.js';

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
    setCuboidColors(gl);

    var translation = [-150, 10, -360];
    var rotation = [degToRad(40), degToRad(25), degToRad(325)];
    var scale = [1, 1, 1];
    var fieldOfViewRadians = degToRad(60);

    drawScene();

    webglLessonsUI.setupSlider("#fieldOfView", {value: radToDeg(fieldOfViewRadians), slide: updateFieldOfView, min: 1, max: 179});
    webglLessonsUI.setupSlider("#x", {value: translation[0], slide: updatePosition(0), min: -200, max: 200 });
    webglLessonsUI.setupSlider("#y", {value: translation[1], slide: updatePosition(1), min: -200, max: 200});
    webglLessonsUI.setupSlider("#z", {value: translation[2], slide: updatePosition(2), min: -1000, max: 0});
    webglLessonsUI.setupSlider("#angleX", {value: radToDeg(rotation[0]), slide: updateRotation(0), max: 360});
    webglLessonsUI.setupSlider("#angleY", {value: radToDeg(rotation[1]), slide: updateRotation(1), max: 360});
    webglLessonsUI.setupSlider("#angleZ", {value: radToDeg(rotation[2]), slide: updateRotation(2), max: 360});
    webglLessonsUI.setupSlider("#scaleX", {value: scale[0], slide: updateScale(0), min: -5, max: 5, step: 0.01, precision: 2});
    webglLessonsUI.setupSlider("#scaleY", {value: scale[1], slide: updateScale(1), min: -5, max: 5, step: 0.01, precision: 2});
    webglLessonsUI.setupSlider("#scaleZ", {value: scale[2], slide: updateScale(2), min: -5, max: 5, step: 0.01, precision: 2});

    function updateFieldOfView(event, ui) {
        fieldOfViewRadians = degToRad(ui.value);
        drawScene();
    }

    function updatePosition(index) {
        return function(event, ui) {
        translation[index] = ui.value;
        drawScene();
        };
    }

    function updateRotation(index) {
        return function(event, ui) {
        var angleInDegrees = ui.value;
        var angleInRadians = angleInDegrees * Math.PI / 180;
        rotation[index] = angleInRadians;
        drawScene();
        };
    }

    function updateScale(index) {
        return function(event, ui) {
        scale[index] = ui.value;
        drawScene();
        };
    }

    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.enable(gl.DEPTH_TEST);

        gl.useProgram(program);

        gl.enableVertexAttribArray(positionLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        var size = 3;         
        var type = gl.FLOAT;  
        var normalize = false;
        var stride = 0;       
        var offset = 0;       
        gl.vertexAttribPointer(
            positionLocation, size, type, normalize, stride, offset);

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

        var left = 0;
        var right = gl.canvas.clientWidth;
        var bottom = gl.canvas.clientHeight;
        var top = 0;
        var near = 100;
        var far = -500;
        
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = -2000;

        var matrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
        matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
        matrix = m4.xRotate(matrix, rotation[0]);
        matrix = m4.yRotate(matrix, rotation[1]);
        matrix = m4.zRotate(matrix, rotation[2]);
        matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setCuboidPoints(gl, 0, 0, 0, 100, 100, 100);
        
        gl.uniformMatrix4fv(matrixLocation, false, matrix);
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 36;
        gl.drawArrays(primitiveType, offset, count);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setCuboidPoints(gl, 300, 0, 0, 100, 100, 100);

        gl.uniformMatrix4fv(matrixLocation, false, matrix);
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 36;
        gl.drawArrays(primitiveType, offset, count);
    }
}

function setCuboidPoints(gl, x, y, z, width, height, depth) {
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

function setCuboidColors(gl) {
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

main();
