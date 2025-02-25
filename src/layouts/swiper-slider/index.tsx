"use client"

import {useGSAP} from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import {
    Dispatch,
    FC,
    SetStateAction,
    // useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import {EffectCreative, EffectFade, Mousewheel} from "swiper/modules"
import {Swiper, SwiperSlide} from "swiper/react"
import {SwiperOptions, Swiper as SwiperType} from "swiper/types"

import {gsapDelay} from "utils/gsap/gsapDelay"

import {useScroll} from "layouts/ScrollLayout/useScroll"

import styles from "./index.module.scss"

export interface ISwiperSliderSlide {
    isActive?: boolean
    isActiveReal?: boolean
    swiper?: SwiperType
    direction?: "next" | "prev"
}

interface ISwiperSlider {
    sections: FC<any>[]
    setActiveSlide?: Dispatch<SetStateAction<number>>
    setSwiper?: Dispatch<SetStateAction<SwiperType | undefined>>
}

export const SwiperSlider: FC<ISwiperSlider> = ({
    sections,
    setActiveSlide,
    setSwiper: setSwiperOut,
}) => {
    const scroll = useScroll()

    const refSwiperWrapper = useRef<HTMLDivElement>(null)
    const refSlides = useRef<(HTMLDivElement | null)[]>([])

    const [swiper, setSwiper] = useState<SwiperType>()
    const [swiperConfig, setSwiperConfig] = useState<SwiperOptions>()
    const [activeIndexReal, setActiveIndexReal] = useState<number>(0)
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [direction, setDirection] = useState<"next" | "prev">("next")
    const [once, setOnce] = useState<boolean>(false)

    useEffect(() => {
        let newSwiperConf: SwiperOptions = {
            modules: [Mousewheel, EffectCreative, EffectFade],
            slidesPerView: 1,
            speed: 1500,
            allowTouchMove: true,
            grabCursor: false,
            direction: "vertical",
            mousewheel: true,
            // effect: "fade",
            // effect: "creative",
            // creativeEffect: {
            //     prev: {
            //         opacity: 0,
            //     },
            //     next: {
            //         opacity: 0,
            //     },
            // },
        }

        if (window.innerWidth > 1024) {
        } else if (window.innerWidth > 650) {
        } else {
        }

        setSwiperConfig(newSwiperConf)
    }, [])

    useGSAP(() => {
        gsapDelay(() => {
            const firstSectionHeight =
                refSlides.current[0]?.children[0].getBoundingClientRect().height

            const lastSectionHeight =
                refSlides.current[
                    refSlides.current.length - 1
                ]?.children[0].getBoundingClientRect().height

            if (lastSectionHeight && firstSectionHeight) {
                const marginTop = firstSectionHeight - window.innerHeight
                const marginBottom = lastSectionHeight - window.innerHeight

                gsap.set(refSwiperWrapper.current, {
                    marginTop: marginTop > 0 ? marginTop : 0,
                    marginBottom: marginBottom > 0 ? marginBottom : 0,
                })
            }
        })
    }, [])

    useEffect(() => {
        setSwiperOut && setSwiperOut(swiper)

        if (swiper && !once) {
            gsapDelay(() => {
                swiper.disable()

                ScrollTrigger.create({
                    trigger: refSwiperWrapper.current,
                    start: "top top",
                    end: "bottom bottom",
                    // markers: true,
                    onEnter() {
                        gsap.set(refSwiperWrapper.current, {
                            pointerEvents: "all",
                        })

                        swiper.enable()
                    },
                    onEnterBack() {
                        gsap.set(refSwiperWrapper.current, {
                            pointerEvents: "all",
                        })

                        swiper.enable()
                    },
                    onLeave() {
                        gsap.set(refSwiperWrapper.current, {
                            pointerEvents: "none",
                        })

                        swiper.disable()
                    },
                    onLeaveBack() {
                        gsap.set(refSwiperWrapper.current, {
                            pointerEvents: "none",
                        })

                        swiper.disable()
                    },
                })
            })

            setOnce(true)
        }
    }, [swiper, once])

    return (
        <div className={clsx(styles.SwiperSlider)} ref={refSwiperWrapper}>
            {swiperConfig && (
                <Swiper
                    {...swiperConfig}
                    className={clsx(styles.SwiperSlider_swiper)}
                    onSlideNextTransitionStart={() => setDirection("next")}
                    onSlidePrevTransitionStart={() => setDirection("prev")}
                    onSlideChange={(swiper) => {
                        const {activeIndex} = swiper

                        setActiveSlide && setActiveSlide(activeIndex)
                        setActiveIndexReal(activeIndex)

                        setTimeout(() => {
                            setActiveIndex(activeIndex)
                        }, 1000)

                        if (activeIndex == sections.length - 1) {
                            setTimeout(() => {
                                scroll.start()
                            }, 1500)
                        } else if (activeIndex > 0) {
                            scroll.stop()
                        } else {
                            setTimeout(() => {
                                scroll.start()
                            }, 1500)
                        }
                    }}
                    onSwiper={setSwiper}
                >
                    {sections.map((Section, i) => (
                        <SwiperSlide
                            className={clsx(styles.SwiperSlider_swiper_slide)}
                        >
                            {({isActive}) => (
                                <div
                                    ref={(ref) => {
                                        if (ref) refSlides.current[i] = ref
                                    }}
                                >
                                    <Section
                                        isActive={activeIndex == i}
                                        isActiveReal={activeIndexReal == i}
                                        swiper={swiper}
                                        direction={direction}
                                        key={i}
                                    />
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}
