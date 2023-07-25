import { sound } from '@pixi/sound';

// ============================    IMPORT VOICE    >>> ===========================
export function SettingSound() {
    sound.add('dealCardPlayer', 'src/assets/voice/phatbai.wav');
    sound.add('btn_click', 'src/assets/voice/btn_click.wav');
    sound.add('btn_click_1', 'src/assets/voice/btn_next.wav');
    sound.add('btn_hover', 'src/assets/voice/hover_btn.ogg');
    sound.add('music_bg', 'src/assets/voice/music-bg-2.mp3');
    sound.add('bridging_card', 'src/assets/voice/bridging-cards.wav');
}