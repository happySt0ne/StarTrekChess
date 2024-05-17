import Camera from "./camera.js";
import { isFocusInInputElement } from '../supportStuff/usefullFunctions.js'

class cameraController {

    static keyDownHandler(e) {
        if (isFocusInInputElement('moveInput')) return;

        switch (e.keyCode) {
            case 39:
                Camera.updatePosition(0, -1);                
                break;
            case 37:
                Camera.updatePosition(0);
                break;
            case 38:
                Camera.updatePosition(2);
                break;
            case 40:
                Camera.updatePosition(2, -1);
                break;

            case 68:
                Camera.updateRotation(1, -1);
                break;
            case 65:
                Camera.updateRotation(1);
                break;
            case 87:
                Camera.updateRotation(0);
                break;
            case 83:
                Camera.updateRotation(0, -1);
                break;
        
            default:
                break;
        }
    }

    static enableCameraController() {
        document.addEventListener('keydown', this.keyDownHandler, false);
    }
}

export default cameraController;