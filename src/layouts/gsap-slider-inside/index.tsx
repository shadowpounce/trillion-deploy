import clsx from "clsx"
import gsap from "gsap"
import {FC, PropsWithChildren, useEffect, useRef, useState} from "react"

import {gsapDelay} from "utils/gsap/gsapDelay"

import {useScroll} from "layouts/ScrollLayout/useScroll"
import {GsapSlider, IGsapSliderMethods} from "layouts/gsap-slider"
import {GsapSlide, IGsapSlideConfig} from "layouts/gsap-slider/ui/gsap-slide"

import styles from "./index.module.scss"

export interface IGsapSliderSlide {
    props?: IGsapSlideConfig
    Section: FC<any>
}

interface IGsapSliderInside {
    sections: IGsapSliderSlide[]
    diffScroll?: number
    id?: string
}

export const GsapSliderInside: FC<PropsWithChildren<IGsapSliderInside>> = ({
    children,
    sections,
    diffScroll,
    id,
}) => {
    const scroll = useScroll()

    const [isSliderActive, setIsSliderActive] = useState<boolean>(false)

    const refRoot = useRef<HTMLDivElement>(null)

    const refSlider = useRef<IGsapSliderMethods>({} as IGsapSliderMethods)

    useEffect(() => {
        gsapDelay(() => {
            ScrollTrigger.create({
                trigger: refRoot.current,
                start: "top top",
                end: "bottom bottom",
                // markers: true,
                // onUpdate(e) {
                //     console.log(e)
                // },
                onEnter() {
                    gsap.set(refRoot.current, {
                        pointerEvents: "all",
                    })
                    setIsSliderActive(true)
                },
                onEnterBack() {
                    gsap.set(refRoot.current, {
                        pointerEvents: "all",
                    })
                    setIsSliderActive(true)
                },
                onLeave() {
                    gsap.set(refRoot.current, {
                        pointerEvents: "none",
                    })

                    setIsSliderActive(false)
                    scroll.start()
                    refSlider.current?.slideTo(sections.length - 1)

                    // console.log("scroll to event")
                },
                onLeaveBack() {
                    gsap.set(refRoot.current, {
                        pointerEvents: "none",
                    })
                    setIsSliderActive(false)
                    scroll.start()
                    refSlider.current?.slideTo(0)

                    // console.log("scroll to event")
                },
            })
        })
    }, [])

    return (
        <div id={id} className={clsx(styles.GsapSliderInsideWrap)}>
            <div className={clsx(styles.GsapSliderInside)} ref={refRoot}>
                <div className={clsx(styles.GsapSliderInside_inner)}>
                    <GsapSlider
                        isActive={isSliderActive}
                        root={refRoot}
                        onSlider={refSlider}
                        diffScroll={diffScroll}
                    >
                        {sections.map((e, i) => (
                            <GsapSlide
                                configDefault={e.props}
                                index={i}
                                key={i}
                            >
                                <e.Section />
                            </GsapSlide>
                        ))}
                        {children}
                    </GsapSlider>
                </div>
            </div>
        </div>
    )
}
