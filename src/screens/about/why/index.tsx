'use client';

import { useRef, useEffect, FC, use } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import styles from './index.module.scss';
import Badge from 'shared/components/Badge';
import Tag from 'shared/components/Tag';
import cardBackgroundSource from 'assets/benefit_card_bg.png';
import spotImageSource from 'assets/spot.png';
import bg from "assets/Benefits.png";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { Chars } from '@/utils/chars';
import { useGsapSliderContext } from 'layouts/gsap-slider';
import { useGsapSlideContext } from 'layouts/gsap-slider/ui/gsap-slide';

interface ICard {
  title: string;
  tags: string[];
  video: string;
  text: string;
  spotImageSource?: StaticImageData;
}

const Card: FC<ICard> = ({title, tags, video, text, spotImageSource}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {

      if(videoElement) {
        const loopStart = videoElement.duration - 2
        const loopEnd = videoElement.duration
        if (videoElement.currentTime >= loopEnd - 0.1) {
          console.log("loop")
          videoElement.currentTime = loopStart
          videoElement.play()
        }
      }
    }

    if(videoElement) {
      videoElement.ontimeupdate = handleTimeUpdate
    }
  }, [])
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardHeader}>
        {title}
      </div>
      <div className={styles.cardContainer}>
        <Image
          src={cardBackgroundSource as StaticImageData}
          alt='Card Backgroud'
          className={styles.cardBackground}
        />
        <div className={styles.tagsContainer}>
          {tags.map((tag) => (
            <Tag key={tag} title={tag} />
          ))}
        </div>
        {spotImageSource && (
          <Image
            src={spotImageSource}
            alt='Secure'
            className={styles.spotImage}
          />
        )}
        <video ref={videoRef} src={video} muted playsInline></video>
        <p className={styles.description}>
          <Chars str={text} isSpace></Chars>
        </p>
      </div>
    </div>
  )
}




const Why = () => {
  const swiperRef = useRef<SwiperRef | null>(null);


  const {stage, setStage, direction} = useGsapSliderContext()
  const {isActiveSlide, slideIndex} = useGsapSlideContext()

  useEffect(() => {
      if (isActiveSlide && stage == "before-transition") {
          setStage("transition")
      }
  }, [isActiveSlide, stage, direction])

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: 'sine',
      },
      scrollTrigger: {
        trigger: `.${styles.container}`,
        start: 'top center',
        end: 'bottom top',
        toggleActions: 'play none none none',
        // markers: true,
        onEnter: () => {
          const videos = document.querySelectorAll(`.${styles.container} video`) as NodeListOf<HTMLVideoElement>;
          // console.log(videos)
          videos.forEach((video) => {
            if(video.paused) video.play();
          });
        }
      },
    });
    // const texts = document.querySelectorAll(`.${styles.description}`);
    // texts.forEach((text, i) => {
    //   const chars = text.querySelectorAll(`.char`)
    //   tl.fromTo(chars, { opacity: 0, y: 25, stagger: 0.1 }, { opacity: 1, y: 0, stagger: 0.1 }, i === 0 ? 0 : 1.5)
    // })
    tl
    // .fromTo(`.${styles.title}`, { opacity: 0, yPercent: 100}, { opacity: 1, yPercent: 0}, 0)
    // .fromTo(`.${styles.container} .badge`, { scale: 0, duration: 1 }, { scale: 1, duration: 1 }, 0)
    .fromTo(`.${styles.cardWrapper}`, { opacity: 0, yPercent: 50, stagger: 0.25}, { opacity: 1, yPercent: 0, stagger: 0.25}, 1)
    .fromTo(`.${styles.bg}`, { opacity: 0 }, { opacity: 1 }, 1.5)
  }, [])
  return (
    <section className={styles.container}>
      <Image
        src={bg as StaticImageData}
        alt='bg'
        className={styles.bg}
        fill
      />
      <div className={styles.topContainer}>
        <Badge title='Why Us?' />
        <h3 className={styles.title}>Powerful Execution Engine</h3>
        <p className={styles.description}>
            <Chars str="Experience seamless trading across all execution channels—including
          API, voice, chat, and GUI—with personalized support and expert
          guidance for your most sophisticated trades." isSpace></Chars>
        </p>
      </div>
      <Swiper
        ref={swiperRef}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          744: {
            slidesPerView: 2,
          },
          1340: {
            slidesPerView: 3,
          },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        spaceBetween={24}
        className={styles.cardsContainer}
      >
        <SwiperSlide>
          <Card 
            title="Comprehensive Market Connectivity" 
            tags={['Exchanges', 'Brokers', 'Dark Pools', 'Market Makers', "ECN's"]} 
            video="card 1 v2.mp4" 
            text="Secure and direct market access to the top 25+ centralized order books and top 15+ market makers">
          </Card>
        </SwiperSlide>
        <SwiperSlide><Card 
          title="Smart Order Execution" 
          tags={['VWAP', 'Fill or kill', 'TWAP', 'RFQ', 'Market', 'Limit']} 
          video="card 2 v2.mp4" 
          text="Unparalleled deep liquidity via our algorithmic
              smart-order-routing engine — perform any order type: Market,
              limit, fill-or-kill, TWAP, VWAP, Iceberg and more" spotImageSource={spotImageSource}>
        </Card></SwiperSlide>
        <SwiperSlide><Card 
          title="Dynamic Settlement and Reporting" 
          tags={['24/7/365 Liquidity', 'Advanced post-trade', "Intra-Day Settlements"]} 
          video="card 3 v2.mp4" 
          text="Uninterrupted 24/7/365 liquidity and execution. Advanced
              post-trade reporting capabilities">
        </Card></SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Why;
