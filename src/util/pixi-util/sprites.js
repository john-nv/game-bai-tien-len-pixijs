import gsap from 'gsap'

export function removeContainertWithAnimation(removeContainer, duration) {
    gsap.to(removeContainer, {
        alpha: 0, duration: duration | 0.5, onComplete: () => {
            removeContainer.removeChildren();
            removeContainer.alpha = 1;
        }
    });
}