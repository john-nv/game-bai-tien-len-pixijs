// export function SettingCursor(app) {
//     // ============================    CURSOR MOUSE    >>> ===========================
//     const defaultIcon = 'url(\'https://pixijs.com/assets/bunny.png\'),auto';
//     const hoverIcon = 'url(\'https://pixijs.com/assets/bunny_saturated.png\'),auto';
//     app.renderer.events.cursorStyles.default = defaultIcon;
//     app.renderer.events.cursorStyles.hover = hoverIcon;
// }

// ============================    CURSOR MOUSE    >>> ===========================
export function SettingCursor(app) {
    const defaultIcon = 'url(\'assets/image/cursor_default.png\'),auto';
    const hoverIcon = 'url(\'assets/image/cursor_hover.png\'),auto';
    app.renderer.events.cursorStyles.default = defaultIcon;
    app.renderer.events.cursorStyles.hover = hoverIcon;
}