import gsap from "gsap"

export const revealAnimation = (
    element: any,
    params?: {
        from?: gsap.TweenVars
        to?: gsap.TweenVars
    },
    start?: number,
    toggleActions?: string,
) => {
    let tl: gsap.core.Timeline

    tl = gsap
        .timeline({
            paused: true,
            defaults: {},
            delay: 0.1,
            scrollTrigger: {
                trigger: element,
                start: `top top+=${start || 105}%`,
                toggleActions: toggleActions || "play none resume reset",
                // markers: true,
            },
        })
        .fromTo(
            element,
            {opacity: 0, ...params?.from},
            {
                opacity: 1,
                ...params?.to,
            },
        )
}
