"use client"

import {useGSAP} from "@gsap/react"
import Ticker from "framer-motion-ticker"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import Image, {StaticImageData} from "next/image"
import {FC, useRef} from "react"
import {useEffect} from "react"

import {gsapDelay} from "utils/gsap/gsapDelay"

import {useGsapSliderContext} from "layouts/gsap-slider"
import {useGsapSlideContext} from "layouts/gsap-slider/ui/gsap-slide"

import {dataLogos1, dataLogos2} from "./data/logos"
import styles from "./index.module.scss"
import img from "./light.png"

gsap.registerPlugin(ScrollTrigger)

type TickerProps = {
  direction: "right" | "left"
  duration?: number
  logos: any
  isPlaying?: boolean
}

const Row: FC<TickerProps> = ({
  isPlaying = true,
  direction,
  duration = 100,
  logos,
}) => {
  return (
    <div className={styles.wrapper}>
      <Ticker
        isPlaying={isPlaying}
        direction={direction === "right" ? 1 : -1}
        duration={duration}
      >
        {logos.length &&
          logos.map(({logo}: {logo: StaticImageData}, i: number) => {
            return (
              <Image
                key={i}
                src={logo}
                alt="logo"
                className={styles.partnerLogo}
              />
            )
          })}
      </Ticker>
    </div>
  )
}

const Partners = () => {
  const {stage, setStage, direction} = useGsapSliderContext()
  const {isActiveSlide, slideIndex} = useGsapSlideContext()

  useEffect(() => {
    if (isActiveSlide && stage == "before-transition") {
      setStage("transition")
    }
  }, [isActiveSlide, stage, direction])

  const tl = useRef<gsap.core.Timeline>()

  useEffect(() => {
    if (isActiveSlide) {
      tl.current?.play()
    } else {
      tl.current?.pause(0)
    }
  }, [isActiveSlide])

  useGSAP(() => {
    gsapDelay(() => {
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: 1,
            ease: "sine",
          },
        })
        .fromTo(
          `.${styles.description}`,
          {opacity: 0, yPercent: 100},
          {opacity: 1, yPercent: 0},
          0,
        )
        .fromTo(
          `.${styles.title}`,
          {opacity: 0, yPercent: 100},
          {opacity: 1, yPercent: 0},
          0,
        )
        .fromTo(
          `.${styles.partnersContainer} .FMT__container`,
          {opacity: 0},
          {opacity: 1, stagger: 0.25},
          0,
        )
    })
  }, [])

  return (
    <section className={styles.container}>
      <Image src={img as StaticImageData} alt="img" className={styles.img} />
      <h2 className={styles.title}>
        Our <span className={styles.bold}>Partners</span>
      </h2>
      <p className={styles.description}>
        Partnering with Industry Pioneers to Redefine Liquidity, Compliance, and
        Security in Digital Finance.
      </p>
      <div className={styles.partnersContainer}>
        <Row isPlaying={isActiveSlide} logos={dataLogos1} direction="right" />
        <Row isPlaying={isActiveSlide} logos={dataLogos2} direction="left" />
        <Row isPlaying={isActiveSlide} logos={dataLogos1} direction="right" />
      </div>
    </section>
  )
}

export default Partners
