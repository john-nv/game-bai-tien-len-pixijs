import { gsap } from 'gsap';
import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import { startGame } from './start-game';

export function TextCountDownStartGame(container) {
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 45,
        fill: '#ffffff',
    });

    const text = new PIXI.Text('', style);
    text.anchor.set(0.5);
    text.x = app.screen.width / 2;
    text.y = app.screen.height / 2;
    container.addChild(text);

    let count = 3;

    function updateCountdown() {
        text.text = count > 0 ? `Start game in .... ${count}s` : "Start game!";
        count--;

        if (count >= -1) {
            if (count >= 0) {
                sound.play('btn_hover', { volume: 2 })
                setTimeout(updateCountdown, 1000);
            } else {
                sound.play('bridging_card', { volume: 2 })
                app.stage.removeChild(text);
                startGame(container)
            }
        }
    }
    setTimeout(updateCountdown, 500)
}
