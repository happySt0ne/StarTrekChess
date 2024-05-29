/**
 * 
 * @param {string} elementId 
 * @returns {boolean}
 */
function isFocusInInputElement(elementId) {
    const focusedElement = document.activeElement;
    return focusedElement && focusedElement.id === elementId;
}

function countLetters(string) {
    var letterCount = 0;

    for (var i = 0; i < string.length; ++i) {
        if (/[a-zA-Z]/.test(string[i])) {
          letterCount++;
        }
    }

    return letterCount;
}

function containsOnlyDigits(string) {
    for (const char of string) {

        if (isNaN(char)) {

            return false;
        }
    }

    return true;
}

export { isFocusInInputElement, containsOnlyDigits, countLetters }
