import * as PIXI from 'pixi.js';


export function createSprites(images, container) {
    for (let i = 0; i < images.length; i++) {
      const imagePath = images[i];
      const texture = PIXI.Texture.from(imagePath);
      const sprite = new PIXI.Sprite(texture);
  
      sprite.x = i % 8 * 100; 
      sprite.y = Math.floor(i / 8) * 100; 
      container.addChild(sprite);
    }
  }
  