import { shuffleArray } from '../util/array'

export function init() {
    let newCard = _createCard()
    newCard = _dealCard(newCard)
    return newCard
}

function _createCard() {
    const typeCard = ['c', 'd', 'h', 's']
    let totalCards = []

    for (let i = 0; i < typeCard.length; i++) {
        for (let y = 1; y <= 13; y++) {
            let type = null;
            switch (typeCard[i]) {
                case 'h':
                    type = 4
                    break;
                case 'd':
                    type = 3
                    break;
                case 'c':
                    type = 2
                    break;
                case 's':
                    type = 1
                    break;
            }
            totalCards.push({
                src: `assets/cards/${typeCard[i]}${y}.png`,
                owner: null,
                number: y,
                type,
            })
        }
    }

    totalCards = shuffleArray(totalCards)
    return totalCards
}

function _dealCard(listCard) {
    const dealPlayer = [[], [], [], []]
    for (let i = 0; i < listCard.length; i++) {
        dealPlayer[i % 4].push(listCard[i]);
    }
    return dealPlayer
}
