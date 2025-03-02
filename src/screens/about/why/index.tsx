"use client"

import bg from "assets/Benefits.webp"
import cardBackgroundSource from "assets/benefit_card_bg.webp"
import spotImageSource from "assets/spot.webp"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import Image, {StaticImageData} from "next/image"
import {FC, use, useEffect, useRef} from "react"
import {Pagination} from "swiper/modules"
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react"

import {Chars} from "@/utils/chars"

import {useGsapSliderContext} from "layouts/gsap-slider"
import {useGsapSlideContext} from "layouts/gsap-slider/ui/gsap-slide"

import Badge from "shared/components/Badge"
import Tag from "shared/components/Tag"

import styles from "./index.module.scss"

gsap.registerPlugin(ScrollTrigger)

interface ICard {
  title: string
  tags: string[]
  video: string
  text: string
  spotImageSource?: StaticImageData
}

const Card: FC<ICard> = ({title, tags, video, text, spotImageSource}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  // useEffect(() => {
  //   const videoElement = videoRef.current

  //   const handleTimeUpdate = () => {
  //     if (videoElement) {
  //       const loopStart = videoElement.duration - 2
  //       const loopEnd = videoElement.duration
  //       if (videoElement.currentTime >= loopEnd - 0.1) {
  //         console.log("loop")
  //         videoElement.currentTime = loopStart
  //         videoElement.play()
  //       }
  //     }
  //   }

  //   if (videoElement) {
  //     videoElement.ontimeupdate = handleTimeUpdate
  //   }
  // }, [])

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardHeader}>{title}</div>
      <div className={styles.cardContainer}>
        <Image
          src={cardBackgroundSource as StaticImageData}
          alt="Card Backgroud"
          className={styles.cardBackground}
        />
        <div className={styles.tagsContainer}>
          {tags.map((tag) => (
            <Tag key={tag} title={tag} />
          ))}
        </div>
        {spotImageSource && (
          <Image
            src={spotImageSource}
            alt="Secure"
            className={styles.spotImage}
          />
        )}
        <video ref={videoRef} src={video} loop muted playsInline />
        <p className={styles.description}>
          <Chars str={text} isSpace></Chars>
        </p>
      </div>
    </div>
  )
}

const Why = () => {
  const swiperRef = useRef<SwiperRef | null>(null)

  const {stage, setStage, direction} = useGsapSliderContext()
  const {isActiveSlide, slideIndex} = useGsapSlideContext()

  useEffect(() => {
    if (isActiveSlide && stage == "before-transition") {
      setStage("transition")
    }
  }, [isActiveSlide, stage, direction])

  const tl = useRef<gsap.core.Timeline>()

  useEffect(() => {
    const videos = document.querySelectorAll(
      `.${styles.container} video`,
    ) as NodeListOf<HTMLVideoElement>

    if (isActiveSlide) {
      tl.current?.play()

      videos.forEach((video) => {
        if (video.paused) video.play()
      })
    } else {
      tl.current?.pause(0)

      videos.forEach((video) => {
        if (video.paused) video.pause()
      })
    }
  }, [isActiveSlide])

  useEffect(() => {
    tl.current = gsap
      .timeline({
        paused: true,
        defaults: {
          duration: 0.7,
          ease: "power2.out",
        },
      })
      .fromTo(
        `.${styles.cardWrapper}`,
        {opacity: 0, yPercent: 50},
        {opacity: 1, yPercent: 0, stagger: 0.25},
        0,
      )
      .fromTo(`.${styles.bg}`, {opacity: 0}, {opacity: 1}, 0.5)
  }, [])

  return (
    <section className={styles.container}>
      <Image src={bg as StaticImageData} alt="bg" className={styles.bg} fill />
      <div className={styles.topContainer}>
        <Badge title="Why Us?" />
        <h3 className={styles.title}>Powerful Execution Engine</h3>
        <p className={styles.description}>
          <Chars
            str="Experience seamless trading across all execution channels—including
          API, voice, chat, and GUI—with personalized support and expert
          guidance for your most sophisticated trades."
            isSpace
          />
        </p>
      </div>
      <Swiper
        ref={swiperRef}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          744: {
            slidesPerView: 2,
          },
          1340: {
            slidesPerView: 3,
          },
        }}
        pagination={{clickable: true}}
        modules={[Pagination]}
        spaceBetween={24}
        className={styles.cardsContainer}
      >
        <SwiperSlide>
          <Card
            title="Comprehensive Market Connectivity"
            tags={[
              "Exchanges",
              "Brokers",
              "Dark Pools",
              "Market Makers",
              "ECN's",
            ]}
            video="/videos/card_1_cut.mp4"
            text="Secure and direct market access to the top 25+ centralized order books and top 15+ market makers"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Card
            title="Smart Order Execution"
            tags={["VWAP", "Fill or kill", "TWAP", "RFQ", "Market", "Limit"]}
            video="/videos/card_2.mp4"
            text="Unparalleled deep liquidity via our algorithmic
              smart-order-routing engine — perform any order type: Market,
              limit, fill-or-kill, TWAP, VWAP, Iceberg and more"
            spotImageSource={spotImageSource}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Card
            title="Dynamic Settlement and Reporting"
            tags={[
              "24/7/365 Liquidity",
              "Advanced post-trade",
              "Intra-Day Settlements",
            ]}
            video="/videos/card_3_cut.mp4"
            text="Uninterrupted 24/7/365 liquidity and execution. Advanced
              post-trade reporting capabilities"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default Why
