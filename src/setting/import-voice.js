import { sound } from '@pixi/sound';

// ============================    IMPORT VOICE    >>> ===========================
export function SettingSound() {
    sound.add('dealCardPlayer', 'assets/voice/phatbai.wav');
    sound.add('btn_click', 'assets/voice/btn_click.wav');
    sound.add('btn_click_1', 'assets/voice/btn_next.wav');
    sound.add('btn_hover', 'assets/voice/hover_btn.ogg');
    sound.add('music_bg', 'assets/voice/music-bg-2.mp3');
    sound.add('bridging_card', 'assets/voice/bridging-cards.wav');
}