
import clsx from 'clsx';;

import styles from './index.module.scss';
import Badge from 'shared/components/Badge';
import Delimiter from 'shared/components/Delimiter';
import OnboardingButton from 'shared/components/OnboardingButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { useEffect } from 'react';
import { Chars } from '@/utils/chars';
import {OtcBtn} from "shared/components/OtcBtn";
import { useGsapSliderContext } from 'layouts/gsap-slider';
import { useGsapSlideContext } from 'layouts/gsap-slider/ui/gsap-slide';



const FirstOffer = () => {
  const {stage, setStage, direction} = useGsapSliderContext()
  const {isActiveSlide, slideIndex} = useGsapSlideContext()

  useEffect(() => {
      if (isActiveSlide && stage == "before-transition") {
          setStage("transition")
      }
  }, [isActiveSlide, stage, direction])
  
  useEffect(() => {
    // const tl = gsap.timeline({
    //   defaults: {
    //     duration: 1,
    //     ease: 'sine',
    //   },
    //   scrollTrigger: {
    //     trigger: `.${styles.container}`,
    //     start: 'top center',
    //     end: 'bottom top',
    //     toggleActions: 'play none none none',
    //   },
    // });
    // tl
    //   .fromTo(`.${styles.container} .badge`, { scale: 0 }, { scale: 1 }, 0)
      
    //   .fromTo(`.${styles.note} .char`, {opacity: 0, y: 25, stagger: 0.1}, { opacity: 1, y: 0, stagger: 0.1}, 0)
    //   .fromTo(`.${styles.tabletContainer} .delimiter`, {scaleX: 0, duration: 2}, { scaleX: 1, duration: 2}, 0)
    //   .fromTo(`.${styles.bottomContainer}`, {opacity: 0, yPercent: 100}, {opacity: 1, yPercent: 0}, 0)
    //   .fromTo(`.${styles.noteContainer} .btn`, { scale: 0, ease: "back.out(1.9)", stagger: 0.25, duration: 2.5 }, { scale: 1, ease: "back.out(1.9)", stagger: 0.25, duration: 2.5 }, 0)

      const tlScrub = gsap.timeline({
        defaults: {
          duration: 1,
          ease: 'sine',
        },
        scrollTrigger: {
          trigger: `.${styles.container}`,
          start: 'top top',
          end: 'bottom+=30%',
          toggleActions: 'play none none none',
          
          pin: true,
          scrub: 2,
        },
      });

      tlScrub.fromTo(`.${styles.text} .char`, {opacity: 0, y: 25, stagger: 0.1}, { opacity: 1, y: 0, stagger: 0.1}, 0)
  }, [])
  return (
    <section className={styles.container}>
      <div className={styles.topContainer} />

      <div className={styles.centerContainer}>
        <div className={styles.tabletContainer}>
          <Badge title='What we offer' />
          <h3 className={clsx(styles.title, styles.tablet)}>
            Over-The-Counter
          </h3>
          <p className={styles.text}>
            <Chars str="Specializing in OTC execution via voice, chat, GUI, and API. Our
            solutions ensure seamless trade execution, tailored to meet the
            unique needs of institutional and professional clients." isSpace></Chars>
          </p>

          <OtcBtn link="#"></OtcBtn>
        </div>

        <div className={styles.tabletContainer}>
          <Delimiter />
          <div className={styles.noteContainer}>
            <p className={styles.note}>
              <Chars str="Contact us today to elevate your trading experience." isSpace></Chars>
            </p>
            <OnboardingButton />
          </div>
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <h3 className={clsx(styles.section, styles.desktop)}>
          Over-The-Counter
        </h3>
      </div>
    </section>
  );
};

export default FirstOffer;
