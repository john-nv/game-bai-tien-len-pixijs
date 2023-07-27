import * as PIXI from 'pixi.js';
import { CreateButtonSpriteImage } from '../util/pixi-util/createButton';

let screenWidth = 0
let screenHeight = 0
let container
let app

export function SearchTable(containerGame, appGame, scaleRatio) {
    container = containerGame
    app = appGame
    let containerSearchTable = new PIXI.Container()
    container.addChild(containerSearchTable);

    let backgroundTable = new CreateButtonSpriteImage(
        'assets/image/control/bg-control.jpg',
        scaleRatio,
        0.5,
        screenWidth /2,
        screenHeight / 2,
        false,
        ''
    )

    containerSearchTable.addChild(backgroundTable)
}