import MoveChecker from "./moveChecker.js";
import Game from "./game.js";
import figureTypes from "./figureTypes.js";

class SpecialStatesChecker {
    static #isWhiteCheck = false;
    static #isBlackCheck = false;
    static #desk;

    static setDesk(desk) {
        if (this.#desk != null || desk == null) return;
 
        this.#desk = desk;
    }

    /**
     * 
     * @param {String} playerSide - white или black. 
     * @returns 
     */
    static isCheck(playerSide) {   
        var playerSideToCheck = (playerSide === 'black') ? 'white' : 'black';       
        var tilesUnderAttack = MoveChecker.getAllMoves(playerSideToCheck);

        var kingTile = this.#getKingTileByColor(playerSide);
        
        return tilesUnderAttack.includes(kingTile);
    }

    static isCheckAndMate(playerSide) {
        var isCheck = this.isCheck(playerSide);

        var kingMoves = this.#getKingMovesByColor(playerSide);

        kingMoves = [...kingMoves].filter(tile => tile.figure == null || tile.figure.color !== playerSide);

        return kingMoves.length === 0 && isCheck;
    }

    static isStalemate(playerSide) {
        var moves = MoveChecker.getAllMoves(playerSide);

        return moves.size === 0;
    }

    static #getKingMovesByColor(playerSide) { 
        var kingTile = this.#getKingTileByColor(playerSide);
        var kingMoves = MoveChecker.getMoves(kingTile);

        return kingMoves;
    }
    
    static #getKingTileByColor(playerSide) {
        var kingFigure = 
        Game.getInstance().getFigures(playerSide)
        .find(f => f.type === figureTypes.King);

        // TODO: убери это после того как закончишь всё тестить.
        if (kingFigure == null) {
            console.log(`у стороны ${playerSide} нет короля!`);
            return;
        }  

        return this.#desk.get(kingFigure);
    }
}

export default SpecialStatesChecker;
