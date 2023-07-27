import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import gsap from 'gsap'
import { CreateButtonSpriteImage } from '../util/pixi-util/createButton';
import { onButtonHandle } from '../util/pixi-util/handle-button';
import { btnStartGame } from './button-start-game';
import { removeContainertWithAnimation } from '../util/pixi-util/sprites';
import { SearchTable } from './search-table-game';
import { TextCountDownStartGame } from './countDown-start';

const containerControl = new PIXI.Container();

let screenWidth = 0;
let screenHeight = 0;
let scaleRatio = 1;
let background_control_friend
let background_control_search
let background_control_start
let img_friends
let img_search
let textStyle
let text_friends
let text_search
let btn_test_game
let text_test_game
let container
let app

export function ControlGame(containerGame, appGame, scaleRatioGame) {
    container = containerGame
    app = appGame
    scaleRatio = scaleRatioGame
    screenWidth = app.screen.width;
    screenHeight = app.screen.height;

    container.addChild(containerControl)
    _createBtn()

    // test
    // btnStartGame(container, app, scaleRatio, containerControl)
}
function _createBtn() {
    const blurFilter = new PIXI.BlurFilter();
    blurFilter.blur = 1;
    const texturePlayingScreen = PIXI.Texture.from('assets/image/playingScreen.png');

    const btn_Search_crop = new PIXI.Rectangle(0, 1042, 140, 105);
    const btn_friend_crop = new PIXI.Rectangle(0, 1147, 147, 105);
    const bg_btn_crop = new PIXI.Rectangle(709, 217, 250, 300);

    const btnSearch = new PIXI.Texture(texturePlayingScreen.baseTexture, btn_Search_crop);
    const btnFriend = new PIXI.Texture(texturePlayingScreen.baseTexture, btn_friend_crop);
    const backgroundBtnFriend = new PIXI.Texture(texturePlayingScreen.baseTexture, bg_btn_crop);
    const backgroundBtnSearch = new PIXI.Texture(texturePlayingScreen.baseTexture, bg_btn_crop);


    background_control_friend = new CreateButtonSpriteImage(
        backgroundBtnFriend,
        scaleRatio,
        0.5,
        screenWidth * 0.328,
        screenHeight / 2,
        false,
    )

    background_control_search = new CreateButtonSpriteImage(
        backgroundBtnSearch,
        scaleRatio,
        0.5,
        screenWidth * 0.672,
        screenHeight / 2,
        false,
    )

    background_control_start = new CreateButtonSpriteImage(
        backgroundBtnSearch,
        scaleRatio,
        0.5,
        screenWidth / 2,
        screenHeight / 2,
        false,
    )

    img_search = new CreateButtonSpriteImage(
        btnSearch,
        scaleRatio,
        0.5,
        screenWidth * 0.672,
        screenHeight / 2,
    )

    btn_test_game = new CreateButtonSpriteImage(
        'assets/image/btnPlay.png',
        scaleRatio * 0.65,
        0.5,
        screenWidth / 2,
        screenHeight / 2,
    )

    img_friends = new CreateButtonSpriteImage(
        btnFriend,
        scaleRatio,
        0.5,
        screenWidth * 0.328,
        screenHeight / 2,
    )

    textStyle = new PIXI.TextStyle({
        fontFamily: 'Bungee Spice',
        fontSize: scaleRatio * 22,
        fill: 'white',
        align: 'center',
    });

    text_friends = new PIXI.Text('Play friends', textStyle);
    text_search = new PIXI.Text('Find a table', textStyle);
    text_test_game = new PIXI.Text('test game', textStyle);

    text_test_game.alpha = 1;
    text_test_game.anchor.set(0.5);
    text_test_game.x = btn_test_game.x;
    text_test_game.y = screenHeight * 0.6;

    text_friends.alpha = 1;
    text_friends.anchor.set(0.5);
    text_friends.x = img_friends.x;
    text_friends.y = screenHeight * 0.6;

    text_search.alpha = 1;
    text_search.anchor.set(0.5);
    text_search.x = img_search.x;
    text_search.y = screenHeight * 0.6;


    // background_control.filters = [blurFilter]
    containerControl.addChild(background_control_search)
    containerControl.addChild(background_control_friend)
    containerControl.addChild(background_control_start)
    containerControl.addChild(img_friends);
    containerControl.addChild(img_search);
    containerControl.addChild(btn_test_game);

    _eventControl()
}

function _eventControl() {
    img_search
        .on('pointerover', onButtonHandle(img_search, true, 0.1, scaleRatio * 0.98, scaleRatio * 0.98, 1, 'btn_hover', () => {
            containerControl.addChild(text_search);
        }))
        .on('pointerout', onButtonHandle(img_search, true, 0.1, scaleRatio, scaleRatio, 0.2, 'btn_hover', () => {
            containerControl.removeChild(text_search);
        }))
        .on('pointerdown', onButtonHandle(img_search, true, 0.1, scaleRatio * 0.95, scaleRatio * 0.95, 1, '', () => {
            removeContainertWithAnimation(containerControl)
            SearchTable(container, app, scaleRatio)
        }))
        .on('pointerup', onButtonHandle(img_search, true, 0.1, scaleRatio, scaleRatio, 0, undefined))
        .on('pointerupoutside', onButtonHandle(img_search, true, 0.1, scaleRatio, scaleRatio, 0, undefined))

    img_friends
        .on('pointerover', onButtonHandle(img_friends, true, 0.1, scaleRatio * 0.98, scaleRatio * 0.98, 1, 'btn_hover', () => {
            containerControl.addChild(text_friends);
        }))
        .on('pointerout', onButtonHandle(img_friends, true, 0.1, scaleRatio, scaleRatio, 0.2, 'btn_hover', () => {
            containerControl.removeChild(text_friends);
        }))
        .on('pointerdown', onButtonHandle(img_friends, true, 0.1, scaleRatio * 0.95, scaleRatio * 0.95, 1, ''))
        .on('pointerup', onButtonHandle(img_friends, true, 0.1, scaleRatio, scaleRatio, 0, undefined))
        .on('pointerupoutside', onButtonHandle(img_friends, true, 0.1, scaleRatio, scaleRatio, 0, undefined))

    btn_test_game
        .on('pointerover', onButtonHandle(btn_test_game, true, 0.1, scaleRatio * 0.63, scaleRatio * 0.63, 1, 'btn_hover', () => {
            containerControl.addChild(text_test_game);
        }))
        .on('pointerout', onButtonHandle(btn_test_game, true, 0.1, scaleRatio * 0.65, scaleRatio * 0.65, 1, 'btn_hover', () => {
            containerControl.removeChild(text_test_game);
        }))
        .on('pointerdown', onButtonHandle(btn_test_game, true, 0.1, scaleRatio * 0.65, scaleRatio * 0.65, 1, '', () => {
            removeContainertWithAnimation(containerControl)
            sound.play('btn_click', { volume: 2 })
            gsap.to(btn_test_game, {
                duration: 0.3, alpha: 0, onComplete: () => {
                    // ===== TEXT COUNTDOWN START IN GAME >>> ======
                    TextCountDownStartGame(containerControl, app, scaleRatio)
                }
            });
        }))
}