import { 
    isFocusInInputElement,
    countLetters
} from '../supportStuff/usefullFunctions.js';
import MoveChecker from './moveChecker.js';
import MoveOrderController from './moveOrderController.js';
import SpecialStatesChecker from './specialStatesChecker.js';
import ChessPosition from './types/chessPosition.js';
import SoundsPlayer from './soundsPlayer.js';
import Game from './game.js';
import BotPlayer from './botPlayer.js';

const moveInput = document.getElementById('moveInput');

class FigureController {
    static #desk;

    static setDesk(desk) {
        this.#desk = desk; 

        MoveChecker.setDesk(desk);
        SpecialStatesChecker.setDesk(desk);
    }

    static setupUiController() {
        document.addEventListener('keydown', (event) => {
            var isEnterPressed = event.key === 'Enter';
            var isEscapePressed = event.key === 'Escape';
            var isMoveInputFocused = isFocusInInputElement('moveInput');

            if (isEscapePressed && isMoveInputFocused) {

                moveInput.blur();
            } else if (isEnterPressed && isMoveInputFocused) {
        
                moveInput.blur();
                this.makeMove(moveInput.value);
            } else if (isEnterPressed) {
        
                moveInput.focus();
            }
        });
    };

    static #clearInput() {
        moveInput.value = '';
    }

    static makeMove(input) {
        moveInput.value = input;

        var currentPlayer = MoveOrderController.PlayerTurn;
        var enemyPlayer = currentPlayer === 'black' ? 'white' : 'black';

        var parsedInput = this.#parseMoveInput(input);
        
        if (!parsedInput) {
            
            this.#showRulesAlert();
            return false;
        }

        var from = parsedInput.from;
        var to = parsedInput.to; 

        var fromTile = this.#desk.get(from.layer, from.x, from.z);
        var toTile = this.#desk.get(to.layer, to.x, to.z);

        if (fromTile == null || toTile == null) {

            alert(`Вы выбрали некорректную клетку для ${fromTile == null ? 'начала' : 'конца'} хода`);
            return false;
        }

        if (!MoveOrderController.isValidTurn(fromTile.figure)) {

            alert('Вы пытаетесь походить не своей фигурой!');
            return false;
        }

        var isValidMove = MoveChecker.checkMove(from, to);

        if (!isValidMove) {
            
            alert('Данный ход недопустим.');
            return false;
        }

        if (fromTile.figure != null && toTile.figure != null 
                && fromTile.figure.color === toTile.figure.color) {
            
            if (Game.gameType != 'bot' && MoveOrderController.PlayerTurn != 'black') {

                alert('Ты пытаешься побить свою же фигуру!!!');
            }
            return false;
        }

        var figureToMove = fromTile.figure;
        var oldToTileFigure = toTile.figure;

        fromTile.figure = null;
        toTile.figure = figureToMove;

        if (SpecialStatesChecker.isCheck(currentPlayer)) {
            alert(`Так будет шах для тебя (${currentPlayer}), поэтому нельзя!`);
            
            toTile.figure = oldToTileFigure;
            if (toTile.figure != null) {

                toTile.figure.awake();
            }
            
            fromTile.figure = figureToMove;
            if (fromTile.figure != null) {

                fromTile.figure.awake();
            }

            return false;
        }
        
        if (SpecialStatesChecker.isCheckAndMate(enemyPlayer)) {
            
            Game.getInstance().endGame('МАТ!', currentPlayer);
            return;
        }

        if (SpecialStatesChecker.isStalemate(enemyPlayer)) {
            
            Game.getInstance().endGame('ПАТ!', 'НИКТО');
            return;
        }

        if (SpecialStatesChecker.isCheck(enemyPlayer)) {
            alert(`ШАХ для ${enemyPlayer}!`);
        }

        SoundsPlayer.chessMoveSound();
        MoveOrderController.changeTurn();
        this.#clearInput();

        return true;
    }

    static #parseMoveInput(input) {
        const allowedSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        input = input.trim().replace(/\s+/g, ' ').split(' ');

        if (input == '' || input == null || input.length < 2 
            || input[0].length < 3 || input[1].length < 3
            || !allowedSymbols.includes(input[0][1]) 
            || !allowedSymbols.includes(input[1][1])
            || countLetters(input[0]) != 1 
            || countLetters(input[1]) != 1) {

            return false;
        }

        return {
            from: new ChessPosition(
                input[0][0], 
                this.convertLetterToCoord(input[0][1]), 
                input[0][2]
            ),
            to: new ChessPosition(
                input[1][0], 
                this.convertLetterToCoord(input[1][1]), 
                input[1][2]
            )
        };
    }

    static #showRulesAlert() {
        alert(`
                Введите корректные координаты.
                Сначала вводятся координаты клетки с 
                которой нужно сделать ход
                затем координаты клетки, 
                куда нужно передвинуть. Cначала 
                вводится уровень доски (1-самая нижняя), 
                затем x координата, после чего z.
                Пример: 1h3 2d3`
        );
    }

    static convertLetterToCoord(char) {
        return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }
}

export default FigureController;
