import gsap from "gsap"

export const gsapDelay = (func: Function, time?: number) => {
    // gsap.delayedCall(time || 0.5, func)
    gsap.delayedCall(time || 1, func)
}
