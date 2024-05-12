"use strict";
import * as shader from './shaders/shadersPackage.js'
import { radToDeg, degToRad } from './mathSupporter.js';
import Camera from './camera.js';

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

//#region настройка цвета
        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        setCuboidColors(gl);
//#endregion

    setInterval(drawScene, 30);
//#region Слайдеры.
    webglLessonsUI.setupSlider("#fieldOfView", {value: radToDeg(Camera.fieldOfViewRadians), slide: Camera.updateFieldOfView, min: 1, max: 179});
    webglLessonsUI.setupSlider("#x", {value: Camera.translation[0], slide: Camera.updatePosition(0), min: -200, max: 200 });
    webglLessonsUI.setupSlider("#y", {value: Camera.translation[1], slide: Camera.updatePosition(1), min: -200, max: 200});
    webglLessonsUI.setupSlider("#z", {value: Camera.translation[2], slide: Camera.updatePosition(2), min: -1000, max: 0});
    webglLessonsUI.setupSlider("#angleX", {value: radToDeg(Camera.rotation[0]), slide: Camera.updateRotation(0), max: 360});
    webglLessonsUI.setupSlider("#angleY", {value: radToDeg(Camera.rotation[1]), slide: Camera.updateRotation(1), max: 360});
    webglLessonsUI.setupSlider("#angleZ", {value: radToDeg(Camera.rotation[2]), slide: Camera.updateRotation(2), max: 360});
    webglLessonsUI.setupSlider("#scaleX", {value: Camera.scale[0], slide: Camera.updateScale(0), min: -5, max: 5, step: 0.01, precision: 2});
    webglLessonsUI.setupSlider("#scaleY", {value: Camera.scale[1], slide: Camera.updateScale(1), min: -5, max: 5, step: 0.01, precision: 2});
    webglLessonsUI.setupSlider("#scaleZ", {value: Camera.scale[2], slide: Camera.updateScale(2), min: -5, max: 5, step: 0.01, precision: 2});
//#endregion


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
        
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setCuboidPoints(gl, 0, 0, 0, 100, 100, 100);
        
        gl.uniformMatrix4fv(matrixLocation, false, Camera.getMatrix());
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 36;
        gl.drawArrays(primitiveType, offset, count);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setCuboidPoints(gl, 300, 0, 0, 100, 100, 100);

        gl.uniformMatrix4fv(matrixLocation, false, Camera.getMatrix());
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
