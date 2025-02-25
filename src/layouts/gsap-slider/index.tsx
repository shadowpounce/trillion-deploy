"use client"

import clsx from "clsx"
import debounce from "debounce"
import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import {usePathname, useRouter} from "next/navigation"
import {
    Dispatch,
    FC,
    PropsWithChildren,
    RefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import {createContext, useContext} from "react"

import {useMainContext} from "providers/main-provider"

import {useScroll} from "layouts/ScrollLayout/useScroll"

import styles from "./index.module.scss"
import {IGsapSlideConfig} from "./ui/gsap-slide"

gsap.registerPlugin(ScrollToPlugin)

type TStage = "free" | "before-transition" | "transition" | "after-transition"

export const GsapSliderContext = createContext<{
    stage: TStage
    setStage: (value: TStage) => void
    currentIndex: number
    preCurrentIndex: number
    sectionsCount: number
    direction: TDirection
    sliderConfigs: TSliderConfig
    setSliderConfigs: Function
    onClickNav: (selector: string) => void
    slideNext: () => void
    slidePrev: () => void
    slideTo: (index: number) => void
    setIsActiveSlider: Dispatch<SetStateAction<boolean>>
}>({} as any)

export const useGsapSliderContext = () => useContext(GsapSliderContext)

type TDirection = "up" | "down"

export type TSliderConfig = {[key: string]: IGsapSlideConfig}
export type TDirections = "left" | "right" | "center" | TDirection

export interface IGsapSliderMethods {
    slideTo: (index: number) => void
}

interface IGsapSlider {
    isActive?: boolean
    root?: RefObject<HTMLDivElement>
    onSlider?: RefObject<IGsapSliderMethods>
    diffScroll?: number
}

export const GsapSlider: FC<PropsWithChildren<IGsapSlider>> = ({
    children,
    isActive,
    root,
    onSlider,
    diffScroll = 0,
}) => {
    const scroll = useScroll()

    const {modalMenu} = useMainContext()

    const [isInit, setIsInit] = useState<boolean>(false)
    const [isScroll, setIsScroll] = useState<boolean>(false)
    const [isActiveSlider, setIsActiveSlider] = useState<boolean>(true)
    const [stage, setStage] = useState<TStage>("free")
    const [sections, setSections] = useState<NodeListOf<HTMLDivElement>>()
    const [sectionsCount, setSectionsCount] = useState<number>(0)
    const [currentIndex, setCurrentIndex] = useState<number>(-1)
    const [preCurrentIndex, setPreCurrentIndex] = useState<number>(-1)
    const [direction, setDirection] = useState<TDirection>("down")
    const [sliderConfigs, setSliderConfigs] = useState<TSliderConfig>({})

    const refRoot = useRef<HTMLDivElement>(null)

    useEffect(() => {
        sections && setSectionsCount(sections?.length)
    }, [sections])

    // useEffect(() => {
    //     console.log(currentIndex)
    // }, [currentIndex])

    useEffect(() => {
        if (!sections) return

        // if (stage == "free" && !isScroll) {
        if (stage == "free") {
            if (
                preCurrentIndex == 0 ||
                preCurrentIndex == -1 ||
                preCurrentIndex == sections.length - 1
            ) {
                scroll.start()
            } else {
                scroll.stop()
            }
        } else {
            scroll.stop()
        }
    }, [preCurrentIndex, sections, stage, isScroll])

    const animate = useCallback(
        (targetIndex: number, direction: TDirection, skip?: boolean) => {
            if (!skip) {
                if (
                    !sections ||
                    stage != "free" ||
                    targetIndex === currentIndex
                ) {
                    return
                }
            }

            // console.log("animate")

            setDirection(direction)
            setStage("before-transition")
            setIsScroll(true)
            setPreCurrentIndex(targetIndex)
        },
        [stage, currentIndex, sections],
    )

    const slideNext = useCallback(() => {
        animate(currentIndex + 1, "down", true)
    }, [currentIndex, stage])

    const slidePrev = useCallback(() => {
        animate(currentIndex - 1, "up", true)
    }, [currentIndex, stage])

    const slideTo = useCallback(
        (index: number) => {
            // console.log("scroll to")

            if (preCurrentIndex != index) {
                animate(index, currentIndex > index ? "up" : "down", true)
            }
        },
        [preCurrentIndex, currentIndex, stage],
    )

    const onClickNav = useCallback(
        (selector: string) => {
            const section = document.querySelector(selector)

            if (section) {
                const sectionid = Number(section.getAttribute("data-sectionid"))

                animate(sectionid, currentIndex < sectionid ? "down" : "up")
            }
        },
        [currentIndex, animate],
    )

    const animateSection = useCallback(
        (targetIndex: number) => {
            // console.log(targetIndex)

            if (!sections || targetIndex === currentIndex) return

            const currentDirection: TDirections | undefined =
                direction == "down"
                    ? sliderConfigs[currentIndex]?.animate?.bottom
                    : sliderConfigs[currentIndex]?.animate?.top

            const targetDirection: TDirections | undefined =
                direction == "down"
                    ? sliderConfigs[targetIndex]?.animate?.top
                    : sliderConfigs[targetIndex]?.animate?.bottom

            let animationProps = {}
            let currenAnimationProps = {}
            let targetAnimationProps = {}

            switch (currentDirection) {
                case "left":
                    currenAnimationProps = {x: "-100%"}
                    break
                case "right":
                    currenAnimationProps = {x: "100%"}
                    break
                case "up":
                    currenAnimationProps = {y: "-100%"}
                    break
                case "down":
                    currenAnimationProps = {y: "100%"}
                    break
                case "center":
                    currenAnimationProps = {y: "0%"}
                    break
            }
            switch (targetDirection) {
                case "left":
                    targetAnimationProps = {x: "-100%"}
                    break
                case "right":
                    targetAnimationProps = {x: "100%"}
                    break
                case "up":
                    targetAnimationProps = {y: "-100%"}
                    break
                case "down":
                    targetAnimationProps = {y: "100%"}
                    break
                case "center":
                    targetAnimationProps = {y: "0%"}
                    break
            }

            const currentSection = sections[currentIndex]
            const targetSection = sections[targetIndex]

            const onCompleteAnimation = (targetIndex: number) => {
                // console.log(targetIndex)

                setCurrentIndex(targetIndex)

                setTimeout(() => {
                    setStage("free")
                }, 1000)

                // if (isActive && root && root.current) {
                //     gsap.set(window, {
                //         scrollTo: {
                //             y: root.current,
                //             offsetY:
                //                 -root.current.getBoundingClientRect().height /
                //                 3,
                //         },
                //     })
                // }
            }

            if (currentDirection) {
                // gsap.to(targetSection, {
                //     autoAlpha: 1,
                // })

                gsap.timeline({
                    defaults: {
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    onComplete: () => {
                        onCompleteAnimation(targetIndex)

                        sections.forEach((e, i) => {
                            if (i != targetIndex) {
                                gsap.set(e, {
                                    autoAlpha: 0,
                                    x: 0,
                                    y: 0,
                                })
                            }
                        })

                        // gsap.set(currentSection, {
                        //     autoAlpha: 0,
                        // })
                    },
                })
                    .to(currentSection, {
                        ...currenAnimationProps,
                    })
                    .fromTo(
                        targetSection,
                        {
                            ...targetAnimationProps,
                        },
                        {
                            autoAlpha: 1,
                            x: 0,
                            y: 0,
                        },
                        "<",
                    )
            } else {
                // if (currentIndex >= targetIndex) {
                //     gsap.to(currentSection, {
                //         ...animationProps,
                //         autoAlpha: 0,
                //         duration: 1,
                //         ease: "power2.inOut",
                //     })
                // }

                sections.forEach((e, i) => {
                    if (i != targetIndex) {
                        gsap.to(e, {
                            autoAlpha: 0,
                            x: 0,
                            y: 0,
                        })
                    }
                })

                // gsap.to(targetSection, {x: 0, y: 0, autoAlpha: 0})
                // gsap.set(targetSection, {x: 0, y: 0})

                gsap.to(targetSection, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                    // duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        onCompleteAnimation(targetIndex)
                    },
                })
            }
        },
        [stage, currentIndex, sections, direction, isActive],
    )

    const scrollDebounce = useCallback(() => {
        setIsScroll(false)
    }, [setIsScroll])

    const debouncedScrollDebounce = debounce(scrollDebounce, 200)

    // * wheel event
    useEffect(() => {
        const handleWheelEvent = (event: WheelEvent) => {
            // if (isActive) {
            //     console.log(
            //         `stage: ${stage}\nisScroll: ${isScroll}\nisActive: ${isActive}\nisActiveSlider: ${isActiveSlider}`,
            //     )
            // }

            if (
                !sections ||
                stage != "free" ||
                // isScroll ||
                !isActive ||
                !isActiveSlider
            )
                return

            // console.log(event.deltaY)

            if (Math.abs(event.deltaY) < diffScroll) {
                return
            }

            const direction: TDirection = event.deltaY > 0 ? "down" : "up"
            const targetIndex = currentIndex + (direction === "down" ? 1 : -1)

            // console.log(event.de ltaY)

            if (
                Boolean(
                    direction === "down" && targetIndex < sections.length,
                ) ||
                Boolean(direction === "up" && targetIndex >= 0)
            ) {
                animate(targetIndex, direction)
            }
        }

        window.addEventListener("wheel", handleWheelEvent)

        return () => window.removeEventListener("wheel", handleWheelEvent)
    }, [stage, currentIndex, sections, isScroll, isActive, isActiveSlider])

    // * wheel debounce
    useEffect(() => {
        window.addEventListener("wheel", debouncedScrollDebounce)

        return () =>
            window.removeEventListener("wheel", debouncedScrollDebounce)
    }, [])

    // * touch event
    useEffect(() => {
        let touchStartY = 0
        let touchEndY = 0

        const handleTouchStart = (event: TouchEvent) => {
            // console.log("start")
            touchStartY = event.touches[0].clientY
        }

        const handleTouchEnd = (event: TouchEvent) => {
            // console.log("end")

            touchEndY = event.changedTouches[0].clientY

            if (
                !sections ||
                stage !== "free" ||
                // isScroll ||
                Math.abs(touchStartY - touchEndY) < 50 ||
                touchEndY == 0 ||
                modalMenu.isActive
            ) {
                return
            }

            // console.log(touchStartY, touchEndY)

            const direction: TDirection =
                touchStartY > touchEndY ? "down" : "up"
            const targetIndex = currentIndex + (direction === "down" ? 1 : -1)

            if (
                (direction === "down" && targetIndex < sections.length) ||
                (direction === "up" && targetIndex >= 0)
            ) {
                animate(targetIndex, direction)
            }
        }

        window.addEventListener("touchstart", handleTouchStart)
        window.addEventListener("touchend", handleTouchEnd)

        return () => {
            window.removeEventListener("touchstart", handleTouchStart)
            window.removeEventListener("touchend", handleTouchEnd)
        }
    }, [stage, currentIndex, sections, isScroll, modalMenu.isActive])

    // * touch debounce
    useEffect(() => {
        const debouncedTouchEnd = () => {
            debouncedScrollDebounce()
        }

        window.addEventListener("touchend", debouncedTouchEnd)

        return () => window.removeEventListener("touchend", debouncedTouchEnd)
    }, [])

    // * start slider
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (sections && sections.length > 0 && !isInit) {
            setIsInit(true)

            const hash = window.location.hash
            router.replace(pathname)

            setTimeout(() => {
                animateSection(0)

                setTimeout(() => {
                    if (hash != "") onClickNav(hash)
                }, 1300)
            }, 200)
        }
    }, [sections, isInit, onClickNav])

    useEffect(() => {
        if (stage == "transition") {
            animateSection(preCurrentIndex)
        }
    }, [stage, preCurrentIndex])

    // * init sections
    useEffect(() => {
        if (!refRoot.current) return

        setSections(refRoot.current.querySelectorAll(".gsap-section"))
    }, [])

    useEffect(() => {
        if (onSlider?.current) {
            onSlider.current.slideTo = slideTo
        }
    }, [slideTo, onSlider])

    return (
        <GsapSliderContext.Provider
            value={{
                stage,
                setStage,
                currentIndex,
                direction,
                sliderConfigs,
                sectionsCount,
                setSliderConfigs,
                onClickNav,
                preCurrentIndex,
                slidePrev,
                slideNext,
                slideTo,
                setIsActiveSlider,
            }}
        >
            <div className={clsx(styles.GsapSlider)} ref={refRoot}>
                {children}
            </div>
        </GsapSliderContext.Provider>
    )
}
