import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {useEffect, useRef} from "react"

import {Chars} from "@/utils/chars"

import {useGsapSliderContext} from "layouts/gsap-slider"
import {useGsapSlideContext} from "layouts/gsap-slider/ui/gsap-slide"

import styles from "./index.module.scss"

gsap.registerPlugin(ScrollTrigger)

const Trusted = () => {
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
      tl.current?.reverse()
    }
  }, [isActiveSlide])

  useEffect(() => {
    tl.current = gsap
      .timeline({
        paused: true,
        defaults: {
          duration: 2,
          ease: "sine",
        },
      })
      .fromTo(
        `.${styles.description} .char`,
        {opacity: 0, y: 25, stagger: 0.1},
        {opacity: 1, y: 0, stagger: 0.1},
        0,
      )
      .fromTo(
        `.${styles.section} .char`,
        {opacity: 0, y: 25, stagger: 0.1},
        {opacity: 1, y: 0, stagger: 0.1},
        0,
      )
  }, [])

  return (
    <section className={styles.container}>
      <div className={styles.bottomContainer}>
        <h3 className={styles.section}>
          <Chars
            str={`Secure. Compliant. <span class=${styles.bold}>Trusted.</span>`}
            isSpace
          ></Chars>
        </h3>
        <p className={styles.description}>
          <Chars
            str="As a U.S. FinCEN-registered Money Service Business and licensed Money
          Transmitter, Trillion Digital upholds the highest standards with a
          robust compliance program—ensuring a safe trading environment for all
          our counterparties."
            isSpace
          ></Chars>
        </p>
      </div>
    </section>
  )
}

export default Trusted
