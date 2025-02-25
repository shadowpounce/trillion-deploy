"use client"

// import { useRef, useState } from 'react';
import cardBackgroundSource from "assets/ots trading.png"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import Image, {StaticImageData} from "next/image"
import {useEffect, useRef} from "react"
import {Pagination} from "swiper/modules"
import {Swiper, SwiperSlide} from "swiper/react"

import {Chars} from "@/utils/chars"

import {useGsapSliderContext} from "layouts/gsap-slider"
import {useGsapSlideContext} from "layouts/gsap-slider/ui/gsap-slide"

import {dataItems} from "./data/dataItems"
import styles from "./index.module.scss"

gsap.registerPlugin(ScrollTrigger)

const Benefits = () => {
  // const swiperRef = useRef<SwiperRef | null>(null);
  // const tlScrub = useRef<gsap.core.Timeline>();
  // const [isPhone, setIsPhone] = useState<boolean>()

  // let arr = [] as number[];

  // const makeArr = (start: number, stop: number, slideCount: number) : number[] => {
  //   if(!start || !stop) return [];

  //   const step = (stop - start) / slideCount;

  //   let scrollValues = [] as number[];

  //   for (let i = 0; i < slideCount; i++) {
  //     scrollValues = [...scrollValues, start + step * (i + 1)];
  //   }

  //   return scrollValues;
  // };

  // useEffect(() => {
  //   setIsPhone(window.innerWidth < 744);
  // }, [])

  // useEffect(() => {
  //   if(isPhone === undefined) return;
  //   if(!isPhone) {
  //     tlScrub.current = gsap.timeline({
  //       defaults: {
  //         ease: 'none',
  //       },
  //       scrollTrigger: {
  //         trigger: `.${styles.container}`,
  //         start: 'center+=100 center',
  //         end: `bottom+=${dataItems.length * 25}% bottom`,
  //         pin: true,
  //         onUpdate: ({progress}) => {
  //           const slideIndex = Math.floor(progress * dataItems.length);
  //           swiperRef.current?.swiper.slideTo(slideIndex);
  //         },
  //         onRefresh: () => {
  //           arr = makeArr(
  //             tlScrub.current?.scrollTrigger?.start as number,
  //             tlScrub.current?.scrollTrigger?.end as number,
  //             dataItems.length
  //           );
  //         }
  //       },
  //     })
  //   }
  // }, [isPhone])

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
    gsap.delayedCall(1, () => {
      tl.current = gsap.timeline({
        paused: true,
        defaults: {
          duration: 1,
          ease: "sine",
        },
      })
      const texts = document.querySelectorAll(`.${styles.benefitDescription}`)
      texts.forEach((text) => {
        const chars = text.querySelectorAll(`.char`)
        tl.current?.fromTo(
          chars,
          {opacity: 0, stagger: 0.25, y: 25},
          {opacity: 1, stagger: 0.25, y: 0},
          0,
        )
      })

      tl.current
        .fromTo(`.${styles.title}`, {opacity: 0, y: 50}, {opacity: 1, y: 0}, 0)
        .fromTo(
          `.${styles.benefitContainer}`,
          {opacity: 0, yPercent: 50, stagger: 0.25},
          {opacity: 1, yPercent: 0, stagger: 0.25},
          0,
        )
        .fromTo(
          `.${styles.benefitName}`,
          {opacity: 0, yPercent: 100, stagger: 0.25},
          {opacity: 1, yPercent: 0, stagger: 0.25},
          1,
        )
    })
  }, [])

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        Who we <span className={styles.bold}>Serve</span>
      </h1>
      <Swiper
        // ref={swiperRef}
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
        className={styles.benefitsContainer}
        // onSlideChange={({activeIndex}) => {
        //   if(isPhone) return;
        //   swiperRef.current?.swiper?.slides?.forEach((slide, i) => {
        //     slide.style.scale = i === activeIndex + 1 ? '1.1' : '0.9';
        //   })
        //   if(tlScrub.current) {
        //     gsap.to(window, {
        //       scrollTo: arr[activeIndex],
        //       duration: 0,
        //       ease: "none",
        //     });
        //   }
        // }}
      >
        {dataItems.length &&
          dataItems.map(({benefitName, benefitDescription}, i) => {
            return (
              <SwiperSlide key={i} className={styles.benefitContainer}>
                <Image
                  src={cardBackgroundSource as StaticImageData}
                  alt="Card Background"
                  className={styles.benefitBackground}
                />
                <div className={styles.benefitContent}>
                  <span className={styles.index}>{i + 1}</span>
                  <div>
                    <h4 className={styles.benefitName}>{benefitName}</h4>
                    <p className={styles.benefitDescription}>
                      <Chars str={benefitDescription} isSpace></Chars>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </section>
  )
}

export default Benefits
