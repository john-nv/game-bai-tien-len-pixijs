import { sound } from '@pixi/sound';
import gsap from 'gsap'

export function onButtonHandle(disabled, button, animation, duration, x, y, volume = 1, voiceBtn, externalFunction) {
    if (!button) return console.log('onButtonHandle => button not found')
    return function () {
        if (disabled === true) {
            return
        } else {
            sound.play(voiceBtn || 'btn_hover', { volume: volume });
            if (animation === true) {
                gsap.to(button.scale, { duration: duration || 0.1, x: x || 1, y: y || 1 });
            }

            if (typeof externalFunction === 'function') {
                externalFunction();
            }
        }
    };
}
