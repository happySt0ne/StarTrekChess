import FigureController from "./figureController.js";
import cameraController from "./cameraController.js";
import GameObject from "./gameObjects/gameObject.js";
import Desk from "./gameObjects/desk.js";
import SoundsPlayer from "./soundsPlayer.js";
import FigureFactory from "./figureFactory.js";
import FigureArranger from "./figureArranger.js";
import BotPlayer from "./botPlayer.js";

class Game {
    static #gameInstance;
    #whiteFigures = [];
    #blackFigures = [];
    #desk;
    static #gameType;

    static get gameType() {
        return this.#gameType;
    } 

    static getInstance() {
        return this.#gameInstance;
    }

    static playWithBot() {
        this.#gameType = 'bot';
    }

    getFigures(color) {
        var result = (color == 'black') ? this.#blackFigures : this.#whiteFigures;
        return result.filter(f => f.isAlive);
    }

    #setupGame(setupData) {
        FigureController.setupUiController();

        cameraController.enableCameraController();

        GameObject.setBuffers(setupData.positionBuffer, setupData.colorBuffer);
        GameObject.setMatrixLocation(setupData.matrixLocation);
    }

    #createDesk() {
        this.#desk = new Desk(-300, 200, -500, 150);

        FigureController.setDesk(this.#desk);
    }

    #createFigures() {
        this.#whiteFigures = FigureFactory.createAllFigures('white');
        this.#blackFigures = FigureFactory.createAllFigures('black');
    }

    #arrangeFigures() {
        FigureArranger.setDesk(this.#desk);
        FigureArranger.setFigures(this.#whiteFigures);
        FigureArranger.setFigures(this.#blackFigures);

        FigureArranger.arrangeAll();
    }

    constructor(setupData) {
        if (Game.#gameInstance != null) return Game.#gameInstance;
        Game.#gameInstance = this;

        this.#setupGame(setupData);
        this.#createDesk();
        this.#createFigures();
        this.#arrangeFigures();

        SoundsPlayer.playAmbient();

        if (Game.gameType == 'bot') {
            BotPlayer.start(this.#blackFigures, this.#desk);
        }
    }

    draw() {
        this.#desk.draw();
        this.#blackFigures.forEach(f => f.draw());
        this.#whiteFigures.forEach(f => f.draw());
    }
}

export default Game;
