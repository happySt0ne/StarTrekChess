import { 
    isFocusInInputElement,
    containsOnlyDigits
} from '../supportStuff/usefullFunctions.js';
import MoveChecker from './moveChecker.js';
import MoveOrderController from './moveOrderController.js';
import SpecialKingStatesChecker from './specialKingStatesChecker.js';

const moveInput = document.getElementById('moveInput');

class FigureController {
    static #desk;

    static setDesk(desk) {
        this.#desk = desk; 

        MoveChecker.setDesk(desk);
        SpecialKingStatesChecker.setDesk(desk);
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
                this.#makeMove(moveInput.value);
                this.#clearInput();
            } else if (isEnterPressed) {
        
                moveInput.focus();
            }
        });
    };

    static #clearInput() {
        moveInput.value = '';
    }

    static #makeMove(input) {
        var isCheck = SpecialKingStatesChecker.isCheck(MoveOrderController.PlayerTurn);

        if (isCheck) {
            alert(`ШАХ для ${MoveOrderController.PlayerTurn}!`);
        }

        var parsedInput = this.#parseMoveInput(input);
        
        if (!parsedInput) {
            
            this.#showRulesAlert();
            return;
        }

        var from = parsedInput.from;
        var to = parsedInput.to; 

        var fromTile = this.#desk.get(from.layer, from.x, from.z);
        var toTile = this.#desk.get(to.layer, to.x, to.z);

        if (!MoveOrderController.isValidTurn(fromTile.figure)) {

            alert('Вы пытаетесь походить не своей фигурой!');
            return;
        }

        var isValidMove = MoveChecker.checkMove(from, to);

        if (!isValidMove) {
            
            alert('Данный ход недопустим.');
            return;
        }

        var figureToMove = fromTile.figure;
        
        fromTile.figure = null;
        toTile.figure = figureToMove;

        MoveOrderController.changeTurn();
    }

    static #parseMoveInput(input) {
        input = input.trim().replace(/\s+/g, ' ').split(' ');

        if (input == '' || input == null || input.length < 2 
            || input[0].length < 3 || input[1].length < 3
            || !containsOnlyDigits(input[0])
            || !containsOnlyDigits(input[1])) {

            return false;
        }

        return {
            from: {
                layer: input[0][0],
                x: input[0][1],
                z: input[0][2]
            },
            to: {
                layer: input[1][0],
                x: input[1][1],
                z: input[1][2]
            }
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
                Пример: 111 222`
        );
    }
}

export default FigureController;
