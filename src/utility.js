export function removeCardElements(container) {
    const cardElements = container.querySelectorAll('.card');
    cardElements.forEach((card) => {
        container.removeChild(card);
    });
}

export function isEmpty(map) {
    return map.size === 0;
}
