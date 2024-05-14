import m4 from '../supportStuff/m4.js'
import { radToDeg, degToRad } from '../supportStuff/mathSupporter.js';

class Camera {
    static translation = [-150, 10, -360];
    static rotation = [degToRad(0), degToRad(0), degToRad(0)];
    static scale = [1, 1, 1];
    static fieldOfViewRadians = degToRad(60);
    static zNear = 1;
    static zFar = -2000;
    static aspect;
    static gl;
    static matrix;
    static movementSpeed = 10;
    static rotationSpeed = 5;
    
    static {
        this.gl = document.querySelector("#canvas").getContext("webgl");
        if (!this.gl) alert("ur browser not support webgl");
        this.aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        
        this.updateCamera();
    }

    static getMatrix() {
        return Camera.matrix;
    }
    
    static updatePosition(index, direction = 1) {
        this.translation[index] += this.movementSpeed * direction;
        this.updateCamera();
    }

    static updateRotation(index, direction = 1) {
        Camera.rotation[index] += degToRad(this.rotationSpeed) * direction;
        Camera.updateCamera();
    }

    static updateCamera() {
        this.matrix = m4.perspective(this.fieldOfViewRadians, this.aspect, this.zNear, this.zFar);
        this.matrix = m4.translate(this.matrix, this.translation[0], this.translation[1], this.translation[2]);
        this.matrix = m4.xRotate(this.matrix, this.rotation[0]);
        this.matrix = m4.yRotate(this.matrix, this.rotation[1]);
        this.matrix = m4.zRotate(this.matrix, this.rotation[2]);
    }
}

export default Camera;