import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import gsap from 'gsap'
import { init } from './init-card'
import { InteractiveGame, onCardClick } from './InteractiveGame';
import { CreateButtonSpriteImage } from '../util/pixi-util/createButton';

// ============================ Contructor Sprite >>> ============================
export class PlayerCard extends PIXI.Sprite {
    constructor(texture) {
        super(texture);
        this.canClick = false;
        this.clicked = false;
        this.originalY = this.y;
    }
}

export function startGame(container, app, scaleRatio) {
    const containerStartGame = new PIXI.Container()
    const texturePlayingScreen = PIXI.Texture.from('assets/image/playingScreen.png');
    const btn_table_crop = new PIXI.Rectangle(0, 516, 1058, 502);
    const bgTable = new PIXI.Texture(texturePlayingScreen.baseTexture, btn_table_crop);
    const cards = init()
    const screenX = app.screen.width;
    const screenY = app.screen.height;
    const cardWidth = (screenX * 1.02) - screenX;
    const cardHeight = (screenY * 1.05) - screenY;
    let countdealCard = 1
    let listCardPlayer = []
    container.addChild(containerStartGame);

    let background_table = new CreateButtonSpriteImage(
        bgTable,
        scaleRatio,
        0.5,
        screenX / 2,
        screenY / 2,
        false,
    )
    containerStartGame.addChild(background_table)
    _beforeDealCardPlayer()

    // ============================ deal Card >>> ============================
    function _beforeDealCardPlayer() {
        _dealCardPlayer(
            cards[0],
            (screenX / 2) + ((cardWidth * cards[2].length + (cardWidth / 3 * cards[2].length)) / 2),
            screenY * 0.9,
            -1,
            -1,
            false
        );
        // phai
        _dealCardPlayer(
            cards[1],
            screenX - (screenX * 0.1),
            screenY / 2 + ((cardHeight * cards[1].length + (cardHeight / 6 * cards[1].length)) / 2),
            -1,
            -1,
            true
        );
        // tren
        _dealCardPlayer(
            cards[2],
            (screenX / 2) + ((cardWidth * cards[0].length + (cardWidth / 3 * cards[0].length)) / 2),
            screenY * 0.1,
            -1,
            -1,
            false
        );
        // trai
        _dealCardPlayer(
            cards[3],
            screenX * 0.1,
            screenY / 2 + ((cardHeight * cards[1].length + (cardHeight / 6 * cards[1].length)) / 2),
            -1,
            -1,
            true
        );
    }

    // ============================ move Card  a -> b >>> ============================
    function _moveSpriteToPosition(sprite, targetX, targetY, delay, nextTexture, filter, isVoiceLast, resolve) {
        gsap.to(sprite, {
            x: targetX,
            y: targetY,
            duration: 1,
            ease: "back.out(1.5)",
            delay: delay,
            onComplete: function () {
                const blurFilter = new PIXI.BlurFilter();
                let durationBlur = 0;
                sprite.filters = [blurFilter];
                if (isVoiceLast) {
                    sound.play('dealCardPlayer', {
                        volume: 0.2
                    });
                }
                if (filter) {
                    durationBlur = 0.3
                }

                gsap.to(sprite.filters[0], {
                    blur: 1,
                    duration: durationBlur,
                    ease: "power2.inOut",
                    onComplete: function () {
                        sprite.filters = [];
                    },
                });
                sprite.texture = nextTexture;
                resolve();
            },
        });
    }

    // ============================ deal Card  and index player >>> ============================
    async function _dealCardPlayer(cardsArray, cornerX, cornerY, offsetX, offsetY, formatIndexPlayer) {
        try {
            const hiddenCardTexture = PIXI.Texture.from('assets/cards/hidden.png');
            const animationPromises = [];
            for (let index = cardsArray.length - 1; index >= 0; index--) {
                let card = cardsArray[index].src;
                let cardTexture = hiddenCardTexture;
                let filter = false;
                let cardItem = new PlayerCard(hiddenCardTexture);
                const delay = index * 0.25;
                let targetX, targetY;
                cardItem.scale.set(scaleRatio);
                cardItem.anchor.set(0.5);
                cardItem.x = app.screen.width / 2;
                cardItem.y = app.screen.height / 2;
                cardItem.interactive = true;
                cardItem.cursor = 'hover';
                container.addChild(cardItem);
                // check and set permission player owner
                if (cardsArray[index].owner == 0) {
                    listCardPlayer.push(cardItem)
                    cardItem.canClick = true
                    cardItem.info = cardsArray[index]
                    cardTexture = PIXI.Texture.from(card);
                    filter = true
                }

                if (formatIndexPlayer) {
                    targetX = cornerX + Math.floor(index / cardsArray.length) * (cardWidth + cardHeight / 3) * offsetX;
                    targetY = cornerY + (index % cardsArray.length) * (cardHeight + cardHeight / 6) * offsetY;
                } else {
                    targetX = cornerX + (index % cardsArray.length) * (cardWidth + cardWidth / 3) * offsetX;
                    targetY = cornerY + Math.floor(index / cardsArray.length) * (cardHeight + cardHeight / 6) * offsetY;
                }

                let isLastCard = index > (cardsArray.length - (cardsArray.length) / 5) ? false : TextTrackCue
                const animationPromise = new Promise((resolve) => {
                    _moveSpriteToPosition(cardItem, targetX, targetY, delay, cardTexture, filter, isLastCard, resolve);
                });
                animationPromises.push(animationPromise);

                cardItem.on('pointerdown', () => onCardClick(cardItem));
            }
            await Promise.all(animationPromises);
            // console.log('====== Deal cards DONE ======')
            // create button in game
            countdealCard++
            if (countdealCard == cards.length) {
                InteractiveGame(container, app, scaleRatio, listCardPlayer)
            }

        } catch (error) {
            console.log(error)
        }
    }
}