import gsap from "gsap"

export const getAnimation = (
    element: any,
    params?: {
        from?: gsap.TweenVars
        to?: gsap.TweenVars
    },
) => {
    let anim: gsap.core.Timeline

    anim = gsap.timeline({paused: true}).fromTo(
        element,
        {opacity: 0, ...params?.from},
        {
            opacity: 1,
            ...params?.to,
        },
    )

    return anim
}
