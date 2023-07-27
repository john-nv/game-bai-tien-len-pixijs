import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import gsap from 'gsap'
import { TextCountDownStartGame } from './countDown-start'
import { removeContainertWithAnimation } from '../util/pixi-util/sprites';

export function btnStartGame(container, app, scaleRatio, containerControl) {
    const buttonPlayGame = PIXI.Sprite.from('assets/image/btnPlay.png');
    buttonPlayGame.scale.set(scaleRatio * 0.7);
    buttonPlayGame.anchor.set(0.5);
    buttonPlayGame.x = app.screen.width * 0.85;
    buttonPlayGame.y = app.screen.height * 0.85;
    buttonPlayGame.interactive = true;
    buttonPlayGame.cursor = 'hover';
    container.addChild(buttonPlayGame);
    let text_start_game
    let textStyle = new PIXI.TextStyle({
        fontFamily: 'Bungee Spice',
        fontSize: scaleRatio * 22,
        fill: 'white',
        align: 'center',
    });


    buttonPlayGame
        .on('pointerdown', onButtonDown)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);

    text_start_game = new PIXI.Text('Test Game', textStyle);
    text_start_game.alpha = 1;
    text_start_game.anchor.set(0.5);
    text_start_game.x = buttonPlayGame.x;
    text_start_game.y = app.screen.height * 0.92;

    function onButtonDown() {
        container.removeChild(text_start_game)
        removeContainertWithAnimation(containerControl)

        sound.play('btn_click', { volume: 2 })
        gsap.to(buttonPlayGame, {
            duration: 0.3, alpha: 0, onComplete: () => {
                container.removeChild(buttonPlayGame);
                // ===== TEXT COUNTDOWN START IN GAME >>> ======
                TextCountDownStartGame(container, app, scaleRatio)
            }
        });
    }

    function onButtonOver() {
        sound.play('btn_hover', { volume: 2 })
        gsap.to(buttonPlayGame.scale, { duration: 0.1, x: scaleRatio * 0.8, y: scaleRatio * 0.8 });
        container.addChild(text_start_game)
    }
    function onButtonOut() {
        sound.play('btn_hover', { volume: 2 })
        gsap.to(buttonPlayGame.scale, { duration: 0.2, x: scaleRatio * 0.7, y: scaleRatio * 0.7 });
        container.removeChild(text_start_game)
        btnStartGame(container, app, sc)
    }
}