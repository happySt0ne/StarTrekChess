import Tile from "./tile.js";
import GameObject from "./gameObject.js";

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

    get () {
        if (arguments.length === 3) {
            return this.#getByPoints(arguments[0], arguments[1], arguments[2]);
        } else {
            return this.#getByPosition(arguments[0]);
        }
    }

    #getByPosition (position) {
        return this.#getByPoints(position.layer, position.x, position.z);
    }

    #getByPoints(layer, x, z) {
        if (layer > constants.layersCount ||
            x > constants.deskWidthTiles ||
            z > constants.deskLengthTiles ||
            layer < 1 ||
            x < 1 || 
            z < 1 
        ) {
            return null;
        }
        
        return this.#desks[layer-1][z-1][x-1];
    }

    constructor(x, y, z, yGap) {
        super(x, y, z);

        this.#desks = []
        this.#desks.push(this.#createLayer(x + 4*Tile.size.width, y - 2*yGap, z, lowerLayerPredicate));
        this.#desks.push(this.#createLayer(x + 2*Tile.size.width, y - yGap, z, middleLayerPredicate));
        this.#desks.push(this.#createLayer(x, y, z, topLayerPredicate));
    }

    draw() {
        for (var z = 0; z < constants.layersCount; ++z) {

            for (var i = 0; i < constants.deskWidthTiles; ++i) {
                
                for (var j = 0; j < constants.deskLengthTiles; ++j) {
    
                    this.#desks[z][i][j].draw();
                }
            }
        }
    }

    #createLayer(x, y, z, predicate) {
        var desk = [];
    
        for (var i = 0; i < constants.deskLengthTiles; ++i) {
            
            var row = [];
            for (var j = 0; j < constants.deskWidthTiles; ++j) {
                
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
    
            desk.push(row);
        }
    
        return desk;
    }
}

export default Desk;
