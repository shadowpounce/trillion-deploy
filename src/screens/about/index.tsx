"use client"

import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {useEffect, useRef, useState} from "react"

import playUntil from "utils/playUntil"
import playUntilReverse from "utils/playUntilReverse"

import {useScroll} from "layouts/ScrollLayout/useScroll"
import {GsapSliderInside, IGsapSliderSlide} from "layouts/gsap-slider-inside"

import Benefits from "@/screens/about/benefits"
import FirstOffer from "@/screens/about/firstOffer"
import Hero from "@/screens/about/hero"
import Overview from "@/screens/about/overview"
import Partners from "@/screens/about/partners"
import Preview from "@/screens/about/preview"
import SecondOffer from "@/screens/about/secondOffer"
import Trusted from "@/screens/about/trusted"
import {BgVideo} from "@/screens/about/videoItem"
import Why from "@/screens/about/why"

import ProgressBar from "shared/components/ProgressBar"
import ScrollTo from "shared/components/ScrollTo"
import {StickyWrapper} from "shared/components/sticky-wrapper"

import {Fake} from "./fake"
import styles from "./index.module.scss"
import {BgVideo_1} from "./videoItem_1"
import {BgVideo_2} from "./videoItem_2"
import {BgVideo_3} from "./videoItem_3"

gsap.registerPlugin(ScrollTrigger)

const Wrapper1 = () => {
  const scroll = useScroll()
  const refCont1 = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPhone, setIsPhone] = useState<undefined | boolean>(undefined)
  const src = isPhone ? "videoPhone.mp4" : "/videos/videoComp.mp4"

  useEffect(() => {
    setIsPhone(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    if (isPhone === undefined) return
    const video = document.createElement("video")
    video.src = src
    video.load()
    video.addEventListener(
      "canplaythrough",
      () => {
        setIsLoaded(true)
        console.log("loaded")
      },
      {once: true},
    )
  }, [isPhone])

  useEffect(() => {
    if (isPhone === undefined) return
    if (!isLoaded) return
    const video = refCont1.current?.querySelector(
      `.${styles.video}`,
    ) as HTMLVideoElement
    if (!video) return

    video.onended = () => {
      gsap.to(".preview-section", {opacity: 1, duration: 1, ease: "none"})
      scroll.start()
    }

    const hide = () => {
      gsap.to(refCont1.current, {
        opacity: 0,
      })
    }

    hide()

    const unhide = () => {
      gsap.to(refCont1.current, {
        opacity: 1,
        duration: 1,
      })
    }

    let flag0 = false
    let flag1 = false
    let flag2 = false

    let progressPercent = 0
    let isProgressGoUp = false

    gsap.timeline({
      scrollTrigger: {
        trigger: refCont1.current,
        start: "top+=1% top",
        end: "bottom+=200% bottom",
        scrub: true,

        onUpdate: ({progress}) => {
          const percent = Math.round(progress * 100)
          isProgressGoUp = progress > progressPercent
          progressPercent = progress

          if (isProgressGoUp) {
            if (percent > 12 && !flag1) {
              flag1 = true
              playUntil(video, 5)
            }
            if (percent > 25 && !flag2) {
              flag2 = true
              scroll.stop()
              playUntil(video, video.duration)
            }
          } else {
            if (percent < 12 && flag1) {
              flag1 = false
              playUntilReverse(video, 2.5)()
            }
            if (percent < 25 && flag2) {
              flag2 = false
              playUntilReverse(video, 5)()
              gsap.to(".preview-section", {
                opacity: 0,
                duration: 1,
                ease: "none",
              })
              scroll.start()
            }
          }
        },
        onEnter: () => {
          if (flag0) return
          unhide()
          flag0 = true
          playUntil(video, 2.5)
          // console.log("onEnter")
        },
        onLeaveBack: () => {
          if (!flag0) return
          hide()
          flag0 = false
          video.currentTime = 0
          video.pause()
          // console.log("onLeaveBack")
        },
        onLeave: () => {
          scroll.start()
        },
      },
    })
  }, [isLoaded, isPhone])

  return (
    <div ref={refCont1} className={styles.topContainer}>
      <FirstOffer />
      <SecondOffer />
      <Preview />
      <video
        preload="auto"
        muted
        playsInline
        className={styles.video}
        src={src}
      ></video>
    </div>
  )
}

const Wrapper2 = () => {
  const refCont2 = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // const [isLoaded, setIsLoaded] = useState(false);
  const loadingPromiseRef = useRef<Promise<void> | null>(null)

  // Функция для надежной загрузки видео
  const ensureVideoLoaded = async (video: HTMLVideoElement) => {
    if (loadingPromiseRef.current) return loadingPromiseRef.current

    loadingPromiseRef.current = new Promise((resolve) => {
      // Перезагружаем видео для уверенности
      video.load()

      const handleLoaded = () => {
        // console.log("Video fully loaded");
        // setIsLoaded(true);
        resolve()
      }

      if (video.readyState >= 4) {
        handleLoaded()
      } else {
        video.addEventListener("canplaythrough", handleLoaded, {
          once: true,
        })
      }
    })

    return loadingPromiseRef.current
  }

  // Функция для надежного воспроизведения
  const ensureVideoPlaying = async (video: HTMLVideoElement) => {
    try {
      await ensureVideoLoaded(video)

      // Сначала проверяем текущее состояние
      if (!video.paused) return

      // Пытаемся воспроизвести
      const playPromise = video.play()
      if (playPromise) {
        await playPromise
        console.log("Video playing successfully")
      }
    } catch (error) {
      console.error("Error playing video:", error)
    }
  }

  useEffect(() => {
    if (!refCont2.current || !videoRef.current) return

    const container = refCont2.current
    const video = videoRef.current

    ensureVideoLoaded(video)

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top+=10% center", // Немного сдвигаем точку триггера
        end: "bottom bottom",
        onEnter: () => {
          gsap.to(container, {
            opacity: 1,
            duration: 1,
            onComplete: () => {
              ensureVideoPlaying(video)
            },
          })
        },
        onLeaveBack: () => {
          gsap.to(container, {
            opacity: 0,
            duration: 0.5,
          })
          video.pause()
        },
        onEnterBack: () => {
          ensureVideoPlaying(video)
        },
        // onLeave: () => {
        //   video.pause();
        // },
        // Добавляем небольшой scrub для более плавной работы
        scrub: 0.5,
      },
    })

    const handleVideoEnd = () => {
      if (video.duration) {
        video.currentTime = Math.max(0, video.duration - 2)
        ensureVideoPlaying(video)
      }
    }

    video.addEventListener("ended", handleVideoEnd)

    // Добавляем обработчик ошибок воспроизведения
    const handleError = (e: Event) => {
      console.error("Video error:", (e as ErrorEvent).message)
      // Пытаемся перезагрузить видео
      video.load()
      ensureVideoLoaded(video)
    }

    video.addEventListener("error", handleError)

    // Установка начального состояния
    gsap.set(container, {opacity: 0})

    return () => {
      video.removeEventListener("ended", handleVideoEnd)
      video.removeEventListener("error", handleError)
      timeline.kill()
      loadingPromiseRef.current = null
    }
  }, [])

  return (
    <div className={styles.background}>
      <div ref={refCont2} className={styles.topContainer}>
        <Trusted />
        <Benefits />
        <video
          ref={videoRef}
          preload="auto"
          muted
          playsInline
          className={styles.video}
          src="/videos/comp.mp4"
          // Добавляем буферизацию
          // buffer="auto"
          // Добавляем приоритет загрузки
          // fetchPriority="high"
        />
      </div>
    </div>
  )
}

const AboutPage = () => {
  const Slider_0: IGsapSliderSlide[] = [
    {
      Section: Hero,
      props: {
        animate: {
          top: "down",
          bottom: "up",
        },
      },
    },
    {
      Section: Overview,
      props: {
        animate: {
          top: "down",
          bottom: "up",
        },
      },
    },

    {
      Section: FirstOffer,
      props: {
        animate: {
          top: "down",
          bottom: "up",
        },
      },
    },
    {
      Section: SecondOffer,
      props: {
        animate: {
          top: "down",
          // bottom: "up",
        },
      },
    },
    {
      Section: Fake,
      // props: {
      //   animate: {
      //     top: "down",
      //     bottom: "up",
      //   },
      // },
    },
    {
      Section: Preview,
      props: {
        animate: {
          // top: "down",
          bottom: "up",
        },
      },
    },
    {
      Section: Why,
      props: {
        animate: {
          top: "down",
          bottom: "up",
        },
      },
    },
    {
      Section: Trusted,
      props: {
        animate: {
          top: "down",
          bottom: "up",
        },
      },
    },
    {
      Section: Benefits,
      props: {
        animate: {
          top: "down",
          bottom: "up",
        },
      },
    },
    {
      Section: Partners,
      props: {
        animate: {
          top: "down",
          bottom: "up",
        },
      },
    },
  ]

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <GsapSliderInside sections={Slider_0} diffScroll={30}>
          <StickyWrapper>
            <BgVideo />
          </StickyWrapper>
          <StickyWrapper>
            <BgVideo_1 />
          </StickyWrapper>
          <StickyWrapper>
            <BgVideo_2 />
          </StickyWrapper>
          <StickyWrapper>
            <BgVideo_3 />
          </StickyWrapper>
        </GsapSliderInside>
        {/* <Wrapper1></Wrapper1>
        <div style={{height: "20vh", marginTop: "-20px"}} className={styles.background}></div>
        <Why />
        <Wrapper2></Wrapper2>
        <Partners /> */}
      </div>
      <div className={styles.progressContainer}>
        <ProgressBar />
      </div>
      <div className={styles.scrollToContainer}>
        <ScrollTo
          direction="down"
          // onClick={() => {
          //   gsap.to(window, {
          //     duration: 2,
          //     scrollTo: document.body.offsetHeight,
          //   })
          // }}
        />
      </div>
    </main>
  )
}

export default AboutPage
