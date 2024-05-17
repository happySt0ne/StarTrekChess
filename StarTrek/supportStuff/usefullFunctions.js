/**
 * 
 * @param {string} elementId 
 * @returns {boolean}
 */
function isFocusInInputElement(elementId) {
    const focusedElement = document.activeElement;
    return focusedElement && focusedElement.id === elementId;
}

function containsOnlyDigits(string) {
    for (const char of string) {

        if (isNaN(char)) {

            return false;
        }
    }

    return true;
}

export { isFocusInInputElement, containsOnlyDigits }
