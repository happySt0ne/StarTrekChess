import Figure from "../figure.js";
import figureTypes from "../../types/figureTypes.js";
import Size from "../../types/size.js";
import Position from "../../types/position.js";

class Bishop extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.Bishop);
    }

    static size = new Size(10, 35, 10);

    draw() {
        var firstPlatformSize = new Size(this.constructor.size);
        firstPlatformSize.height = 10;
        firstPlatformSize.width = 30;
        firstPlatformSize.depth = 30;

        var constructorSize = this.constructor.size;

        var firstPlatformPos = new Position(this.position);
        firstPlatformPos.y += this.constructor.size.height;
        firstPlatformPos.x -= Math.abs(constructorSize.width - firstPlatformSize.width)/2;
        firstPlatformPos.z -= Math.abs(constructorSize.depth - firstPlatformSize.depth)/2;

        var secondPlatformSize = new Size(firstPlatformSize);
        secondPlatformSize.width /= 2;
        secondPlatformSize.depth /= 2;

        var secondPlatformPos = new Position(firstPlatformPos);
        secondPlatformPos.y += firstPlatformSize.height;
        secondPlatformPos.x += secondPlatformSize.width / 2;
        secondPlatformPos.z += secondPlatformSize.depth / 2;

        super.draw();
        super.draw(firstPlatformPos, firstPlatformSize);
        super.draw(secondPlatformPos, secondPlatformSize);

        var platformSize = new Size(50, 5, 50);
        var platformPos = new Position(this.position);
        platformPos.x -= Math.abs(Bishop.size.width - platformSize.width)/2;
        platformPos.z -= Math.abs(Bishop.size.depth - platformSize.depth)/2;

        super.draw(platformPos, platformSize);
    }
}

export default Bishop;
