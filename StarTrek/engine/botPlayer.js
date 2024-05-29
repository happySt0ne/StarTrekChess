import MoveChecker from "./moveChecker.js";
import MoveOrderController from "./moveOrderController.js";
import { getRandomInt } from "../supportStuff/usefullFunctions.js";
import FigureController from "./figureController.js";

class BotPlayer {
    static #figures;
    static #desk;

    static get figures() {
        return this.#figures.filter(f => f.isAlive);
    }
    
    static start(blackFigures, desk) {
        this.#figures = blackFigures;
        this.#desk = desk;

        setInterval(this.#checkMoveOrder, 500);
    }

    static makeMove() {
        var randomIndex = getRandomInt(0, this.figures.length);
        var figure = this.figures[randomIndex];

        var figureTile = this.#desk.get(figure);
        var moves = MoveChecker.getMoves(figureTile);

        if (moves.size == 0) {
            return;
        }

        var randomMoveIndex = getRandomInt(0, moves.size);
        var move = Array.from(moves)[randomMoveIndex];

        var zxczz = this.#createInput(figureTile, move);
        FigureController.makeMove(zxczz);
    }
    
    static #createInput(figureTile, moveTile) {
        var a = this.#desk.getTilePosition(figureTile);
        var b = this.#desk.getTilePosition(moveTile);

        var from = `${a.layer}${fromNumToLetter(a.x)}${a.z}`;
        var to = `${b.layer}${fromNumToLetter(b.x)}${b.z}`;

        return `${from} ${to}`
    }

    static #checkMoveOrder() {
        if (MoveOrderController.PlayerTurn === 'black') {
            BotPlayer.makeMove();
        }
    }
}

function fromNumToLetter(number) {
    return String.fromCharCode(97 + number - 1);
}

export default BotPlayer;
