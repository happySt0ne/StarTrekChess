import Camera from "../camera.js";
import { setCuboidColors, setCuboidPoints, setCuboidColorBlack, setCuboidColorWhite } from '../../shaders/shadersHelper.js';
import Position from "../types/position.js";
import Size from "../types/size.js";

class GameObject {
    position;

    static positionBuffer;
    static matrixLocation;
    static colorBuffer;

    static size = new Size(100, 100, 100);

    static {
        GameObject.gl = document.querySelector("#canvas").getContext("webgl");
        if (!GameObject.gl) alert('Ваш браузер не поддерживает webgl.');
    }

    constructor(x, y, z) {
        this.position = new Position(x, y, z);
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

    draw(position = this.position, size = this.constructor.size) {
        GameObject.gl.bindBuffer(GameObject.gl.ARRAY_BUFFER, GameObject.colorBuffer);
        this.setObjectColor();
        GameObject.gl.uniformMatrix4fv(GameObject.matrixLocation, false, Camera.getMatrix());
        
        GameObject.gl.bindBuffer(GameObject.gl.ARRAY_BUFFER, GameObject.positionBuffer);
        
        setCuboidPoints(
            position.x, position.y, position.z, 
            size.width, size.height, size.depth
        );

        var primitiveType = GameObject.gl.TRIANGLES;
        var offset = 0;
        var count = 36;
        GameObject.gl.drawArrays(primitiveType, offset, count);
    }
}

export default GameObject
