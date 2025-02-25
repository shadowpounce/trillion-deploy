"use client"

import {useGSAP} from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import {
    CSSProperties,
    ComponentPropsWithoutRef,
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"

import {gsapDelay} from "utils/gsap/gsapDelay"

import {
    TDirections,
    TSliderConfig,
    useGsapSliderContext,
} from "layouts/gsap-slider"

import styles from "./index.module.scss"

type TTexts = "light" | "dark"

export const GsapSlideContext = createContext<{
    textStyle?: TTexts
    isActiveSlide: boolean
    slideIndex: number
    slideConfig?: IGsapSlideConfig
    setSlideConfig?: Dispatch<SetStateAction<IGsapSlideConfig>>
}>({} as any)

export const useGsapSlideContext = () => useContext(GsapSlideContext)

export interface IGsapSlideConfig {
    props?: ComponentPropsWithoutRef<"div">
    styles?: CSSProperties
    colorNextTransition?: string
    colorPrevTransition?: string
    textStyle?: TTexts
    headerTheme?: "white" | "blue"
    animate?: {
        top?: TDirections
        bottom?: TDirections
    }
}

export interface IGsapSlide {
    configDefault?: IGsapSlideConfig
    index: number
}

export const GsapSlide: FC<PropsWithChildren<IGsapSlide>> = ({
    configDefault,
    index,
    children,
}) => {
    const {currentIndex, setSliderConfigs, sectionsCount} =
        useGsapSliderContext()

    const [isActiveSlide, setIsActive] = useState<boolean>(false)
    const [config, setConfig] = useState<IGsapSlideConfig>(configDefault || {})

    const refRoot = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.set(refRoot.current, {
            ...config?.styles,
            autoAlpha: 0,
        })
    }, [config])

    useEffect(() => {
        if (currentIndex == index) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [currentIndex, index])

    useEffect(() => {
        gsapDelay(() => {
            setSliderConfigs((prev: TSliderConfig) => {
                const newObject: TSliderConfig = {
                    ...prev,
                    [index]: config || {},
                }

                return newObject
            })
        })
    }, [config])

    useGSAP(() => {
        if (sectionsCount == 0) return

        gsapDelay(() => {
            if (!refRoot.current) return

            let parent = refRoot.current.parentElement
            if (!parent) return
            parent = parent.parentElement
            if (!parent) return
            parent = parent.parentElement
            if (!parent) return

            const lastSection = sectionsCount - 1

            if (index == 0) {
                const sectionHeight =
                    refRoot.current?.children[0].getBoundingClientRect().height

                const marginTop = sectionHeight - window.innerHeight

                gsap.set(parent, {
                    marginTop: marginTop > 0 ? marginTop : 0,
                })
            }

            if (index == lastSection) {
                const sectionHeight =
                    refRoot.current.children[0].getBoundingClientRect().height

                const marginBottom = sectionHeight - window.innerHeight

                gsap.set(parent, {
                    marginBottom: marginBottom > 0 ? marginBottom : 0,
                })
            }
        })
    }, [sectionsCount])

    return (
        <GsapSlideContext.Provider
            value={{
                textStyle: config?.textStyle || "dark",
                isActiveSlide,
                slideIndex: index,
                slideConfig: config,
                setSlideConfig: setConfig,
            }}
        >
            <div
                {...config?.props}
                className={clsx(
                    "gsap-section",
                    styles.GsapSlide,
                    config?.props?.className,
                )}
                ref={refRoot}
                data-sectionid={index}
            >
                {children}
            </div>
        </GsapSlideContext.Provider>
    )
}
