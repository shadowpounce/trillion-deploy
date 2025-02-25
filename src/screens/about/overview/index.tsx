"use client"

import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {useEffect, useState} from "react"

import {Chars} from "@/utils/chars"

import {useMainContext} from "providers/main-provider"

import {useGsapSliderContext} from "layouts/gsap-slider"
import {useGsapSlideContext} from "layouts/gsap-slider/ui/gsap-slide"

import Badge from "shared/components/Badge"

import styles from "./index.module.scss"

gsap.registerPlugin(ScrollTrigger)

const Overview = () => {
    const {heroStage, setHeroStage} = useMainContext()
    const [tl, setTl] = useState<gsap.core.Timeline>()

    const {stage, setStage, direction} = useGsapSliderContext()
    const {isActiveSlide, slideIndex} = useGsapSlideContext()

    useEffect(() => {
        if (isActiveSlide && stage == "before-transition") {
            setStage("transition")
        }
    }, [isActiveSlide, stage, direction])

    useEffect(() => {
        const num = 0.02

        const tl = gsap.timeline({
            paused: true,
            defaults: {
                duration: 1,
                ease: "power2.inOut",
            },
        })

        tl
            // .fromTo(`.${styles.text} .char`, { opacity: 0.4, duration: num, stagger: num, }, { opacity: 1, duration: num, stagger: num, }, 0)
            .fromTo(
                `.${styles.container} .badge`,
                {scale: 0},
                {scale: 1, duration: 0.5},
                0,
            )
            .fromTo(`.${styles.text}`, {opacity: 0}, {opacity: 1}, 0)

        setTl(tl)
    }, [])

    useEffect(() => {
        if (isActiveSlide && tl) {
            setHeroStage(slideIndex)
            tl.play()
        }
    }, [isActiveSlide, slideIndex, tl])

    return (
        <section className={styles.container}>
            <div className={styles.topContainer}>
                <Badge title="Company Overview" />
                <p className={styles.text}>
                    <Chars
                        str={`Trillion Digital is a trading firm specializing in providing tailored
            liquidity solutions and seamless market access for institutional
            clients, combining a robust infrastructure with a compliance-first
            approach to deliver secure and efficient execution services.`}
                    ></Chars>
                </p>
            </div>
            <div className={styles.bottomContainer} />
        </section>
    )
}

export default Overview
