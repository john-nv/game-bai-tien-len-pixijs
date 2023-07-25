import * as PIXI from "pixi.js";

export function CreateButtonSpriteImage(
    urlImage,
    scale,
    anchor,
    x,
    y,
    interactive = true,
    cursor = 'hover'
) {
    const button = PIXI.Sprite.from(urlImage);
    button.scale.set(scale);
    button.anchor.set(anchor);
    button.x = x;
    button.y = y;
    button.interactive = interactive;
    button.cursor = cursor;
    return button;
}