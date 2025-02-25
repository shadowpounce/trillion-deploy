'use client';



import styles from './page.module.scss';
import Team from '@/app/team/aboutTeam';
import Mission from '@/app/team/mission';
import Vision from '@/app/team/vision';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef } from 'react';
import ProgressBar from 'shared/components/ProgressBar';
import ScrollTo from 'shared/components/ScrollTo';

const TeamPage = () => {
  const page = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const divs = page.current?.querySelectorAll(`.${styles.topContainer}`);
  //   divs?.forEach((div) => {
  //     const video = div?.querySelector(`.${styles.video}`) as HTMLVideoElement;
  //     gsap.timeline({
  //       scrollTrigger: {
  //         trigger: div,
  //         start: 'top top+=1',
  //         end: 'bottom top',
  //         // markers: true,
  //         onEnter: () => {
  //           video?.play();
  //           // console.log('play');
  //         },
  //         onEnterBack: () => {
  //           video?.play();
  //           // console.log('play');
  //         },
  //         onLeave: () => {
  //           video?.pause();
  //           // console.log('pause');
  //         },
  //         onLeaveBack: () => {
  //           video?.pause();
  //           // console.log('pause');
  //         },
  //       }
  //     })
  //   });
  // }, []);
  return (
    <main ref={page} className={styles.wrapper}>
      <div className={styles.container}>
        <Team />
        <div className={styles.topContainer}>
          <Mission />
          <Vision />
          <video loop muted playsInline className={styles.video}>
            <source src={"Ilustrator anim All 1_1.mp4"} type='video/mp4' />
          </video>
        </div>
      </div>
      <div className={styles.progressContainer}>
        <ProgressBar />
      </div>
      <div className={styles.scrollToContainer}>
        <ScrollTo direction='down' onClick={() => {}} />
      </div>
    </main>
  );
};

export default TeamPage;
