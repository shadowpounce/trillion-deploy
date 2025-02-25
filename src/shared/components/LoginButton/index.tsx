'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, Variants } from 'framer-motion';

import styles from './index.module.scss';
import starSource from 'assets/badge_star.png';
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

const LoginButton = () => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Link href="https://trading.trilliondigital.io/">
      <motion.button
      variants={buttonAnim}
      initial='init'
      animate={hover ? 'anim' : 'init'}
      whileTap='tap'
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className={styles.button}
    >
      <Image
        src={starSource as StaticImageData}
        alt='Star'
        className={styles.icon}
      />
      <span className={styles.text}>Log In</span>
    </motion.button>
    </Link>
  );
};

export default LoginButton;
