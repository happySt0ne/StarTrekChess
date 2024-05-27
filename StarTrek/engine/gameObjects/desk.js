import Tile from "./tile.js";
import GameObject from "./gameObject.js";
import Figure from "./figure.js";
import ChessPosition from "../chessPosition.js";

const constants = {
    layersCount: 3,
    deskWidthTiles: 4,
    deskLengthTiles: 4
};

const topLayerPredicate = element => element > 1;
const middleLayerPredicate = element => true;
const lowerLayerPredicate = element => element < 2;

class Desk extends GameObject {
    #desks;
    #yGap;

    get () {
        if (arguments.length === 1 && arguments[0] instanceof Figure) {
            return this.#getTileByFigure(arguments[0]);
        } else if (arguments.length === 3) {
            return this.#getByPoints(arguments[0], arguments[1], arguments[2]);
        } else if (arguments.length === 1) {
            return this.#getByPosition(arguments[0]);
        }
    }

    #getByPosition (position) {
        return this.#getByPoints(position.layer, position.x, position.z);
    }

    #getTileByFigure(figure) {
        return this.#desks.flat(Infinity).find(t => t.figure === figure);
    }

    #getByPoints(layer, x, z) {
        console.log(layer-1, x, z-1);
        if (layer > constants.layersCount ||
            x > 8 ||
            z > constants.deskLengthTiles ||
            layer < 1 ||
            x < 1 || 
            z < 1 
        ) {
            return null;
        }
        
        return this.#desks[layer-1][z-1][x-1];
    }

    getTilePosition(tile) {
        var y = (this.position.y - tile.position.y) / this.#yGap;
        var x = (tile.position.x - this.position.x) / Tile.size.width - 2*y;
        var z = (tile.position.z - this.position.z) / Tile.size.depth;

        return new ChessPosition(3-y, x+1, z+1);
    }

    constructor(x, y, z, yGap) {
        super(x, y, z);

        this.#yGap = yGap;
        this.#desks = []
        
        this.#desks.push(this.#createLayer(x + 4*Tile.size.width, y - 2*yGap, z, lowerLayerPredicate, 2));
        this.#desks.push(this.#createLayer(x + 2*Tile.size.width, y - yGap, z, middleLayerPredicate, 1));
        this.#desks.push(this.#createLayer(x, y, z, topLayerPredicate, 0));
    }

    draw() {

        for (const a of this.#desks.flat(Infinity)) {
            if (a != null) {
                a.draw();
            }
        }
    }

    #createLayer(x, y, z, predicate, layer) {
        var desk = [];

        for (var i = 0; i < constants.deskWidthTiles; ++i) {
            
            var row = [];
            
            for (var k = 0; k < layer*2; ++k) {
                row.push(null);
            }

            for (var j = 0; j < constants.deskLengthTiles; ++j) {
                

                var xPos = x + j*Tile.size.width;
                var zPos = z + i*Tile.size.depth;
                row.push(
                    new Tile(
                        xPos, y, zPos, 
                        (j+i)%2 === 0 ? 'white' : 'black',
                        predicate(j)
                    )
                );

            }
            
            for (var k = 0; k < 4 - layer*2; ++k) {
                row.push(null);
            }
            
            desk.push(row);
        }
    
        return desk;
    }
}

export default Desk;
