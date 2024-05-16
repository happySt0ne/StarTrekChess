import Camera from "../camera.js";
import { setCuboidColors, setCuboidPoints, setCuboidColorBlack, setCuboidColorWhite } from '../../shaders/shadersHelper.js';

class GameObject {
    position;

    static positionBuffer;
    static matrixLocation;
    static colorBuffer;

    static size = {
        width: 100,
        height: 100,
        depth: 100
    };

    static {
        GameObject.gl = document.querySelector("#canvas").getContext("webgl");
        if (!GameObject.gl) alert('Ваш браузер не поддерживает webgl.');
    }

    constructor(x, y, z) {
        this.position = {
            x: x,
            y: y,
            z: z
        };
    }

    /**
     * Нужно для работы камеры.
    */
    static setMatrixLocation(matrixLocation) {
        this.matrixLocation = matrixLocation;
    }
    
    static setBuffers(positionBuffer, colorBuffer) {
        this.positionBuffer = positionBuffer;
        this.colorBuffer = colorBuffer;
    }

    setObjectColor() {
        setCuboidColors();
    }

    draw() {
        GameObject.gl.bindBuffer(GameObject.gl.ARRAY_BUFFER, GameObject.colorBuffer);
        this.setObjectColor();
        GameObject.gl.uniformMatrix4fv(GameObject.matrixLocation, false, Camera.getMatrix());
        
        GameObject.gl.bindBuffer(GameObject.gl.ARRAY_BUFFER, GameObject.positionBuffer);
        setCuboidPoints(
            this.position.x, this.position.y, this.position.z, 
            this.constructor.size.width, this.constructor.size.height, this.constructor.size.depth
        );

        var primitiveType = GameObject.gl.TRIANGLES;
        var offset = 0;
        var count = 36;
        GameObject.gl.drawArrays(primitiveType, offset, count);
    }
}

export default GameObject
