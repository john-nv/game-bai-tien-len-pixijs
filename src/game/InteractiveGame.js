import * as PIXI from 'pixi.js'
import { sound } from '@pixi/sound';
import gsap from 'gsap'

import { CreateButtonSpriteImage } from '../util/pixi-util/createButton';
import { onButtonHandle } from '../util/pixi-util/handle-button';
import { removeContainertWithAnimation } from '../util/pixi-util/sprites'
import { ControlGame } from './control-game';

// ============================ variable card >>> ============================
let cardsPlayer = []
let scaleRatio = 1
let killCardsPlayer = []
let pendingCardsPlayer = []
let container
let app
let nextCard;
let btn_exit_game;
let goCard;
let blurFilterBtnEvent = new PIXI.ColorMatrixFilter();
const killCardContainer = new PIXI.Container();
const btnControlCardContainer = new PIXI.Container();

// ============================ start game >>> ============================
export async function InteractiveGame(containerGame, appGame, scaleRatioPayload, cardsPlayerPayload) {
    const texturePlayingScreen = PIXI.Texture.from('assets/image/playingScreen.png');
    const btn_exit_game_crop = new PIXI.Rectangle(1140, 30, 71, 71);
    const btn_exit_game_crop_Texture = new PIXI.Texture(texturePlayingScreen.baseTexture, btn_exit_game_crop);

    container = containerGame;
    cardsPlayer = cardsPlayerPayload;
    scaleRatio = scaleRatioPayload;
    container.addChild(killCardContainer);
    container.addChild(btnControlCardContainer);

    app = appGame
    const urlGoCard = 'assets/image/danh.png'
    const urlNextCard = 'assets/image/bo.png'

    const nextCardSprite = CreateButtonSpriteImage(
        urlNextCard,
        scaleRatio,
        0.5,
        app.screen.width * 0.45,
        app.screen.height * 0.79,
    );

    const goCardSprite = CreateButtonSpriteImage(
        urlGoCard,
        scaleRatio,
        0.5,
        app.screen.width * 0.58,
        app.screen.height * 0.79,
    );


    btn_exit_game = new CreateButtonSpriteImage(
        btn_exit_game_crop_Texture,
        scaleRatio,
        0.5,
        app.screen.width * 0.96,
        app.screen.height * 0.06,
    )

    nextCard = nextCardSprite
    goCard = goCardSprite
    
    container.addChild(btn_exit_game) // TEST
    btnControlCardContainer.addChild(nextCard);
    btnControlCardContainer.addChild(goCard);

    _eventCards();
    _formatCard()
    _updateBtnCardDisabled();
}

// ============================ event cards >>> ============================
function _eventCards() {
    btn_exit_game
        .on('pointerover', onButtonHandle(btn_exit_game, true, 0.1, scaleRatio * 0.98, scaleRatio * 0.98, 1, 'btn_hover'))
        .on('pointerout', onButtonHandle(btn_exit_game, true, 0.1, scaleRatio, scaleRatio, 0.2, 'btn_hover'))
        .on('pointerdown', onButtonHandle(btn_exit_game, true, 0.1, scaleRatio * 0.95, scaleRatio * 0.95, 1, 'btn_click_1', (a) => {
            removeContainertWithAnimation(container)
        }))

    goCard
        .on('pointerover', onButtonHandle(goCard, true, 0.1, scaleRatio * 0.98, scaleRatio * 0.98, 0.2, 'btn_hover'))
        .on('pointerout', onButtonHandle(goCard, true, 0.1, scaleRatio, scaleRatio, 0.2, 'btn_hover'))
        .on('pointerdown', onButtonHandle(goCard, true, 0.1, scaleRatio * 0.95, scaleRatio * 0.95, 0.3, 'dealCardPlayer', (a) => {
            _killCardsPlayerPlayer()
        }))
        .on('pointerup', onButtonHandle(goCard, true, 0.1, scaleRatio, scaleRatio, 0, undefined))
        .on('pointerupoutside', onButtonHandle(goCard, true, 0.1, scaleRatio, scaleRatio, 0, undefined))

    nextCard
        .on('pointerover', onButtonHandle(nextCard, true, 0.1, scaleRatio * 0.98, scaleRatio * 0.98, 0.2, 'btn_hover'))
        .on('pointerout', onButtonHandle(nextCard, true, 0.1, scaleRatio, scaleRatio, 0.2, 'btn_hover'))
        .on('pointerdown', onButtonHandle(nextCard, true, 0.1, scaleRatio * 0.95, scaleRatio * 0.95, 0.3, 'btn_click_1', (a) => {
            a = 'bo bai'
            console.log(a)
        }))
        .on('pointerup', onButtonHandle(nextCard, true, 0.1, scaleRatio, scaleRatio, 0, undefined))
        .on('pointerupoutside', onButtonHandle(nextCard, true, 0.1, scaleRatio, scaleRatio, 0, undefined))
}

// ============================ cards on click >>> ============================
export function onCardClick(cardItem) {
    if (!goCard || !nextCard) return
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

// ============================ send cards player to cards pending >>> ============================
function _getCardToPending(payload, isSetPending = true) {
    if (isSetPending) {
        pendingCardsPlayer.push(payload)
    } else {
        const index = pendingCardsPlayer.indexOf(payload)
        pendingCardsPlayer.splice(index, 1)

    }
}

// ============================ update disable button event >>> ============================
function _updateBtnCardDisabled() {
    if (pendingCardsPlayer.length > 0) {
        blurFilterBtnEvent.brightness(1);
        goCard.interactive = true;
        nextCard.interactive = true;
    } else {
        blurFilterBtnEvent.brightness(0.8);
        goCard.interactive = false;
        nextCard.interactive = false;
        if (cardsPlayer.length < 1) {
            removeContainertWithAnimation(btnControlCardContainer, 1.5)
            // container.addChild(btn_exit_game)
        }
    }
    nextCard.filters = [blurFilterBtnEvent];
    goCard.filters = [blurFilterBtnEvent];
}


// ============================ kill cards player (pending X) >>> ============================
async function _killCardsPlayerPlayer() {
    if (!pendingCardsPlayer || pendingCardsPlayer.length === 0) return;
    removeContainertWithAnimation(killCardContainer, 0)
    await _moveCards(killCardContainer, pendingCardsPlayer)
    killCardsPlayer = pendingCardsPlayer
    cardsPlayer = await _removePendingCardsPlayer(cardsPlayer, pendingCardsPlayer)
    _formatCard()
    pendingCardsPlayer = []
    _updateBtnCardDisabled()
}

async function _removePendingCardsPlayer(arrayPlayer, arraySplice) {
    return new Promise(async (resolve, reject) => {
        try {
            for (let i = arrayPlayer.length - 1; i >= 0; i--) {
                if (arraySplice.includes(arrayPlayer[i])) {
                    arrayPlayer.splice(i, 1);
                }
            }
            resolve(arrayPlayer);
        } catch (error) {
            reject('error');
        }
    });
}

// ============================ move cards (kill and soft) >>> ============================
async function _moveCards(containerCards, cardsBefore, sortCard) {
    return new Promise(async (resolve, reject) => {
        try {
            if (cardsBefore.length < 1) return;
            const screenWidth = app.screen.width;
            const screenHeight = app.screen.height;
            const cardOneWidth = cardsBefore[0].width; // cac la bai kick co deu giong nhau
            const cardSpacing = cardOneWidth - (cardOneWidth * 1.4);
            const totalWidthCards = (cardOneWidth * cardsBefore.length) + (cardSpacing * (cardsBefore.length - 1));
            const startX = (screenWidth - totalWidthCards) / 2;
            cardsBefore = _sortByTypeAndNumberCards(cardsBefore)
            for (let i = 0; i < cardsBefore.length; i++) {
                const card = cardsBefore[i];
                const cardX = startX + (cardOneWidth + cardSpacing) * i + ((cardOneWidth / 2) - cardSpacing);
                let cardY;
                const positionBeforeCard = card.position
                containerCards.addChild(card);
                if (sortCard === true) {
                    cardY = card.position.y
                } else {
                    cardY = (screenHeight - card.height) / 2;
                    cardsBefore[i].canClick = false;
                }
                if (i === 0) {
                    sound.play('kill_card', { volume: 0.5 });
                }
                gsap.fromTo(
                    positionBeforeCard,
                    { x: positionBeforeCard.x, y: positionBeforeCard.y },
                    { x: cardX, y: cardY, duration: 0.27, ease: 'back.out(1.5)' }
                );
            }
            resolve()
        } catch (e) {
            reject('error');
            console.log(e)
        }
    });
}

// ============================ sort cards >>> ============================
function _formatCard() {
    cardsPlayer = _sortByTypeAndNumberCards(cardsPlayer)
    _moveCards(container, cardsPlayer, true)
}

function _sortByTypeAndNumberCards(array) {
    try {
        array.sort((a, b) => {
            const typeA = a.info.type;
            const typeB = b.info.type;
            if (typeA !== typeB) {
                return typeA - typeB;
            }
        });

        array.sort((a, b) => {
            const numberA = a.info.number;
            const numberB = b.info.number;
            if (numberA !== numberB) {
                return numberA - numberB;
            }
        });
        return array
    } catch (error) {
        console.log(error)
    }
}