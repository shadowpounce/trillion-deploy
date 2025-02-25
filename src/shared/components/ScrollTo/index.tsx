
import Image, { StaticImageData } from 'next/image';
import gsap from 'gsap';
import styles from './index.module.scss';
import arrowDownSource from 'assets/arrow_down.png';
import arrowUpSource from 'assets/arrow_up.png';
import { useEffect } from 'react';

interface IScrollTo {
  direction: 'up' | 'down';
  onClick?: () => void;
}

const ScrollTo = ({ direction }: IScrollTo) => {
  useEffect(() => {
    gsap.to(`.${styles.container}`, {
      opacity: 1,
      duration: 2,
      ease: "sine.inOut",
    })
  }, [])

  let isScroll = false;

  const onClick = () => {
    if(isScroll) return;
    isScroll = true;
    const scrollAmount = window.innerHeight;
    const currentScroll = window.scrollY;
    const targetScroll = direction === 'down' ? currentScroll + scrollAmount : currentScroll - scrollAmount;
    gsap.to(window, { duration: 1, scrollTo: targetScroll, onComplete: () => {isScroll = false} });
  };

  return (
    <button className={styles.container} onClick={onClick}>
      <>
        <Image
          src={direction === 'down' ? arrowDownSource : arrowUpSource as StaticImageData}
          alt='Arrow Down'
          className={styles.icon}
        />
        <span className={styles.title}>
          Scroll <span className={styles.highlighted}>{direction === 'down' ? 'down' : 'up'}</span>
        </span>
      </>
    </button>
  );
};

export default ScrollTo;
