import m4 from './m4.js'
import { radToDeg, degToRad } from './mathSupporter.js';

class Camera {
    static translation = [-150, 10, -360];
    static rotation = [degToRad(40), degToRad(25), degToRad(325)];
    static scale = [1, 1, 1];
    static fieldOfViewRadians = degToRad(60);
    static zNear = 1;
    static zFar = -2000;
    static aspect;
    static gl;
    static matrix;
    
    static {
        this.gl = document.querySelector("#canvas").getContext("webgl");
        if (!this.gl) alert("ur browser not support webgl");
        
        this.updateCamera();
    }

    static getMatrix() {
        return Camera.matrix;
    }

    static updateFieldOfView(event, ui) {
        Camera.fieldOfViewRadians = degToRad(ui.value);
        this.updateCamera();
    }
    
    static updatePosition(index) {
        return function(event, ui) {
            Camera.translation[index] = ui.value;
            Camera.updateCamera();
        };
    }

    static updateRotation(index) {
        return function(event, ui) {
            var angleInDegrees = ui.value;
            var angleInRadians = angleInDegrees * Math.PI / 180;

            Camera.rotation[index] = angleInRadians;
            Camera.updateCamera();
        };
    }

    static updateScale(index) {
            return function(event, ui) {
            Camera.scale[index] = ui.value;
            Camera.updateCamera();
        };
    }

    static updateCamera() {
        this.aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    
        this.matrix = m4.perspective(this.fieldOfViewRadians, this.aspect, this.zNear, this.zFar);
        this.matrix = m4.translate(this.matrix, this.translation[0], this.translation[1], this.translation[2]);
        this.matrix = m4.xRotate(this.matrix, this.rotation[0]);
        this.matrix = m4.yRotate(this.matrix, this.rotation[1]);
        this.matrix = m4.zRotate(this.matrix, this.rotation[2]);
        this.matrix = m4.scale(this.matrix, this.scale[0], this.scale[1], this.scale[2]);
    }
}

export default Camera;