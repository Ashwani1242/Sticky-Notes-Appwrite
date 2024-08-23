export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x
    const offsetTop = card.offsetTop - mouseMoveDir.y

    return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop,
    }
}

export const autoSize = (textarea) => {
    const { current } = textarea
    current.style.height = "auto"
    current.style.height = current.scrollHeight + 'px';
}

export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 499
    selectedCard.style.border= '2px solid'

    Array.from(document.getElementsByClassName('card')).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1
            card.style.border = 'none'
        }
    })
}

export const bodyParser = (value) => {
    try {
        return JSON.parse(value)
    } catch (err) {
        return value
    }
}
