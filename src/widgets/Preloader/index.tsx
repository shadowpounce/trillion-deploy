"use client"

import clsx from "clsx"
// import name from 'assets/name.svg';
// import star from 'assets/star.svg';
// import Image, {StaticImageData} from "next/image";
import gsap from "gsap"
import {useEffect, useRef, useState} from "react"

import styles from "./index.module.scss"

const Preloader = () => {
  const [visible, setVisible] = useState(true)
  const span = useRef<HTMLSpanElement>(null)
  const loadingPromiseRef = useRef<Promise<void> | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const ensureVideoLoaded = async (video: HTMLVideoElement) => {
    if (loadingPromiseRef.current) return loadingPromiseRef.current

    loadingPromiseRef.current = new Promise((resolve) => {
      // Перезагружаем видео для уверенности
      video.load()

      const handleLoaded = () => {
        // console.log("Video fully loaded");
        setIsLoaded(true)
        resolve()
      }

      if (video.readyState >= 4) {
        handleLoaded()
      } else {
        video.addEventListener("canplaythrough", handleLoaded, {once: true})
      }
    })

    return loadingPromiseRef.current
  }

  useEffect(() => {
    ensureVideoLoaded(document.querySelector("video") as HTMLVideoElement)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    document.querySelector("nextjs-portal")?.remove()
    const video = document.querySelector("video") as HTMLVideoElement

    video.play()

    const tl = gsap.timeline({
      defaults: {
        duration: 0.4,
        ease: "none",
      },
    })

    const dots = [...(document.querySelectorAll(`.${styles.dot}`) as any)]
      .filter((item) => getComputedStyle(item).display === "block")
      .map((item) => item.querySelector(`.${styles.inside}`))

    tl.to(
      dots,
      {
        opacity: 1,
        stagger: 0.02,
        onUpdate: function () {
          const num = Math.floor(this.progress() * 100)
          if (span.current) span.current.innerHTML = `${num}%`
        },
        onComplete: () => {
          gsap.to(`.${styles.preloader}`, {
            opacity: 0,
            duration: 1,
            ease: "none",
            onComplete: () => setVisible(false),
          })
        },
      },
      0,
    )

    // .fromTo(`.${styles.logo}`, { opacity: 0, duration: 1 }, { opacity: 1, duration: 1 }, 0)
    // .fromTo(`.${styles.star}`, { rotateZ: 360 * 4, duration: 2, ease: "expo.out", }, { rotateZ: -360 * 4, duration: 2, ease: "expo.out", }, 0)
    // .from(`.${styles.name}`, { x: 20, duration: 2, }, 0)

    return () => {
      tl.kill()
    }
  }, [isLoaded])

  return visible ? (
    <div className={clsx(styles.preloader)}>
      <div className={styles.top}>
        {/* <div className={styles.leftItem}>
          <div className={styles.logo}>
            <Image
              src={star as StaticImageData}
              alt='star'
              className={styles.star}
            />
            <Image
              src={name as StaticImageData}
              alt='name'
              className={styles.name}
            />
          </div>
        </div> */}
        <div></div>
        <span className={styles.Loading}>Loading...</span>
      </div>
      <div className={styles.bottom}>
        <div className={styles.wrapper}>
          <span className={styles.Loading}>Loading...</span>
          <span ref={span} className={styles.percent}>
            0%
          </span>
        </div>

        <div className={styles.bar}>
          {new Array(16).fill(0).map((_, index) => (
            <span className={`${styles.dot} ${styles.comp}`} key={index}>
              <span className={styles.inside}></span>
            </span>
          ))}

          {new Array(16).fill(0).map((_, index) => (
            <span className={`${styles.dot} ${styles.tablet}`} key={index}>
              <span className={styles.inside}></span>
            </span>
          ))}

          {new Array(20).fill(0).map((_, index) => (
            <span className={`${styles.dot} ${styles.phone}`} key={index}>
              <span className={styles.inside}></span>
            </span>
          ))}
        </div>
      </div>
      <video
        preload="auto"
        src="/videos/prel.mp4"
        loop
        muted
        playsInline
      ></video>
    </div>
  ) : null
}

export {Preloader}
