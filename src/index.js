import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import { createBackground } from './setting/background'
import { btnStartGame } from './game/button-start-game';
import { SettingMusicBackground } from './setting/music-background'
import { startGame } from './game/start-game';
import { SettingSound } from './setting/import-voice'
import { SettingCursor } from './setting/cursor'
import { calculatorScreenHeight } from './setting/background';

const screenWidth = 1500
const screenHeight = calculatorScreenHeight(screenWidth)

const app = new PIXI.Application({ autoDensity: true, width: screenWidth, height: screenHeight });
const container = new PIXI.Container()
app.stage.addChild(container);
console.log(screenWidth)
console.log(screenHeight)
document.getElementById("app").appendChild(app.view)

// ============================     BACKGROUND    >>> ============================
createBackground(container, app, screenWidth);
const scaleRatio = Math.min(
    app.screen.width / screenWidth,
    app.screen.height / calculatorScreenHeight(screenWidth)
);

// ============================    CURSOR MOUSE    >>> ===========================
SettingCursor(app);
// ============================    IMPORT VOICE    >>> ===========================
SettingSound();
// ============================  MUSIC BACKGROUND >>> ============================
SettingMusicBackground(container, app, scaleRatio);
// ============================ BUTTON START GAME >>> ============================
btnStartGame(container, app, scaleRatio)

// // loi tat
// startGame(container, app, scaleRatio);