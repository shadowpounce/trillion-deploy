import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

interface ICreateScrollTrigger {
    trigger: any
    tl: gsap.core.Timeline
    start?: string
    reversePlay?: boolean
}

export const createScrollTrigger = ({
    trigger,
    tl,
    start,
    reversePlay = true,
}: ICreateScrollTrigger) => {
    gsap.registerPlugin(ScrollTrigger)

    const timeLine = gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            start: start || "top top+=95%",
            // markers: true,
            onLeaveBack() {
                reversePlay ? tl.reverse() : tl.pause()
            },
            onEnter() {
                tl.play()
            },
        },
    })

    return () => timeLine.scrollTrigger?.kill(true)
}
