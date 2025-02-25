'use client';


import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { useEffect } from 'react';
import { Chars } from '@/utils/chars';
import styles from './index.module.scss';
import Badge from 'shared/components/Badge';

const Vision = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'sine',
      },
      scrollTrigger: {
        trigger: `.${styles.container}`,
        start: 'top center',
        end: 'bottom top',
        toggleActions: 'play none none none',
      },
    });
    tl
      .fromTo(`.${styles.container} .badge`, { scale: 0 }, { scale: 1 }, 0)
      .fromTo(`.${styles.text} .char`, {opacity: 0, y: 25, stagger: 0.1}, { opacity: 1, y: 0, stagger: 0.1}, 0)
      .fromTo(`.${styles.container} h3 .char`, {opacity: 0, y: 50, stagger: 0.1}, {opacity: 1, y: 0, stagger: 0.1}, 1)
  }, [])
  return (
    <section className={styles.container}>
      <div className={styles.topContainer} />

      <div className={styles.centerContainer}>
        <Badge title='Our Vission' />
        <h3 className={clsx(styles.title, styles.tablet)}>
          <Chars str="<span className={styles.bold}>Redefining</span>
          <br />
          Market Connectivity" isSpace></Chars>
          
        </h3>
        <p className={styles.text}>
          <Chars str="To be the leading provider of trading solutions, recognized for our
          innovation, trustworthiness, and sophisticated approach. We strive to
          transform financial markets by setting new standards in security,
          compliance, and technological excellence." isSpace></Chars>
        </p>
      </div>

      <div className={styles.bottomContainer}>
        <h3 className={clsx(styles.section, styles.desktop)}>
          <Chars str="<span className={styles.bold}>Redefining</span>
          <br />
          Market Connectivity" isSpace></Chars>
         
        </h3>
      </div>
    </section>
  );
};

export default Vision;
