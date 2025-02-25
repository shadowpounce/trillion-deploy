import {MutableRefObject, RefObject, useEffect} from "react"

export const useObserver = (
    element: RefObject<any>,
    onEnter: () => void,
    onLeave: () => void,
    dependencies?: any[],
) => {
    useEffect(() => {
        const observerElement = element.current

        if (!observerElement) return

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    onEnter()
                } else {
                    onLeave()
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        })

        observer.observe(observerElement)

        return () => {
            observer.unobserve(observerElement)
        }
    }, dependencies)
}

export const useObserverGsap = (
    element: RefObject<any>,
    tl: MutableRefObject<gsap.core.Timeline | undefined>,
) => {
    useObserver(
        element,
        () => {
            tl.current?.play()
        },
        () => {
            tl.current?.pause()
        },
    )
}
