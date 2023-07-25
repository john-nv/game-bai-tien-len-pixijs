export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.map((element, index) => {
        element.owner = index % 4;
        return element;
    });
}

export function transportArray(arrSend, arrTo, payload) {
    if (arrSend.includes(payload)) {
        console.log('van chuyen')
        const indexCardSend = arrSend.indexOf(payload);
        const removeCard =  arrSend.splice(indexCardSend, 1);
        arrTo.push(removeCard);
    }
    return { arrSend, arrTo, payload }
}