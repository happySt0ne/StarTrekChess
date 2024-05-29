import { getRandomInt } from "../supportStuff/usefullFunctions.js";

class SoundsPlayer {
    static #lastAmbientNumber = 0;

    static #chooseAmbient() {
        do {
            var randomInt = getRandomInt(1, 4);
        } while (randomInt == this.#lastAmbientNumber);   
            
        var audioPath = `../sounds/ambients/ambient${randomInt}.mp3`;
            
        this.#lastAmbientNumber = randomInt;

        return new Audio(audioPath);
    }

    static playAmbient() {
        var audio = this.#chooseAmbient();
        
        audio.addEventListener('ended', function() {
            SoundsPlayer.playAmbient();
        });

        audio.play();    
    }

    static chessMoveSound() {
        var audio = new Audio('../sounds/chessMove.mp3');
        audio.play();
    }
}

export default SoundsPlayer;
