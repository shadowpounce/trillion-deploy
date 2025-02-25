'use client';

import styles from './index.module.scss';
import Badge from 'shared/components/Badge';
import Delimiter from 'shared/components/Delimiter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { useEffect } from 'react';
import { Chars } from '@/utils/chars';

import {useGsapSliderContext} from "layouts/gsap-slider"
import {useGsapSlideContext} from "layouts/gsap-slider/ui/gsap-slide"

const Hero = () => {
  const {stage, setStage, direction} = useGsapSliderContext()
  const {isActiveSlide} = useGsapSlideContext()

  useEffect(() => {
    if (isActiveSlide && stage == "before-transition") {
        setStage("transition")
    }
  }, [isActiveSlide, stage, direction])

  // console.log(stage)

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: "sine.inOut",
        delay: 1.8
      },
      scrollTrigger: {
        trigger: `.${styles.container}`,
        start: 'top center',
        end: 'bottom top',
        toggleActions: "play none none none",
      }
    })
    tl
    .fromTo(`.${styles.topContainer}`, {opacity: 0}, {opacity: 1}, 0)
    .fromTo(`.${styles.topContainer} > *`, {y: 100, stagger: 0.1}, {y: 0, stagger: 0.1}, 0)
    .fromTo(`.${styles.delimiter}`, {scaleX: 0}, {scaleX: 1}, 0)
    .fromTo(`.${styles.note}`, {opacity: 0}, {opacity: 1}, 0)
    .fromTo(`.${styles.note} .char`, {opacity: 0, y: 25, stagger: 0.1}, {opacity: 1, y: 0, stagger: 0.1}, 0)
    .fromTo(`.${styles.container} .badge`, { scale: 0 }, { scale: 1 }, 0)
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.topContainer}>
        <Badge title='Introducing Trillion Digital' />
        <h1 className={styles.title}>
          Delivering deep liquidity across{' '}
          <span className={styles.bold}>off-exchange</span> markets
        </h1>
        <p className={styles.description}>
          Empowering institutions with bespoke trading
          <br />
          solutions and seamless market access.
        </p>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.noteContainer}>
          <Delimiter className={styles.delimiter} />
          <p className={styles.note}>
            <Chars str="Since 2020, we’ve been delivering a refined execution experience,
            built for counterparties who demand privacy, security, and
            compliance." isSpace></Chars>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
