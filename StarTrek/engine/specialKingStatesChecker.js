import MoveChecker from "./moveChecker.js";
import Game from "./game.js";
import figureTypes from "./figureTypes.js";

class SpecialKingStatesChecker {
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
       
        var tilesUnderAttack = this.#getAllMoves(playerSideToCheck);

        var kingFigure = 
            Game.getInstance().getFigures(playerSide)
            .find(f => f.type === figureTypes.King);        
        var kingTile = this.#desk.get(kingFigure);
        
        return tilesUnderAttack.includes(kingTile);
    }
    
    static #getAllMoves(playerSide) {
        var result = new Set();

        for (const figure of Game.getInstance().getFigures(playerSide)) {

            var tile = this.#desk.get(figure);
            var figureMoves = MoveChecker.getMoves(tile);
            var result = result.concat(figureMoves);
        }

        return result;
    }

}

export default SpecialKingStatesChecker;
