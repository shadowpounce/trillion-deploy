'use client';

import { HTMLProps, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, Variants } from 'framer-motion';
import {FC} from "react";
import styles from './index.module.scss';
import arrowRightSource from 'assets/arrow_right.png';
import Link from 'next/link';

const buttonAnim: Variants = {
  init: {
    scale: 1,
    outline: '3px solid rgba(255, 255, 255, 0)',
    transition: {
      ease: [0.33, 1, 0.68, 1],
      duration: 0.3,
    },
  },
  anim: {
    scale: 1,
    outline: '3px solid rgba(255, 255, 255, 0.15)',
    transition: {
      type: 'spring',
      bounce: 0.25,
      duration: 0.5,
    },
  },
  tap: {
    scale: 0.9,
  },
};

export interface OnboardingButtonProps {
  isSubmit?: boolean;
  isBackHome?: boolean
}

const OnboardingButton: FC<OnboardingButtonProps> = ({isSubmit = false, isBackHome = false}) => {
  const [hover, setHover] = useState<boolean>(false);

  if(isSubmit) {
    return (
      <motion.button
        variants={buttonAnim}
        initial='init'
        animate={hover ? 'anim' : 'init'}
        whileTap='tap'
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        className={`${styles.button as HTMLProps<HTMLElement>['className']} btn`}
        type='submit'
      >
        <span className={styles.text}>Submit</span>
        <Image
          src={arrowRightSource as StaticImageData}
          alt='Arrow Right'
          className={styles.icon}
        />
      </motion.button>
    )
  }

  if(isBackHome) {
    return (
      <Link href='/' className={"btn"}>
        <motion.button
          variants={buttonAnim}
          initial='init'
          animate={hover ? 'anim' : 'init'}
          whileTap='tap'
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
          className={`${styles.button as HTMLProps<HTMLElement>['className']} btn`}
        >
          <span className={styles.text}>Back to Home page</span>
          <Image
            src={arrowRightSource as StaticImageData}
            alt='Arrow Right'
            className={styles.icon}
          />
        </motion.button>
      </Link>
    )
  }

  return (
    <Link href='/onboarding' className={"btn"}>
      <motion.button
        variants={buttonAnim}
        initial='init'
        animate={hover ? 'anim' : 'init'}
        whileTap='tap'
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        className={styles.button as HTMLProps<HTMLElement>['className']}
      >
        <span className={styles.text}>Onboard</span>
        <Image
          src={arrowRightSource as StaticImageData}
          alt='Arrow Right'
          className={styles.icon}
        />
      </motion.button>
    </Link>
  )
};

export default OnboardingButton;
