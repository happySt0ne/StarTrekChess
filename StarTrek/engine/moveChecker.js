import figureTypes from "./figureTypes.js";

class MoveChecker {
    static #desk;
    
    static setDesk(desk) {
        this.#desk = desk;
    }

    static #getFigure(position) {
        var figure = this.#desk.get(
            position.layer, 
            position.x, 
            position.z
        ).figure;

        return figure;
    }

    /**
     * 
     * @param {Object} startPosition - должен иметь в себе layer, x, z
     * @param {Object} endPosition - должен иметь в себе layer, x, z
     * @returns {boolean} - Возможен ли данный ход
     */
    static checkMove(startPosition, endPosition) {
        var figure = this.#getFigure(startPosition);

        if (!!figure && figure.type in this.#checkFunc) {

            var result = this.#checkFunc[figure.type](startPosition, endPosition);
        } else {
            alert('Фигура неизвестного типа.');
            return false;
        }

        return result;
    }

    static #isTileNull(tile, outRes) {
        if (tile == null) {

        }
    }

    static #checkUpperLayerMoves(startPosition, range, direction) {
        let newLayer = parseInt(startPosition.layer) + 1;
        let newXPos = parseInt(startPosition.x) + 2;
        console.log(newXPos);  
        let newRange = range ;//- (parseInt(startPosition.x) + 2 - newXPos);

        let newStartPos = {
            layer: newLayer,
            x: newXPos,
            z: startPosition.z
        };

        return this.#checkXEnableMoves(newStartPos, newRange, direction);
    }

    static #checkXEnableMoves(startPosition, range, direction) {
        var enableMoves = [];
        console.log("pizda " + startPosition.layer + " " + startPosition.x + " " + startPosition.z);
        // if (startPosition.layer > 2) {
        //     return {
        //         enableMoves: enableMoves,
        //         moveToKill: null
        //     };
        // }

        for (var i = 0; i <= range - 1; ++i) {
            var xToCheck = parseInt(startPosition.x) + i*direction;
            
            var tile = 
                this.#desk.get(startPosition.layer, xToCheck, startPosition.z);

            var tile2 = 
                this.#desk.get(startPosition.layer, startPosition.x, startPosition.z);

            if (tile == null || tile2 == null) {
                console.log("hui " + enableMoves.length);
                return {
                    enableMoves: enableMoves,
                    moveToKill: null
                };
            }

            if (tile.figure != null) {

                return {
                    enableMoves: enableMoves,
                    moveToKill: tile
                };
            }

            if (tile.isDouble && (startPosition.layer == 1 || startPosition.layer == 2) && xToCheck < 3) {
                let positionToCheck = {
                    layer: startPosition.layer,
                    x: xToCheck,
                    z: startPosition.z
                };
                let upperMoveInfo = this.#checkUpperLayerMoves(positionToCheck, range - i, direction);
                enableMoves = enableMoves.concat(upperMoveInfo.enableMoves);
            }

            enableMoves.push(tile);
        }

        return {
            enableMoves: enableMoves,
            moveToKill: null
        };
    }

    static #checkDiagEnableMoves(startPosition, range, directionX, directionZ) {
        var enableMoves = [];

        for (var i = 1; i <= range; ++i) {
            
            var xToCheck = parseInt(startPosition.x) + i*directionX;
            var zToCheck = parseInt(startPosition.z) + i*directionZ;

            var tile = 
                this.#desk.get(startPosition.layer, xToCheck, zToCheck);
            
            if (tile == null) {
                return {
                    enableMoves: enableMoves,
                    moveToKill: null
                };
            }

            if (tile.figure != null) {
                return {
                    enableMoves: enableMoves,
                    moveToKill: tile
                };
            }

            enableMoves.push(tile);
        }

        return {
            enableMoves: enableMoves,
            moveToKill: null
        };
    }

    static #checkPawn(startPosition, endPosition) { 
        var startFigure = this.#getFigure(startPosition);
        var moveDirection = (startFigure.color == 'white') ? -1 : 1;
        var enableMoves = [];
        
        let positionToCheck = {
            layer: startPosition.layer,
            x: parseInt(startPosition.x) + moveDirection,
            z: startPosition.z
        };

        if (startFigure.moveCount == 0) {

            var moveXInfo = this.#checkXEnableMoves(positionToCheck, 3, moveDirection);
        } else {
            var moveXInfo = this.#checkXEnableMoves(positionToCheck , 1, moveDirection);
        }

        enableMoves = enableMoves.concat(moveXInfo.enableMoves);
        
        var moveDiagInfo = this.#checkDiagEnableMoves(startPosition, 1, moveDirection, -1);
        if (moveDiagInfo.moveToKill != null) {
            enableMoves.push(moveDiagInfo.moveToKill);
        }

        moveDiagInfo = this.#checkDiagEnableMoves(startPosition, 1, moveDirection, 1);
        if (moveDiagInfo.moveToKill != null) {
            enableMoves.push(moveDiagInfo.moveToKill);
        }

        enableMoves.forEach(x => x.color = '');

        var endTile = this.#desk.get(endPosition);

        if (enableMoves.includes(endTile)) {
            return true;
        } 

        return false;
    }
    
    static #checkBishop(startPosition, endPosition) {
        
    }
    static #checkKing(startPosition, endPosition) {
        
    }
    static #checkQueen(startPosition, endPosition) {
        
    }
    static #checkKnight(startPosition, endPosition) {
        
    }
    static #checkRook(startPosition, endPosition) {
        
    }
    
    static #checkFunc = {
        [figureTypes.Pawn]: (startPosition, endPosition) => 
            this.#checkPawn(startPosition, endPosition),
    
        [figureTypes.Bishop]: (startPosition, endPosition) => 
            this.#checkBishop(startPosition, endPosition),
    
        [figureTypes.King]: (startPosition, endPosition) => 
            this.#checkKing(startPosition, endPosition),
    
        [figureTypes.Queen]: (startPosition, endPosition) => 
            this.#checkQueen(startPosition, endPosition),
    
        [figureTypes.Knight]: (startPosition, endPosition) => 
            this.#checkKnight(startPosition, endPosition),
    
        [figureTypes.Rook]: (startPosition, endPosition) => 
            this.#checkRook(startPosition, endPosition)
    }
}

export default MoveChecker;
