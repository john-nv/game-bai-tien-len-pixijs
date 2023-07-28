import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import gsap from 'gsap'
import { CreateButtonSpriteImage } from '../util/pixi-util/createButton';
import { onButtonHandle } from '../util/pixi-util/handle-button';
import { btnStartGame } from './button-start-game';
import { removeContainertWithAnimation } from '../util/pixi-util/sprites';
import { SearchTable } from './search-table-game';
import { TextCountDownStartGame } from './countDown-start';
import { SpinGame } from './spin';

const containerControl = new PIXI.Container();
const containerButton = new PIXI.Container();

let screenWidth = 0;
let screenHeight = 0;
let scaleRatio = 1;
let background_control_friend
let background_control_search
let background_control_start
let btnSpin_one
let btnSpin_two
let img_friends
let img_search
let textStyle
let text_friends
let text_search
let btn_test_game
let text_test_game
let text_countdown_spin
let container
let app
// ========= SPIN =========
let isBtnOneVisible = true;
let remainingTime = 2;
const toggleInterval = 400;
let startSpin = localStorage.getItem('spin')
if(!startSpin || startSpin > 1 || startSpin < 0){
    localStorage.setItem('spin', 0)
}
// ========================
const texturePlayingScreen = PIXI.Texture.from('assets/image/playingScreen.png');
const homeScreen = PIXI.Texture.from('assets/image/homeScreen.png');

export function ControlGame(containerGame, appGame, scaleRatioGame) {
    container = containerGame
    app = appGame
    scaleRatio = scaleRatioGame
    screenWidth = app.screen.width;
    screenHeight = app.screen.height;

    container.addChild(containerControl)
    container.addChild(containerButton)
    _createBtn()

    // test
    // SpinGame(containerControl, containerButton, app, scaleRatio)
}

function _createBtn() {
    const blurFilter = new PIXI.BlurFilter();
    blurFilter.blur = 1;
    const spin_crop_one = new PIXI.Rectangle(1550, 743, 240, 96);
    const spin_crop_two = new PIXI.Rectangle(826, 85, 240, 96);
    const btn_Search_crop = new PIXI.Rectangle(0, 1042, 140, 105);
    const btn_friend_crop = new PIXI.Rectangle(0, 1147, 147, 105);
    const bg_btn_crop = new PIXI.Rectangle(709, 217, 250, 300);

    const btnSearch = new PIXI.Texture(texturePlayingScreen.baseTexture, btn_Search_crop);
    const btnSpinOne = new PIXI.Texture(homeScreen.baseTexture, spin_crop_one);
    const btnSpinTwo = new PIXI.Texture(homeScreen.baseTexture, spin_crop_two);
    const btnFriend = new PIXI.Texture(texturePlayingScreen.baseTexture, btn_friend_crop);
    // const btnFriend = new PIXI.Texture(spinScreen.baseTexture, btn_friend_crop);
    const backgroundBtnFriend = new PIXI.Texture(texturePlayingScreen.baseTexture, bg_btn_crop);
    const backgroundBtnSearch = new PIXI.Texture(texturePlayingScreen.baseTexture, bg_btn_crop);

    // ============================== >>> SPIN ==============================
    btnSpin_one = new CreateButtonSpriteImage(
        btnSpinOne,
        scaleRatio,
        0.5,
        screenWidth / 2,
        screenHeight - (btnSpinOne.height * scaleRatio / 2),
        false,
    )

    btnSpin_two = new CreateButtonSpriteImage(
        btnSpinTwo,
        scaleRatio,
        0.5,
        screenWidth / 2,
        screenHeight - (btnSpinOne.height * scaleRatio / 2),
        false,
    )
    // ============================== SPIN <<< ==============================
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

    // ============================ >>> TEXT ============================
    textStyle = new PIXI.TextStyle({
        fontFamily: 'Bungee Spice',
        fontSize: scaleRatio * 22,
        fill: 'white',
        align: 'center',
    });

    text_friends = new PIXI.Text('Play friends', textStyle);
    text_search = new PIXI.Text('Find a table', textStyle);
    text_test_game = new PIXI.Text('test game', textStyle);
    text_countdown_spin = new PIXI.Text('--:--', textStyle);

    text_countdown_spin.alpha = 1;
    text_countdown_spin.interactive = true;
    text_countdown_spin.cursor = 'hover';
    text_countdown_spin.anchor.set(0.5);
    text_countdown_spin.x = btnSpin_one.x;
    text_countdown_spin.y = screenHeight - (btnSpinOne.height * scaleRatio / 4);

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


    // containerButton.filters = [blurFilter]
    containerButton.addChild(background_control_search)
    containerButton.addChild(background_control_friend)
    containerButton.addChild(background_control_start)
    containerButton.addChild(img_friends);
    containerButton.addChild(img_search);
    containerButton.addChild(btn_test_game);
    containerButton.addChild(btnSpin_one)
    containerButton.addChild(btnSpin_two)
    containerButton.addChild(text_countdown_spin)

    _eventButton()
    _autoSpin()
}

function _eventButton() {
    img_search
        .on('pointerover', onButtonHandle(img_search, true, 0.1, scaleRatio * 0.98, scaleRatio * 0.98, 1, 'btn_hover', () => {
            containerButton.addChild(text_search);
        }))
        .on('pointerout', onButtonHandle(img_search, true, 0.1, scaleRatio, scaleRatio, 0.2, 'btn_hover', () => {
            containerButton.removeChild(text_search);
        }))
        .on('pointerdown', onButtonHandle(img_search, true, 0.1, scaleRatio * 0.95, scaleRatio * 0.95, 1, '', () => {
            alert('find a table')
        }))
        .on('pointerup', onButtonHandle(img_search, true, 0.1, scaleRatio, scaleRatio, 0, undefined))
        .on('pointerupoutside', onButtonHandle(img_search, true, 0.1, scaleRatio, scaleRatio, 0, undefined))

    img_friends
        .on('pointerover', onButtonHandle(img_friends, true, 0.1, scaleRatio * 0.98, scaleRatio * 0.98, 1, 'btn_hover', () => {
            containerButton.addChild(text_friends);
        }))
        .on('pointerout', onButtonHandle(img_friends, true, 0.1, scaleRatio, scaleRatio, 0.2, 'btn_hover', () => {
            containerButton.removeChild(text_friends);
        }))
        .on('pointerdown', onButtonHandle(img_friends, true, 0.1, scaleRatio * 0.95, scaleRatio * 0.95, 1, '', () => {
            alert('enter id or create a game table with friends')
        }))
        .on('pointerup', onButtonHandle(img_friends, true, 0.1, scaleRatio, scaleRatio, 0, undefined))
        .on('pointerupoutside', onButtonHandle(img_friends, true, 0.1, scaleRatio, scaleRatio, 0, undefined))

    btn_test_game
        .on('pointerover', onButtonHandle(btn_test_game, true, 0.1, scaleRatio * 0.63, scaleRatio * 0.63, 1, 'btn_hover', () => {
            containerButton.addChild(text_test_game);
        }))
        .on('pointerout', onButtonHandle(btn_test_game, true, 0.1, scaleRatio * 0.65, scaleRatio * 0.65, 1, 'btn_hover', () => {
            containerButton.removeChild(text_test_game);
        }))
        .on('pointerdown', onButtonHandle(btn_test_game, true, 0.1, scaleRatio * 0.65, scaleRatio * 0.65, 1, '', () => {
            removeContainertWithAnimation(containerButton)
            sound.play('btn_click', { volume: 2 })
            gsap.to(btn_test_game, {
                duration: 0.3, alpha: 0, onComplete: () => {
                    // ===== TEXT COUNTDOWN START IN GAME >>> ======
                    TextCountDownStartGame(containerButton, app, scaleRatio)
                }
            });
        }))

    text_countdown_spin
        .on('pointerdown', onButtonHandle(text_countdown_spin, true, 0.1, null, null, 0.5, 'btn_hover', () => {
            if(startSpin == 1){
                text_countdown_spin.text = `quay Xong`;
                SpinGame(containerControl,containerButton, app, scaleRatio)
            }
        }))
}

function _autoSpin() {
    function displayTime() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        text_countdown_spin.text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    }

    function toggleSprites() {
        btnSpin_one.visible = !isBtnOneVisible;
        btnSpin_two.visible = isBtnOneVisible;
        isBtnOneVisible = !isBtnOneVisible;

        startSpin = localStorage.getItem('spin')
    }

    setInterval(toggleSprites, toggleInterval);

    const countdownInterval = setInterval(() => {
        remainingTime--;
        displayTime();
        if (remainingTime == 0) {
            clearInterval(countdownInterval);
            text_countdown_spin.text = `quay`;
            localStorage.setItem('spin', 1)
        }
    }, 1000);

    toggleSprites();
    displayTime();
}