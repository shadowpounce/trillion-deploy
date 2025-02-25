"use client"

import {useGSAP} from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import {ReactNode, useEffect, useRef, useState} from "react"

import {gsapDelay} from "utils/gsap/gsapDelay"

import style from "./index.module.scss"
import {preloader} from "./preloader"

interface ISliderLineProps {
    items: ReactNode[]
    type: "row" | "col"
    speedMultiplayer: number
    speedMultiplayerHover: number
    direction: "to-right" | "to-left"
    checkLoad: boolean
}

export const SliderLine: React.FunctionComponent<ISliderLineProps> = ({
    items,
    type,
    speedMultiplayer = 1,
    speedMultiplayerHover = 1,
    direction,
    checkLoad,
}) => {
    const [percent, setPercent] = useState(0)
    const [isHover, setIsHover] = useState<boolean>(false)

    const refRoot = useRef<HTMLDivElement | null>(null)
    const refItems = useRef<HTMLDivElement[] | null[]>([])

    const tl = useRef<gsap.core.Timeline>()

    const {contextSafe} = useGSAP(() => {
        if (percent == 100) {
            gsapDelay(() => {
                let translateDistance: number = 0

                const root = refRoot.current

                if (root) {
                    const rootComputedStyles = window.getComputedStyle(root)
                    let rootGap = parseFloat(rootComputedStyles.gap)

                    translateDistance += refItems.current.length * rootGap

                    if (type == "col") {
                        refItems.current.map((e) => {
                            const calc = e ? e.clientHeight : 0

                            translateDistance += calc
                        })

                        tl.current = gsap
                            .timeline({
                                repeat: -1,
                                paused: true,
                                defaults: {
                                    duration: refItems.current.length * 3,
                                    ease: "power0",
                                },
                            })
                            .fromTo(
                                root,
                                {
                                    y: 0,
                                },
                                {
                                    y: -translateDistance / 2,
                                },
                            )
                    } else {
                        refItems.current.map((e) => {
                            const calc = e ? e.clientWidth : 0
                            translateDistance += calc
                        })

                        tl.current = gsap
                            .timeline({
                                repeat: -1,
                                paused: true,
                                defaults: {
                                    duration:
                                        refItems.current.length *
                                        3 *
                                        speedMultiplayer,
                                    ease: "power0",
                                },
                                onStart() {
                                    gsap.to(root, {
                                        opacity: 1,
                                    })
                                },
                            })
                            .fromTo(
                                root,
                                {x: 0},
                                {
                                    x:
                                        direction == "to-left"
                                            ? -translateDistance / 4
                                            : translateDistance / 4,
                                },
                            )
                    }

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: refRoot.current,
                            start: "top bottom",
                            // markers: true,
                            onLeaveBack() {
                                tl.current?.pause()
                            },
                            onLeave() {
                                tl.current?.pause()
                            },
                            onEnter() {
                                tl.current?.play()
                            },
                            onEnterBack() {
                                tl.current?.play()
                            },
                        },
                    })
                }
            })
        }
    }, [percent])

    const handleHover = contextSafe((isHover: boolean) => {
        if (isHover) {
            tl.current?.duration(
                refItems.current.length * 3 * speedMultiplayerHover,
            )
        } else {
            tl.current?.duration(refItems.current.length * 3 * speedMultiplayer)
        }
    })

    useEffect(() => {
        handleHover(isHover)
    }, [isHover])

    useEffect(() => {
        if (!checkLoad) {
            setTimeout(() => {
                setPercent(100)
            }, 1000)
        } else if (refRoot.current && checkLoad) {
            preloader({
                root: refRoot.current,
                onChange(percentage: number, complete: boolean) {
                    setPercent(Number(percentage.toFixed(2)))
                },
            })
        }
    }, [])

    return (
        <div
            className={clsx(style.SliderLine, style[type], style[direction])}
            ref={refRoot}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {[...items, ...items, ...items, ...items].map((e, i) => (
                <div
                    className={clsx(style.SliderLine_item)}
                    ref={(ref) => {
                        if (ref) refItems.current[i] = ref
                    }}
                    key={i}
                >
                    {e}
                </div>
            ))}
        </div>
    )
}
