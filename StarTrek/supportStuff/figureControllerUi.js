import { isFocusInInputElement } from './usefullFunctions.js';

const moveInput = document.getElementById('moveInput');

function setupUiController() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && isFocusInInputElement('moveInput')) {
    
            moveInput.blur();
        } else if (event.key === 'Enter') {
    
            moveInput.focus();
        }
    });
};

export { setupUiController };
