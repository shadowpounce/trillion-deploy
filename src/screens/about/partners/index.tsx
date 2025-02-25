"use client"

import Ticker from "framer-motion-ticker"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import Image, {StaticImageData} from "next/image"
import {FC} from "react"
import {useEffect} from "react"

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
}

const Row: FC<TickerProps> = ({direction, duration = 100, logos}) => {
  return (
    <div className={styles.wrapper}>
      <Ticker direction={direction === "right" ? 1 : -1} duration={duration}>
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

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "sine",
      },
      scrollTrigger: {
        trigger: `.${styles.container}`,
        start: "top center",
        end: "bottom top",
        toggleActions: "play none none none",
      },
    })
    tl.from(`.${styles.description}`, {opacity: 0, yPercent: 100}, 0)
      .from(`.${styles.title}`, {opacity: 0, yPercent: 100}, 0)
      .from(
        `.${styles.partnersContainer} .FMT__container`,
        {opacity: 0, stagger: 0.25},
        0,
      )
  }, [])
  return (
    <section className={styles.container}>
      <Image
        src={img as StaticImageData}
        alt="img"
        className={styles.img}
      ></Image>
      <h2 className={styles.title}>
        Our <span className={styles.bold}>Partners</span>
      </h2>
      <p className={styles.description}>
        Partnering with Industry Pioneers to Redefine Liquidity, Compliance, and
        Security in Digital Finance.
      </p>
      <div className={styles.partnersContainer}>
        <Row logos={dataLogos1} direction="right"></Row>
        <Row logos={dataLogos2} direction="left"></Row>
        <Row logos={dataLogos1} direction="right"></Row>
      </div>
    </section>
  )
}

export default Partners
