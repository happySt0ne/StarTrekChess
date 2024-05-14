import Camera from "../camera.js";
import { setCuboidColors, setCuboidPoints } from '../../shaders/shadersHelper.js';

class Tile {
    position;
    color;
    
    static positionBuffer;
    static matrixLocation;
    static gl;
    static colorBuffer;

    static setBuffers(positionBuffer, colorBuffer) {
        this.positionBuffer = positionBuffer;
        this.colorBuffer = colorBuffer;
    }

    /**
     * Нужно для работы камеры.
    */
    static setMatrixLocation(matrixLocation) {
        Tile.matrixLocation = matrixLocation;
    }

    static {
        Tile.gl = document.querySelector("#canvas").getContext("webgl");
        if (!Tile.gl) alert('Ваш браузер не поддерживает webgl.');
    }

    constructor(x, y, z) { 
        this.position = {
            x: x,
            y: y,
            z: z
        };
    }

    draw() {
        Tile.gl.bindBuffer(Tile.gl.ARRAY_BUFFER, Tile.colorBuffer);
        setCuboidColors();

        Tile.gl.uniformMatrix4fv(Tile.matrixLocation, false, Camera.getMatrix());
        
        Tile.gl.bindBuffer(Tile.gl.ARRAY_BUFFER, Tile.positionBuffer);
        setCuboidPoints(
            this.position.x, this.position.y, this.position.z, 100, 100, 100
        );

        var primitiveType = Tile.gl.TRIANGLES;
        var offset = 0;
        var count = 36;
        Tile.gl.drawArrays(primitiveType, offset, count);
    }
}

export default Tile;
