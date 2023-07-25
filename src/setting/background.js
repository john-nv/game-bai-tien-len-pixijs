import * as PIXI from "pixi.js";

export function createBackground(container, app, ScreenWidth) {
    const background = PIXI.Sprite.from('./src/assets/image/background/bg-1.png');
    const ScreenHeight = calculatorScreenHeight(ScreenWidth);
    let newScreenWidth;
    let newScreenHeight;

    _resizeBackground();
    window.addEventListener('resize', _resizeBackground);
    container.addChild(background);

    function _resizeBackground() {
        newScreenWidth = window.innerWidth;
        newScreenHeight;
        if (newScreenWidth < ScreenWidth) {
            newScreenHeight = calculatorScreenHeight(newScreenWidth)
        } else {
            newScreenWidth = ScreenWidth
            newScreenHeight = ScreenHeight
            console.log()
        }
        background.width = newScreenWidth;
        background.height = newScreenHeight;
        app.renderer.resize(newScreenWidth, newScreenHeight);
    }
}

export function calculatorScreenHeight(width) {
    return (width / 5) * 3
}
    // return
    // const starArray = [];
    // const totalstars = 20;

    // for (let i = 0; i < totalstars; i++) {
    //     // anh nhan vat
    //     const star = PIXI.Sprite.from('https://i.imgur.com/DTRDizR.png');

    //     star.anchor.set(0.5);

    //     // kick co nhan vat ngau nhien
    //     star.scale.set(0.09 + Math.random() * 0.3);

    //     // dat nhan vat vi tri ngau nhien
    //     star.x = Math.floor(Math.random() * app.screen.width);
    //     star.y = Math.floor(Math.random() * app.screen.height);

    //     // blendMode hoan tron nhan vat
    //     star.blendMode = PIXI.BLEND_MODES.DIFFERENCE;

    //     // kiem soat chuyen dong
    //     star.direction = Math.random() * Math.PI * 2;

    //     // doi huong cua nhan vat theo thoiwf gian
    //     star.turningSpeed = Math.random() - 0.8;

    //     // random toc do tu 0->2
    //     star.speed = 2 + Math.random() * 2;

    //     // dua vao quang de de quan ly
    //     starArray.push(star);

    //     app.stage.addChild(star);
    // }

    // // create a bounding box for the little stars
    // const starBoundsPadding = 100;

    // const starBounds = new PIXI.Rectangle(
    //     -starBoundsPadding,
    //     -starBoundsPadding,
    //     app.screen.width + starBoundsPadding * 2,
    //     app.screen.height + starBoundsPadding * 2,
    // );

    // app.ticker.add(() => {
    //     // iterate through the stars and update the positions
    //     for (let i = 0; i < starArray.length; i++) {
    //         const star = starArray[i];

    //         star.direction += star.turningSpeed * 0.01;
    //         star.x += Math.sin(star.direction) * star.speed;
    //         star.y += Math.cos(star.direction) * star.speed;
    //         star.rotation = -star.direction - Math.PI / 2;

    //         // wrap the stars by testing their bounds...
    //         if (star.x < starBounds.x) {
    //             star.x += starBounds.width;
    //         }
    //         else if (star.x > starBounds.x + starBounds.width) {
    //             star.x -= starBounds.width;
    //         }

    //         if (star.y < starBounds.y) {
    //             star.y += starBounds.height;
    //         }
    //         else if (star.y > starBounds.y + starBounds.height) {
    //             star.y -= starBounds.height;
    //         }
    //     }
    // });

