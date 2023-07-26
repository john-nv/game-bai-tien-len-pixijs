import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import gsap from 'gsap'
import { TextCountDownStartGame } from './countDown-start'

export function btnStartGame(container, app, scaleRatio) {
    const buttonPlayGame = PIXI.Sprite.from('assets/image/btnPlay.png');
    buttonPlayGame.scale.set(scaleRatio);
    buttonPlayGame.anchor.set(0.5);
    buttonPlayGame.x = (app.screen.width) / 2;
    buttonPlayGame.y = app.screen.height / 2;
    buttonPlayGame.interactive = true
    buttonPlayGame.cursor = 'hover';
    container.addChild(buttonPlayGame);

    buttonPlayGame
        .on('pointerdown', onButtonDown)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);

    function onButtonDown() {
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
        gsap.to(buttonPlayGame.scale, { duration: 0.1, x: scaleRatio * 1.1, y: scaleRatio * 1.1 });
    }
    function onButtonOut() {
        sound.play('btn_hover', { volume: 2 })
        gsap.to(buttonPlayGame.scale, { duration: 0.2, x: scaleRatio, y: scaleRatio });
    }
}