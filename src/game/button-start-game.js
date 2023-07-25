import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import gsap from 'gsap'
import { TextCountDownStartGame } from './countDown-start'

export function btnStartGame(container) {
    const buttonPlayGame = PIXI.Sprite.from('src/assets/image/btnPlay.png');
    buttonPlayGame.scale.set(0.5);
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
                app.stage.removeChild(buttonPlayGame);
                // === TEXT COUNTDOWN START IN GAME >>> ====
                TextCountDownStartGame(container)
            }
        });
    }

    function onButtonOver() {
        sound.play('btn_hover', { volume: 2 })
        gsap.to(buttonPlayGame.scale, { duration: 0.1, x: 0.55, y: 0.55 });
    }
    function onButtonOut() {
        sound.play('btn_hover', { volume: 2 })
        gsap.to(buttonPlayGame.scale, { duration: 0.2, x: 0.5, y: 0.5 });
    }
}