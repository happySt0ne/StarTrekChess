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
        return this.#desks.flat(Infinity).find(t => t != null && t.figure === figure);
    }

    #getByPoints(layer, x, z) {
        if (layer > 4 || x > 10 ||z > 6 
            || layer < 1 || x < 1 || z < 1) {

            return null;
        }
        
        return this.#desks[layer-1][z-1][x-1];
    }

    getTilePosition(tile) {
        var y = (this.position.y - tile.position.y) / this.#yGap;
        var x = (tile.position.x - this.position.x) / Tile.size.width;
        var z = (tile.position.z - this.position.z) / Tile.size.depth;

        return new ChessPosition(3-y, x+1, z+1);
    }

    constructor(x, y, z, yGap) {
        super(x, y, z);

        this.#yGap = yGap;
        this.#desks = []
        
        this.#desks.push(this.#createLayer(x, y - 2*yGap, z, lowerLayerPredicate, 2));
        this.#desks.push(this.#createSecondLayer(x, y-yGap, z));
        this.#desks.push(this.#createLayer(x, y, z, topLayerPredicate, 0));
        this.#desks.push(this.#createFirthLayer(x, y + yGap, z));
    }

    draw() {

        for (const a of this.#desks.flat(Infinity)) {
            if (a != null) {
                a.draw();
            }
        }
    }

    #createFirthLayer(x, y, z) {
        var desk = [];

        for (var j = 0; j < 6; ++j) {

            if (j == 2 || j == 3) {
                row = [null, null, null, null, null, null, null, null, null, null];
                desk.push(row);
                continue;
            }

            var row = []
            for (var i = 0; i < 2; ++i) {
                var xPos = x + Tile.size.width*i;
                var zPos = z + Tile.size.depth*j;

                row.push(
                    new Tile(
                        xPos, y, zPos, 
                        (i+j)%2 == 0 ? 'white' : 'black',
                         false
                    )
                );
            }
    
            for (var i = 0; i < 8; ++i) {
                row.push(null);
            }

            desk.push(row);
        }

        return desk;
    }

    #createSecondLayer(x, y, z) {
        var desk = [];

        for (var j = 0; j < 6; ++j) {
            var row = [];

            if (j == 0 || j == 5) {
                row = [null, null, null, null, null, null, null, null, 
                
                    new Tile(x + 8*Tile.size.width, y, z + j*Tile.size.depth, 
                        j%2 == 0? 'white' : 'black'),

                    new Tile(x + 9*Tile.size.width, y, z + j*Tile.size.depth, 
                        j%2 == 1? 'white' : 'black')
                ];

                desk.push(row);
                continue;
            }

            for (var i = 0; i < 10; ++i) {
                if (i < 3) {
                    row.push(null);
                    continue;
                }

                if (i == 7) {
                    row.push(null);
                    continue;
                }

                if (i > 6) {
                    if (j == 2 || j == 3) {
                        row.push(null);
                        continue;
                    }
                    var xPos = x + i*Tile.size.width;
                    var zPos = z + j*Tile.size.depth;
                        
                    row.push(
                        new Tile(
                            xPos, y, zPos, 
                            (j+i)%2 === 0 ? 'white' : 'black',
                            false
                        )
                    );
                    continue;
                }

                var xPos = x + i*Tile.size.width;
                var zPos = z + j*Tile.size.depth;
                    
                row.push(
                    new Tile(
                        xPos, y, zPos, 
                        (j+i)%2 === 0 ? 'white' : 'black',
                        false
                    )
                );

            }

            desk.push(row);
        }

        

        return desk;
    }

    #createLayer(x, y, z, predicate, layer) {
        var desk = [];

        for (var i = 0; i < 6; ++i) {
            
            if (i == 0 || i == 5) {
                var row = [null, null, null, null, null, null, null, null, null, null];
                desk.push(row);
                continue;
            }

            var row = [];

            for (var j = 0; j < 10; ++j) {
                
                if (j < layer*2+1) {
                    row.push(null);
                    continue;
                }

                if (j > layer*2+4) {
                    row.push(null);
                    continue;
                }

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
