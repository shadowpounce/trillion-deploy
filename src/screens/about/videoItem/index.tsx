"use client"

import clsx from "clsx"
import gsap from "gsap"
// import Image from "next/image"
import {FC, useEffect, useRef, useState} from "react"

import {gsapDelay} from "utils/gsap/gsapDelay"

// import {useMainContext} from "providers/main-provider"
import {useGsapSliderContext} from "layouts/gsap-slider"

// import {MediaQuery} from "shared/components/media-query"
import {useObserver} from "@/hooks/useObserver"

import styles from "./index.module.scss"

interface IBgVideo {}

export const BgVideo: FC<IBgVideo> = ({}) => {
  // const {heroStage: stage} = useMainContext()
  const {preCurrentIndex: stage, slideTo} = useGsapSliderContext()

  const [currentTime, setCurrentTime] = useState<number>(0)
  const [isOnce, setIsOnce] = useState<boolean>(false)
  // const [isEndVideo, setIsEndVideo] = useState<boolean>(false)

  const refRoot = useRef<HTMLDivElement>(null)
  const refVideo = useRef<HTMLVideoElement>(null)

  const [isPhone, setIsPhone] = useState<boolean>(false)

  useEffect(() => {
    if (window.innerWidth < 565) {
      setIsPhone(true)
    }
  }, [])

  const handleTimeUpdate = () => {
    if (refVideo.current) {
      setCurrentTime(refVideo.current.currentTime)
    }
  }

  useEffect(() => {
    if (window.innerWidth < 1025) return
    if (!refVideo.current) return

    console.log(stage, currentTime)

    if ((stage == 0 || stage == -1) && currentTime > 5.6) {
      refVideo.current.pause()
      console.log("pause 1")
    } else if (stage == 1 && currentTime > 10) {
      refVideo.current.pause()
      console.log("pause 2")
    } else if (stage >= 2) {
      console.log("pause 3")
      gsap.to(refRoot.current, {
        autoAlpha: 0,
        duration: 0.5,
        onComplete() {
          if (refVideo.current) {
            refVideo.current.pause()
            refVideo.current.currentTime = 0
          }
        },
      })
    } else {
      gsap.to(refRoot.current, {
        autoAlpha: 1,
        duration: 0.5,
      })
    }
  }, [currentTime, stage])

  useEffect(() => {
    gsapDelay(() => {
      refVideo.current?.play()
      setIsOnce(true)
    }, 2.5)
  }, [])

  useEffect(() => {
    isOnce && refVideo.current?.play()

    if (stage == 0) {
      gsap.to(refRoot.current, {
        autoAlpha: 1,
        duration: 0.5,
      })
    }
  }, [stage])

  // useObserver(
  //     refRoot,
  //     () => {
  //         if (window.innerWidth > 1024) return
  //         refVideo.current?.play()
  //     },
  //     () => {
  //         if (window.innerWidth > 1024) return
  //         refVideo.current?.pause()
  //     },
  // )

  return (
    <div className={clsx(styles.BgVideo)} ref={refRoot}>
      <video
        ref={refVideo}
        className="video-background"
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
      >
        <source
          src={isPhone ? "Crystal Bg 2_1 iPhone.mp4" : "Crystal Bg 2_1.mp4"}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
