export function getSizeImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        let width = image.width;
        let height = image.height;

        image.onload = function () {
            width = image.width;
            height = image.height;
            resolve({ width, height });
        };
        image.onerror = function () {
            console.error('ERROR => getSizeImage')
            resolve({ width, height });
        };
    });
}
