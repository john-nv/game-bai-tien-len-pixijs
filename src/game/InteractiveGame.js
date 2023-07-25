import * as PIXI from 'pixi.js'
// import { sound } from '@pixi/sound';
// import gsap from 'gsap'
import { transportArray } from '../util/array';
import { CreateButtonSpriteImage } from '../util/pixi-util/createButton';
import { onButtonHandle } from '../util/pixi-util/handle-button'; //onButtonOver, onButtonOut, onButtonDown, onButtonUp 

let cardsPlayer = []
let scaleRatio = 1
let killCards = []
let pendingCards = []
let container
let app
let disabled = true;
let nextCard = null;
let sortCard = null;
let goCard = null;
let blurFilterBtnEvent = new PIXI.ColorMatrixFilter();

export async function InteractiveGame(containerGame, appGame, scaleRatioPayload, cardsPlayerPayload) {
    cardsPlayer = cardsPlayerPayload;
    scaleRatio = scaleRatioPayload;
    container = containerGame
    app = appGame
    const urlGoCard = 'assets/image/danh.png'
    const urlNextCard = 'assets/image/bo.png'
    const urlSortCard = 'assets/image/xep.png'

    const nextCardSprite = CreateButtonSpriteImage(
        urlNextCard,
        scaleRatio,
        0.5,
        (app.screen.width * 1.39) - app.screen.width,
        (app.screen.height * 1.76) - app.screen.height,
    );
    const sortCardSprite = CreateButtonSpriteImage(
        urlSortCard,
        scaleRatio,
        0.5,
        (app.screen.width * 1.52) - app.screen.width,
        (app.screen.height * 1.76) - app.screen.height,
    );

    const goCardSprite = CreateButtonSpriteImage(
        urlGoCard,
        scaleRatio,
        0.5,
        (app.screen.width * 1.64) - app.screen.width,
        (app.screen.height * 1.76) - app.screen.height,
    );

    nextCard = nextCardSprite
    sortCard = sortCardSprite
    goCard = goCardSprite

    container.addChild(nextCard);
    container.addChild(sortCard);
    container.addChild(goCard);

    _updateBtnCardDisabled()
}

function eventCards() {
    goCard
        .on('pointerover', onButtonHandle(disabled, goCard, true, 0.1, scaleRatio * 0.98, scaleRatio * 0.98, 0.2, 'btn_hover'))
        .on('pointerout', onButtonHandle(disabled, goCard, true, 0.1, scaleRatio, scaleRatio, 0.2, 'btn_hover'))
        .on('pointerdown', onButtonHandle(disabled, goCard, true, 0.1, scaleRatio * 0.95, scaleRatio * 0.95, 0.3, 'dealCardPlayer', (a) => {
            a = 'danh bai'
            console.log(a)
        }))
        .on('pointerup', onButtonHandle(disabled, goCard, true, 0.1, scaleRatio, scaleRatio, 0, undefined))
        .on('pointerupoutside', onButtonHandle(disabled, goCard, true, 0.1, scaleRatio, scaleRatio, 0, undefined))

    nextCard
        .on('pointerover', onButtonHandle(disabled, nextCard, true, 0.1, scaleRatio * 0.98, scaleRatio * 0.98, 0.2, 'btn_hover'))
        .on('pointerout', onButtonHandle(disabled, nextCard, true, 0.1, scaleRatio, scaleRatio, 0.2, 'btn_hover'))
        .on('pointerdown', onButtonHandle(disabled, nextCard, true, 0.1, scaleRatio * 0.95, scaleRatio * 0.95, 0.3, 'btn_click_1', (a) => {
            a = 'bo bai'
            console.log(a)
        }))
        .on('pointerup', onButtonHandle(disabled, nextCard, true, 0.1, scaleRatio, scaleRatio, 0, undefined))
        .on('pointerupoutside', onButtonHandle(disabled, nextCard, true, 0.1, scaleRatio, scaleRatio, 0, undefined))


    sortCard
        .on('pointerover', onButtonHandle(disabled, sortCard, true, 0.1, scaleRatio * 0.98, scaleRatio * 0.98, 0.2, 'btn_hover'))
        .on('pointerout', onButtonHandle(disabled, sortCard, true, 0.1, scaleRatio, scaleRatio, 0.2, 'btn_hover'))
        .on('pointerdown', onButtonHandle(disabled, sortCard, true, 0.1, scaleRatio * 0.95, scaleRatio * 0.95, 0.3, 'btn_click_1', (a) => {
            a = 'xep bai'
            console.log(a)
        }))
        .on('pointerup', onButtonHandle(disabled, sortCard, true, 0.1, scaleRatio, scaleRatio, 0, undefined))
        .on('pointerupoutside', onButtonHandle(disabled, sortCard, true, 0.1, scaleRatio, scaleRatio, 0, undefined))
}

export function onCardClick(cardItem) {
    console.log(cardsPlayer)
    if(!goCard || !sortCard || !nextCard) return
    if (cardItem.canClick && cardsPlayer.length > 0) {
        if (!cardItem.clicked) {
            _getCardToPending(cardItem, true)
            cardItem.position.copyFrom(new PIXI.Point(cardItem.x, cardItem.y - (cardItem.x / 80)));
            cardItem.clicked = true;
        } else {
            _getCardToPending(cardItem, false)
            cardItem.position.copyFrom(new PIXI.Point(cardItem.x, cardItem.y + (cardItem.x / 80)));
            cardItem.clicked = false;
        }
    }
    _updateBtnCardDisabled()
}

function _getCardToPending(payload, isSetPending = true) {
    if (isSetPending) {
        pendingCards.push(payload)
    } else {
        const index = pendingCards.indexOf(payload)
        pendingCards.splice(index, 1)

    }
}

function _updateBtnCardDisabled() {
    if (pendingCards.length > 0) {
        disabled = false;
        blurFilterBtnEvent.brightness(1);
        goCard.interactive = true;
        nextCard.interactive = true;
        sortCard.interactive = true;
    } else {
        disabled = true;
        blurFilterBtnEvent.brightness(0.8);
        goCard.interactive = false;
        nextCard.interactive = false;
        sortCard.interactive = false;
    }
    nextCard.filters = [blurFilterBtnEvent];
    sortCard.filters = [blurFilterBtnEvent];
    goCard.filters = [blurFilterBtnEvent];
    eventCards();
}