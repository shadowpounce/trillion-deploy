"use client"

import danielAvatarSource from "assets/daniel_berz.webp"
import lineSource from "assets/line.png"
import luisDanielAvatarSource from "assets/luis-daniel_odon.webp"
import luisFelipeAvatarSource from "assets/luis-felipe_mujica.webp"
import valeriaAvatarSource from "assets/valeria_mujica.webp"
import clsx from "clsx"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import Image, {StaticImageData} from "next/image"
import {useEffect} from "react"

import {Chars} from "@/utils/chars"

import Badge from "shared/components/Badge"

import styles from "./index.module.scss"

gsap.registerPlugin(ScrollTrigger)

const Team = () => {
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
    tl.fromTo(
      `.${styles.description}`,
      {opacity: 0, yPercent: 50},
      {opacity: 1, yPercent: 0},
      0,
    )
      .fromTo(
        `.${styles.title} .char`,
        {opacity: 0, stagger: 0.5},
        {opacity: 1, stagger: 0.5},
        0,
      )
      .fromTo(`.${styles.container} .badge`, {scale: 0}, {scale: 1}, 0)
      .fromTo(
        `.${styles.teammateCard}`,
        {
          opacity: 0,
          stagger: 0.5,
          yPercent: 30,
          ease: "back.out(3)",
          duration: 2,
        },
        {
          opacity: 1,
          stagger: 0.5,
          yPercent: 0,
          ease: "back.out(3)",
          duration: 2,
        },
        0,
      )
  }, [])
  return (
    <section className={styles.container}>
      <div className={styles.topContainer}>
        <h2 className={clsx(styles.title, styles.desktop)}>
          <Chars
            str={`Our <span class=${styles.bold}>Team</span>`}
            isSpace
          ></Chars>
        </h2>
        <div className={styles.aboutUsContainer}>
          <Badge title="About Our Team" />
          <h2 className={clsx(styles.title, styles.tablet)}>
            <Chars
              str={`Our <span class=${styles.bold}>Team</span>`}
              isSpace
            ></Chars>
          </h2>
          <p className={styles.description}>
            At Trillion Digital, our team is fast-paced, creative, and
            solution-driven. We thrive on tackling complex challenges and
            approach each opportunity with precision and integrity. Our culture
            is built around doing things right while staying agile and
            responsive to the evolving digital asset landscape.
          </p>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.teammateCard}>
          <Image
            src={danielAvatarSource as StaticImageData}
            alt="Daniel Berz"
            className={styles.teammateAvatar}
          />
          <div className={styles.teammateInfoWrapper}>
            <Image
              src={lineSource as StaticImageData}
              alt="Line"
              className={styles.line}
            />
            <div className={styles.teammateInfo}>
              <p className={styles.name}>Daniel Berz</p>
              <p className={styles.position}>Co-Founder & CEO</p>
            </div>
          </div>
        </div>

        <div className={styles.teammateCard}>
          <Image
            src={luisDanielAvatarSource as StaticImageData}
            alt="Luis Daniel Odon"
            className={styles.teammateAvatar}
          />
          <div className={styles.teammateInfoWrapper}>
            <Image
              src={lineSource as StaticImageData}
              alt="Line"
              className={styles.line}
            />
            <div className={styles.teammateInfo}>
              <p className={styles.name}>Luis Daniel Odon</p>
              <p className={styles.position}>Co-Founder & President</p>
            </div>
          </div>
        </div>

        <div className={styles.teammateCard}>
          <Image
            src={valeriaAvatarSource as StaticImageData}
            alt="Valeria Mujica"
            className={styles.teammateAvatar}
          />
          <div className={styles.teammateInfoWrapper}>
            <Image
              src={lineSource as StaticImageData}
              alt="Line"
              className={styles.line}
            />
            <div className={styles.teammateInfo}>
              <p className={styles.name}>Valeria Mujica</p>
              <p className={styles.position}>Compliance Associate</p>
            </div>
          </div>
        </div>

        <div className={styles.teammateCard}>
          <Image
            src={luisFelipeAvatarSource as StaticImageData}
            alt="Luis Felipe Mejia"
            className={styles.teammateAvatar}
          />
          <div className={styles.teammateInfoWrapper}>
            <Image
              src={lineSource as StaticImageData}
              alt="Line"
              className={styles.line}
            />
            <div className={styles.teammateInfo}>
              <p className={styles.name}>Luis Felipe Mejia</p>
              <p className={styles.position}>Operations Associate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
