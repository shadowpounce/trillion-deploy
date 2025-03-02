"use client"

import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import Image from "next/image"
// import illustrationSource from 'assets/innovation.png';
import {useEffect, useRef} from "react"

import {Chars} from "@/utils/chars"

import {useGsapSliderContext} from "layouts/gsap-slider"
import {useGsapSlideContext} from "layouts/gsap-slider/ui/gsap-slide"

// import light from "assets/light.png"
import {FlyingParticles} from "shared/components/flying-particles"

import styles from "./index.module.scss"

gsap.registerPlugin(ScrollTrigger)

// import {FC} from "react";

const Preview = ({}) => {
  const video = useRef<HTMLVideoElement>(null)
  // const section = useRef<HTMLDivElement>(null);
  // refTo.current = section.current

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

  useEffect(() => {
    const videoElement = video.current

    const handleTimeUpdate = () => {
      if (videoElement) {
        const loopStart = videoElement.duration - 2
        const loopEnd = videoElement.duration
        if (videoElement.currentTime >= loopEnd - 0.1) {
          videoElement.currentTime = loopStart
          videoElement.play()
        }
      }
    }

    if (videoElement) {
      videoElement.ontimeupdate = handleTimeUpdate
    }

    tl.current = gsap
      .timeline({
        paused: true,
        defaults: {
          duration: 2,
          ease: "sine",
        },
        onStart() {
          if (!videoElement) return
          videoElement.currentTime = 0
          videoElement.play()
        },
      })
      .fromTo(
        `.${styles.title} .char`,
        {opacity: 0, y: 25, stagger: 0.1},
        {opacity: 1, y: 0, stagger: 0.1},
        0,
      )
      .fromTo(`.${styles.light}`, {opacity: 0}, {opacity: 1}, 0)
      .fromTo(
        `.${styles.illustrationContainer}`,
        {opacity: 0, yPercent: 10},
        {opacity: 1, yPercent: -5},
        0,
      )
  }, [])

  return (
    <section className={`${styles.container} preview-section`}>
      <FlyingParticles isActive={isActiveSlide} color="#fff" speed={500} />
      <h2 className={styles.title}>
        <Chars
          str={`Built for Performance,
        <br />
        <span class=${styles.bold}> Driven by Innovation.</span>`}
          isSpace
        />
      </h2>
      <div className={styles.illustrationContainer}>
        <div className={styles.light}>
          <video ref={video} src="/videos/border.mp4" muted playsInline></video>
        </div>
        <Image
          src={"/images/innovation.webp"}
          alt="Illustration"
          fill
          quality={100}
        />
      </div>
    </section>
  )
}

export default Preview
