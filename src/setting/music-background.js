import * as PIXI from "pixi.js";
import { sound } from '@pixi/sound';
import gsap from 'gsap'

import { CreateButtonSpriteImage } from '../util/pixi-util/createButton'

export function SettingMusicBackground(container, app, scaleRatio) {
    let isCheckBtnBg = true;
    let isCheckBtnMusic = true;
    // ===================== MUSIC BACKGROUND >>> ====================
    // sound.play('music_bg', {loop: true})
    // ==================== MUSIC BACKGROUND <<< =====================
    const buttonMusicBg = new CreateButtonSpriteImage(
        'assets/image/btnMusic.png',
        scaleRatio,
        0.5,
        (app.screen.width * 1.03) - app.screen.width,
        (app.screen.height * 1.04) - app.screen.height
    )
    const buttonMusicGame = new CreateButtonSpriteImage(
        'assets/image/btnMusicGame.png',
        scaleRatio,
        0.5,
        (app.screen.width * 1.065) - app.screen.width,
        (app.screen.height * 1.04) - app.screen.height
    )

    container.addChild(buttonMusicBg);
    container.addChild(buttonMusicGame);

    buttonMusicBg
        .on('pointerdown', _onButtonDown)
        .on('pointerup', _onButtonUp)
        .on('pointerupoutside', _onButtonUp)
        .on('pointerover', _onButtonOver)
        .on('pointerout', _onButtonOut);

    buttonMusicGame
        .on('pointerdown', _onButtonGameDown)
        .on('pointerup', _onButtonGameUp)
        .on('pointerupoutside', _onButtonGameUp)
        .on('pointerover', _onButtonGameOver)
        .on('pointerout', _onButtonGameOut);

    function _onButtonDown() {
        if (isCheckBtnBg == true) {
            _drawRedCross(this)
            sound.stop('music_bg');
        } else {
            sound.play('music_bg', {
                loop: true
            })
            _removeRedCross(this)
        }
        isCheckBtnBg = !isCheckBtnBg
    }

    function _onButtonUp() { }

    function _onButtonOver() {
        sound.play('btn_hover', { volume: 1 })
        gsap.to(buttonMusicBg.scale, { duration: 0.1, x: scaleRatio, y: scaleRatio });
    }

    function _onButtonOut() {
        sound.play('btn_hover', { volume: 1 })
        gsap.to(buttonMusicBg.scale, { duration: 0.2, x: scaleRatio * 1.1, y: scaleRatio * 1.1 });
    }

    function _onButtonGameDown() {
        if (isCheckBtnMusic == true) {
            _drawRedCross(this)
        } else {
            _removeRedCross(this)
        }
        isCheckBtnMusic = !isCheckBtnMusic
    }

    function _onButtonGameUp() { }

    function _onButtonGameOver() {
        sound.play('btn_hover', { volume: 1 })
        gsap.to(buttonMusicGame.scale, { duration: 0.1, x: scaleRatio, y: scaleRatio });
    }

    function _onButtonGameOut() {
        sound.play('btn_hover', { volume: 1 })
        gsap.to(buttonMusicGame.scale, { duration: 0.2, x: scaleRatio * 1.1, y: scaleRatio * 1.1 });
    }

    function _drawRedCross(button) {
        const cross = new PIXI.Graphics();
        cross.lineStyle(3, 0xff0000);
        cross.moveTo(-15, -15);
        cross.lineTo(15, 15);
        cross.position.copyFrom({ x: 0, y: 0 });
        button.addChild(cross);
    }

    function _removeRedCross(button) {
        const cross = button.getChildAt(button.children.length - 1);
        button.removeChild(cross);
    }
}