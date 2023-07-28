import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import gsap from 'gsap'
import { CreateButtonSpriteImage } from '../util/pixi-util/createButton';
import { onButtonHandle } from '../util/pixi-util/handle-button';
import { formatMoney } from '../util/text';

let app
let containerControl
let containerButton
const containerSpin = new PIXI.Container()
let scaleRatio
let screenWidth
let screenHeight
const spinScreen = PIXI.Texture.from('assets/image/spin.png');
const playingScreen = PIXI.Texture.from('assets/image/playingScreen.png');
const spriteStates = [true, false, false];
const toggleInterval = 1000;

const spin_spin1_drop = new PIXI.Rectangle(0, 422, 500, 500);
const spin_spin2_drop = new PIXI.Rectangle(499, 422, 500, 500);
const spin_default_drop = new PIXI.Rectangle(998, 422, 500, 500);
const list_spin_money_drop = new PIXI.Rectangle(703, 0, 422, 422)
const arrow_spin_drop = new PIXI.Rectangle(176, 85, 115, 112)
const click_spin_drop = new PIXI.Rectangle(12, 42, 145, 145)
const result_one_spin_drop = new PIXI.Rectangle(1226, 190, 96, 230)
const result_two_spin_drop = new PIXI.Rectangle(1125, 190, 96, 230)
const table_result_money_drop = new PIXI.Rectangle(2, 190, 700, 230)
const btn_exit_table_drop = new PIXI.Rectangle(1370, 392, 130, 43)

let spin_spin1 = new PIXI.Texture(spinScreen.baseTexture, spin_spin1_drop);
let spin_spin2 = new PIXI.Texture(spinScreen.baseTexture, spin_spin2_drop);
let spin_default = new PIXI.Texture(spinScreen.baseTexture, spin_default_drop);
let list_spin_money = new PIXI.Texture(spinScreen.baseTexture, list_spin_money_drop);
let arrow_spin = new PIXI.Texture(spinScreen.baseTexture, arrow_spin_drop);
let click_spin = new PIXI.Texture(spinScreen.baseTexture, click_spin_drop);
let result_one_spin = new PIXI.Texture(spinScreen.baseTexture, result_one_spin_drop);
let result_two_spin = new PIXI.Texture(spinScreen.baseTexture, result_two_spin_drop);
let table_result_money = new PIXI.Texture(spinScreen.baseTexture, table_result_money_drop);
let btn_exit_table = new PIXI.Texture(playingScreen.baseTexture, btn_exit_table_drop);
let textStyle;
let text_click_spin;
let text_table_result_money;
let text_btn_exit_table;
let checkSpin = true;
let isRunResutlSpin = true;

let onSpin = false

export function SpinGame(containerControlGame, containerButtonGame, appGame, scaleRatioGame){
    if(!onSpin){
        console.log(0)
        onGame(containerControlGame, containerButtonGame, appGame, scaleRatioGame)
        onSpin = !onSpin
    }else{
        containerSpin.visible = true
        _hiddenBtnControl()
        _toggleSprites()
        setInterval(_toggleSprites, toggleInterval);
    }
}

function onGame(containerControlGame, containerButtonGame, appGame, scaleRatioGame) {
    containerControl = containerControlGame
    containerButton = containerButtonGame
    app = appGame
    scaleRatio = scaleRatioGame
    screenWidth = app.screen.width;
    screenHeight = app.screen.height;
    containerControl.addChild(containerSpin)

    _hiddenBtnControl()
    _createAndEventSpin()
    // setTimeout(_showBtnControl, 2000)


    _eventSpin()
    _toggleSprites()
    setInterval(_toggleSprites, toggleInterval);
}

function _createAndEventSpin() {
    spin_default = new CreateButtonSpriteImage(
        spin_default,
        scaleRatio,
        0.5,
        screenWidth / 2,
        screenHeight / 2,
        false,
    )
    spin_spin1 = new CreateButtonSpriteImage(
        spin_spin1,
        scaleRatio,
        0.5,
        screenWidth / 2,
        screenHeight / 2,
        false,
    )
    spin_spin2 = new CreateButtonSpriteImage(
        spin_spin2,
        scaleRatio,
        0.5,
        screenWidth / 2,
        screenHeight / 2,
        false,
    )
    list_spin_money = new CreateButtonSpriteImage(
        list_spin_money,
        scaleRatio,
        0.5,
        screenWidth / 2,
        screenHeight / 2,
        false,
    )
    arrow_spin = new CreateButtonSpriteImage(
        arrow_spin,
        scaleRatio,
        0.5,
        spin_default.x,
        spin_default.y / 2,
        false,
    )

    click_spin = new CreateButtonSpriteImage(
        click_spin,
        scaleRatio * 0.5,
        0.5,
        screenWidth / 2,
        screenHeight / 2,
        true,
    )
    result_one_spin = new CreateButtonSpriteImage(
        result_one_spin,
        scaleRatio,
        0.5,
        list_spin_money.x * 0.997,
        list_spin_money.y * 0.755,
        false,
    )
    result_two_spin = new CreateButtonSpriteImage(
        result_two_spin,
        scaleRatio,
        0.5,
        list_spin_money.x * 0.997,
        list_spin_money.y * 0.755,
        false,
    )
    table_result_money = new CreateButtonSpriteImage(
        table_result_money,
        scaleRatio,
        0.5,
        screenWidth / 2,
        screenHeight * 0.75,
        false,
    )
    btn_exit_table = new CreateButtonSpriteImage(
        btn_exit_table,
        scaleRatio,
        0.5,
        table_result_money.x,
        table_result_money.y * 1.05,
        true,
    )
    // ===================== STYLE TEXT =====================
    textStyle = new PIXI.TextStyle({
        fontFamily: 'Anton',
        fontSize: scaleRatio * 16,
        fill: 'white',
        align: 'center',
    });
    text_click_spin = new PIXI.Text('QUAY', textStyle);
    text_table_result_money = new PIXI.Text(``, textStyle);
    text_btn_exit_table = new PIXI.Text(`Thoát`, textStyle);

    text_click_spin.alpha = 1;
    text_click_spin.anchor.set(0.5);
    text_click_spin.x = click_spin.x;
    text_click_spin.y = click_spin.y;

    text_table_result_money.alpha = 1;
    text_table_result_money.anchor.set(0.5);
    text_table_result_money.x = btn_exit_table.x;
    text_table_result_money.y = btn_exit_table.y * 0.9;

    text_btn_exit_table.alpha = 1;
    text_btn_exit_table.anchor.set(0.5);
    text_btn_exit_table.x = btn_exit_table.x;
    text_btn_exit_table.y = btn_exit_table.y;
    // ===================== ---------- =====================


    spin_default.visible = false
    spin_spin1.visible = false
    spin_spin2.visible = false
    list_spin_money.visible = true
    arrow_spin.visible = true
    result_one_spin.visible = false
    result_two_spin.visible = false
    table_result_money.visible = false 
    text_table_result_money.visible = false
    btn_exit_table.visible = false 
    text_btn_exit_table.visible = false
    containerSpin.addChild(spin_default)
    containerSpin.addChild(spin_spin1)
    containerSpin.addChild(spin_spin2)
    containerSpin.addChild(list_spin_money)
    containerSpin.addChild(result_one_spin)
    containerSpin.addChild(result_two_spin)
    containerSpin.addChild(click_spin)
    containerSpin.addChild(text_click_spin)
    containerSpin.addChild(arrow_spin)
    containerSpin.addChild(table_result_money)
    containerSpin.addChild(text_table_result_money)
    containerSpin.addChild(btn_exit_table)
    containerSpin.addChild(text_btn_exit_table)
}

function _eventSpin() {
    click_spin
        .on('pointerover', onButtonHandle(click_spin, true, 0.1, scaleRatio * 0.51, scaleRatio * 0.51, 1, 'btn_hover', () => {
            // click_spin.addChild(text_search);
        }))
        .on('pointerout', onButtonHandle(click_spin, true, 0.1, scaleRatio * 0.5, scaleRatio * 0.5, 0, '', () => {
            // click_spin.removeChild(text_search);
        }))
        .on('pointerdown', onButtonHandle(click_spin, true, 0.1, scaleRatio * 0.5, scaleRatio * 0.5, 1, '', () => {
            _rotateSpin()
        }))


    btn_exit_table
        .on('pointerover', onButtonHandle(btn_exit_table, true, 0.1, scaleRatio, scaleRatio, 1, 'btn_hover'))
        .on('pointerout', onButtonHandle(btn_exit_table, true, 0.1, scaleRatio, scaleRatio, 0, ''))
        .on('pointerdown', onButtonHandle(btn_exit_table, true, 0.1, scaleRatio * 0.95, scaleRatio * 0.95, 1, '', () => {
            _showBtnControl()
        }))

}

function _toggleSprites() {
    const temp = spriteStates[0];
    for (let i = 0; i < spriteStates.length - 1; i++) {
        spriteStates[i] = spriteStates[i + 1];
    }
    spriteStates[spriteStates.length - 1] = temp;

    spin_default.visible = spriteStates[0];
    spin_spin1.visible = spriteStates[1];
    spin_spin2.visible = spriteStates[2];
}

function _toggleSpritesResultSpin() {
    result_one_spin.visible = !isRunResutlSpin
    result_two_spin.visible = isRunResutlSpin
    isRunResutlSpin = !isRunResutlSpin
}

function _customEasing(progress) {
    return 1 - Math.pow(1 - progress, 3);
}

function _rotateSpin() {
    if (checkSpin) {
        checkSpin = !checkSpin
        const totalZones = 15;
        const round = 2 * Math.PI;
        const oneZone = round / totalZones;

        let stoppingZone = _randomFrom1To15();

        const rotationAmount = (oneZone * stoppingZone) + (round * 2);

        gsap.to(list_spin_money, {
            duration: 1.5,
            rotation: `+=${rotationAmount}`,
            ease: _customEasing,
            onComplete: () => {
                text_click_spin.text = 'HET'
                const resultMoneySpin = _showResultSpinMoney(stoppingZone);
                _showTableResultMoney(resultMoneySpin)
            },
        });
    }
}

function _showResultSpinMoney(index) {
    const spinMoney = [20000, 300000, 50000, 20000, 100000, 50000, 20000, 100000, 500000, 20000, 50000, 200000, 20000, 50000, 100000];
    const valueMoney = spinMoney[index]
    console.log('valueMoney => ' + valueMoney)
    return valueMoney
}

function _randomFrom1To15() {
    const index = Math.floor(Math.random() * 15)
    return index;
}

function _hiddenBtnControl() {
    containerButton.visible = false
}

function _showBtnControl() {
    containerButton.visible = true;
    containerSpin.visible = false;
}

function _showTableResultMoney(money) {
    money = formatMoney(money)
    text_table_result_money.text = `Chúc mừng bạn đã nhận được ${money.formatMoney}đ từ vòng quay may mắn.`
    setInterval(_toggleSpritesResultSpin, 300);
    table_result_money.visible = true;
    text_table_result_money.visible = true
    btn_exit_table.visible = true 
    text_btn_exit_table.visible = true
}