import figureTypes from "./figureTypes.js";
import ChessPosition from "./chessPosition.js";

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

    static #moves = [];
    static #movesToKill = [];
    
    static #rec(position, range, direction) {
        if (range == 0) return;
        if (this.#desk.get(position) == null) return;
        if (this.#desk.get(position).figure != null) {
            
            this.#movesToKill.push(this.#desk.get(position));
            return;
        }

        this.#moves.push(this.#desk.get(position));

        var pos1 = new ChessPosition(position);
        pos1.x += direction;

        var pos2 = new ChessPosition(position);
        pos2.layer += 1;
        pos2.x += direction + 2;

        var pos3 = new ChessPosition(position);
        pos3.layer += 2;
        pos3.x += direction + 4;

        this.#rec(pos1, range - 1, direction);
        this.#rec(pos2, range - 1, direction);
        this.#rec(pos3, range - 1, direction);
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

    static #colorise(tiles) {
        tiles.forEach(e => e.color = '');
    }

    static #checkPawn (startPosition, endPosition) {
        var direction = -1;
        
        var pos1 = new ChessPosition(startPosition);
        pos1.x += direction;
        
        var pos2 = new ChessPosition(startPosition);
        pos2.layer += + 1;
        pos2.x += direction + 2;

        var pos3 = new ChessPosition(startPosition);
        pos3.layer += 2;
        pos3.x += direction + 4;

        var range = Infinity;

        this.#rec(pos1, range, -1);
        this.#rec(pos2, range, -1);
        this.#rec(pos3, range, -1);
        console.log(this.#movesToKill);

        this.#colorise(this.#moves);
        this.#colorise(this.#movesToKill);
    }

    // static #checkPawn(startPosition, endPosition) { 
    //     var startFigure = this.#getFigure(startPosition);
    //     var moveDirection = (startFigure.color == 'white') ? -1 : 1;
    //     var enableMoves = [];
        
    //     let positionToCheck = {
    //         layer: startPosition.layer,
    //         x: parseInt(startPosition.x) + moveDirection,
    //         z: startPosition.z
    //     };

    //     if (startFigure.moveCount == 0) {

    //         var moveXInfo = this.#checkXEnableMoves(positionToCheck, 3, moveDirection);
    //     } else {
    //         var moveXInfo = this.#checkXEnableMoves(positionToCheck , 1, moveDirection);
    //     }

    //     enableMoves = enableMoves.concat(moveXInfo.enableMoves);
        
    //     var moveDiagInfo = this.#checkDiagEnableMoves(startPosition, 1, moveDirection, -1);
    //     if (moveDiagInfo.moveToKill != null) {
    //         enableMoves.push(moveDiagInfo.moveToKill);
    //     }

    //     moveDiagInfo = this.#checkDiagEnableMoves(startPosition, 1, moveDirection, 1);
    //     if (moveDiagInfo.moveToKill != null) {
    //         enableMoves.push(moveDiagInfo.moveToKill);
    //     }

    //     enableMoves.forEach(x => x.color = '');

    //     var endTile = this.#desk.get(endPosition);

    //     if (enableMoves.includes(endTile)) {
    //         return true;
    //     } 

    //     return false;
    // }
    
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
