function isFocusInInputElement(elementId) {
    const focusedElement = document.activeElement;
    return focusedElement && focusedElement.id === elementId;
}

export { isFocusInInputElement }
