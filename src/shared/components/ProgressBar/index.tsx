import { useRef, useEffect } from 'react';
import clsx from 'clsx';;
import styles from './index.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ProgressBar = () => {
  const dots = new Array(10).fill(0);
  const span = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isStart = false;
    if(bar.current && !isStart) {
      isStart = true;
      gsap.fromTo(bar.current, 
        {
        duration: 2,
        x: "-25vw",
        ease: "sine.inOut",
        opacity: 0
        },
        {
        duration: 2,
        x: "0",
        ease: "sine.inOut",
        opacity: 1
        },
      )
    }

    const tl = gsap.timeline({
      defaults: {
        stagger: 0.2,
        duration: 0.5,
        ease: "sine.inOut",
      },
      scrollTrigger: {
        trigger: 'body',
        scrub: true,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = Math.round(self.progress * 100);
          if (span.current) {
            span.current.textContent = `${progress}%`;
          }
        },
      },
    });

    tl.fromTo(
      `.${styles.activeProgressItem}`,
      { opacity: 0 },
      { opacity: 1 },
      0
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={bar} className={styles.progressBarWrapper}>
      <div className={styles.progressBarContainer}>
        <div className={styles.bracket}>[</div>
        {dots.map((_, index) => (
          <div key={index} className={clsx(styles.progressItem)}>
            <div className={clsx(styles.activeProgressItem)} />
          </div>
        ))}
        <div className={styles.bracket}>]</div>
      </div>
      <span ref={span} className={styles.progress}>0%</span>
    </div>
  );
};

export default ProgressBar;
