"use client"

import img from "assets/footer-img.webp"
import linkedinSource from "assets/linkedin.png"
import mediumSource from "assets/medium.png"
import name from "assets/name.svg"
import star from "assets/star.svg"
import xSource from "assets/x.png"
import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import Image, {StaticImageData} from "next/image"
import Link from "next/link"
import {useEffect, useState} from "react"

import {Chars} from "@/utils/chars"

import Badge from "shared/components/Badge"

import {LanguageSwitcher} from "../Header/index"

import styles from "./index.module.scss"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Text = () => {
  return (
    <div className={styles.textContainer}>
      <p className={styles.text}>
        This material is for informational purposes only and is not intended to
        provide accounting, legal, tax advice, or investment recommendations.
        Any services made available in the future will be subject to and made on
        the terms of the legal agreements relating thereto.
      </p>

      <p className={styles.text}>
        Trillion Capital Markets Inc d/b/a Trillion Digital is registered as an
        MSB with FinCEN (MSB Registration Number: 31000236132526) and holds a
        Money Transmitter License in the State of Florida (MTL License Number:
        FT230000409).
      </p>

      <p className={styles.text}>
        Trillion Capital Markets Inc d/b/a Trillion Digital is not registered or
        licensed with the U.S. Securities and Exchange Commission or the U.S.
        Commodity Futures Trading Commission. Trillion Capital Markets Inc d/b/a
        Trillion Digital services qualified participants; U/HNWI’s, qualified
        institutional buyers, and well-capitalized corporations.
      </p>

      <p className={styles.text}>
        For legal reasons, including adherence to OFAC sanctions compliance, we
        do not service Individuals, Corporations and Institutions
        located/established in or residents of the following countries:
        Afghanistan, Belarus, Burma (Myanmar), Côte D’Ivoire (Ivory Coast),
        Central African Republic, The Democratic Republic of the Congo, Cuba,
        Iran, Iraq, Liberia, Libya, North Korea (DPRK), Palestine (Gaza Strip),
        Russian Federation, Somalia, South Sudan, Sudan, Syria, Ukraine, Yemen,
        Zimbabwe, or any members/affiliates of the government of Venezuela.
      </p>
    </div>
  )
}

const Footer = () => {
  const [isPhone, setIsPhone] = useState<boolean>()
  useEffect(() => {
    setIsPhone(window.innerWidth < 744)
  }, [])
  // useEffect(() => {
  //   gsap.delayedCall(0.5, () => {
  //     const tl = gsap.timeline({
  //       defaults: {
  //         duration: 1,
  //         ease: 'sine',
  //       },
  //       scrollTrigger: {
  //         trigger: `.${styles.footer}`,
  //         start: 'top center',
  //         end: 'bottom top',
  //         toggleActions: 'play none none none',
  //       },
  //     });
  //     const ul = document.querySelectorAll(`.${`${styles.resourcesContainer}.line-appearance-list`}`);
  //     // const a = document.querySelectorAll(`.${styles.bottomContainer} .${styles.linksWrapper} .${styles.linksContainer} a`);
  //     // a.forEach((item) => {
  //     //   const chars = item.querySelectorAll(`.char`);
  //     //   tl.fromTo(chars, { opacity: 0, yPercent: 100, stagger: 0.1 }, { opacity: 1, yPercent: 0, stagger: 0.1 }, 0.5);
  //     // })
  //     ul.forEach((item, i) => {
  //       const title = item.querySelector(`.${styles.resourcesTitle}`);
  //       const links = item.querySelectorAll(`.${styles.link}`);
  //       const icons = item.querySelectorAll(`.${styles.logosContainer} a`);
  //       const index = i / 4;
  //       tl.fromTo(title, { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0 }, index)
  //       if(links.length) {
  //         tl.fromTo(links, { opacity: 0, yPercent: 100, stagger: 0.25 }, { opacity: 1, yPercent: 0, stagger: 0.25 }, 0.5 + index);
  //       }
  //       if(icons.length) {
  //         tl.fromTo(icons, { opacity: 0, scale: 0, stagger: 0.1 }, { opacity: 1, scale: 1, stagger: 0.1 }, 0.5 + index);
  //       }
  //     })
  //     tl
  //     .fromTo(`.${styles.logo}`, { opacity: 0 }, { opacity: 1 }, 0)
  //     .fromTo(`.${styles.star}`, { rotateZ: 360 * 4, duration: 2, ease: "expo.out", }, { rotateZ: -360 * 4, duration: 2, ease: "expo.out", }, 0)
  //     .fromTo(`.${styles.name}`, { x: 20 }, { x: 0 }, 0)
  //     .fromTo(`.${styles.footer} .badge`, { scale: 0 }, { scale: 1 }, 0)
  //     .fromTo(
  //       `.${styles.img}`,
  //       {
  //         maskImage: "radial-gradient(circle at 0 100%, #000 0%, transparent 0%)",
  //         duration: 3,
  //       },
  //       {
  //         maskImage: "radial-gradient(circle at 0 100%, #000 0%, transparent 100%)",
  //         duration: 3,
  //     }, 1)
  //     .fromTo(`.${styles.text}`, { opacity: 0, y: 50, stagger: 0.25 }, { opacity: 1, y: 0, stagger: 0.25 }, 0)
  //     .fromTo(`.${styles.licence}`, { opacity: 0, y: 50, stagger: 0.25 }, { opacity: 1, y: 0, stagger: 0.25 }, 0.5)
  //   })
  // }, [])

  // const [isHome, setIsHome] = useState(false);

  // useEffect(() => {
  //   setIsHome(window.location.pathname === '/');
  // }, []);

  return (
    <footer className={styles.footer}>
      <Image
        src={img as StaticImageData}
        alt="img"
        className={styles.img}
        quality={100}
      />
      <div className={styles.topContainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src={star as StaticImageData}
            alt="star"
            className={styles.star}
          />
          <Image
            src={name as StaticImageData}
            alt="name"
            className={styles.name}
          />
        </Link>
        <div className={`${styles.resourcesWrapper}`}>
          <div className={`${styles.resourcesContainer} line-appearance-list`}>
            <h3 className={styles.resourcesTitle}>Solutions</h3>
            <div className={styles.linksContainer}>
              <Link href="/" className={styles.link}>
                OTC
              </Link>
              <Link href="/" className={styles.link}>
                Electronic Trading
              </Link>
            </div>
          </div>

          <div className={`${styles.resourcesContainer} line-appearance-list`}>
            <h3 className={styles.resourcesTitle}>Company</h3>
            <div className={styles.linksContainer}>
              <Link href="/team" className={styles.link}>
                About Us
              </Link>

              <Link href="/" className={styles.link}>
                Insights
              </Link>
              <Link href="/contact" className={styles.link}>
                Contact Us
              </Link>
            </div>
          </div>

          <div className={`${styles.resourcesContainer} line-appearance-list`}>
            <h3 className={styles.resourcesTitle}>Legal</h3>
            <div className={styles.linksContainer}>
              <Link href="/" className={styles.link}>
                Regulatory
              </Link>
              <Link href="/aml-ctf_policy_notice" className={styles.link}>
                AML/CTF
              </Link>
              <Link href="/risks_and_disclosures" className={styles.link}>
                Disclosures
              </Link>
            </div>
          </div>

          <div className={`${styles.resourcesContainer} line-appearance-list`}>
            <h3 className={styles.resourcesTitle}>Resources</h3>
            <div className={styles.linksContainer}>
              <Link href="/faq" className={styles.link}>
                FAQ’s
              </Link>
              <Link href="/" className={styles.link}>
                Careers
              </Link>
              <Link href="/" className={styles.link}>
                Referrals
              </Link>
            </div>
          </div>

          <div className={`${styles.resourcesContainer}`}>
            <h3 className={styles.resourcesTitle}>Follow Us</h3>
            <div className={styles.logosContainer}>
              <Link target="_blank" href="https://x.com/trilliondigital">
                <Image
                  src={xSource as StaticImageData}
                  alt="X"
                  className={styles.logo}
                />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/company/trilliondigital/"
              >
                <Image
                  src={linkedinSource as StaticImageData}
                  alt="Linkedin"
                  className={styles.logo}
                />
              </Link>
              <Link target="_blank" href="https://trilliondigital.medium.com/">
                <Image
                  src={mediumSource as StaticImageData}
                  alt="Medium"
                  className={styles.logo}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.centralContainer}>
        <Badge
          isLink={true}
          link={"https://status.trilliondigital.io/"}
          title="All system operational"
        />
        {!isPhone && <Text></Text>}
      </div>

      <div className={styles.bottomContainer}>
        <div className={`${styles.resourcesWrapper}`}>
          <div className={`${styles.resourcesContainer} line-appearance-list`}>
            <h3 className={styles.resourcesTitle}>Solutions</h3>
            <div className={styles.linksContainer}>
              <Link href="/" className={styles.link}>
                OTC
              </Link>
              <Link href="/" className={styles.link}>
                Electronic Trading
              </Link>
            </div>
          </div>

          <div className={`${styles.resourcesContainer} line-appearance-list`}>
            <h3 className={styles.resourcesTitle}>Company</h3>
            <div className={styles.linksContainer}>
              <Link href="/contact" className={styles.link}>
                Contact Us
              </Link>

              <Link href="/" className={styles.link}>
                Insights
              </Link>
              <Link href="/" className={styles.link}>
                About Us
              </Link>
            </div>
          </div>

          <div className={`${styles.resourcesContainer} line-appearance-list`}>
            <h3 className={styles.resourcesTitle}>Legal</h3>
            <div className={styles.linksContainer}>
              <Link href="/" className={styles.link}>
                Regulatory
              </Link>
              <Link href="/aml-ctf_policy_notice" className={styles.link}>
                AML/CTF
              </Link>
              <Link href="/" className={styles.link}>
                Disclosures
              </Link>
            </div>
          </div>

          <div className={`${styles.resourcesContainer} line-appearance-list`}>
            <h3 className={styles.resourcesTitle}>Resources</h3>
            <div className={styles.linksContainer}>
              <Link href="/faq" className={styles.link}>
                FAQ’s
              </Link>
              <Link href="/" className={styles.link}>
                Careers
              </Link>
              <Link href="/" className={styles.link}>
                Referrals
              </Link>
            </div>
          </div>
        </div>

        <div className={`${styles.resourcesWrapper}`}>
          <div className={`${styles.resourcesContainer}`}>
            <h3 className={styles.resourcesTitle}>Follow Us</h3>
            <div className={styles.logosContainer}>
              <Link target="_blank" href="https://x.com/trilliondigital">
                <Image
                  src={xSource as StaticImageData}
                  alt="X"
                  className={styles.logo}
                />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/company/trilliondigital/"
              >
                <Image
                  src={linkedinSource as StaticImageData}
                  alt="Linkedin"
                  className={styles.logo}
                />
              </Link>
              <Link target="_blank" href="https://trilliondigital.medium.com/">
                <Image
                  src={mediumSource as StaticImageData}
                  alt="Medium"
                  className={styles.logo}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.linksWrapper}>
          <p className={styles.licence}>
            {new Date().getFullYear()} © Trillion Capital Markets Inc d/b/a
            Trillion Digital, All Rights Reserved
          </p>
          {isPhone && <Text></Text>}
          <div className={`${styles.linksContainer} line-appearance-list`}>
            <Link href="/terms_and_conditions" className={styles.link}>
              <Chars str="Website Terms and Conditions"></Chars>
            </Link>
            <Link href="/terms_of_service" className={styles.link}>
              <Chars str="Terms of Service"></Chars>
            </Link>
            <Link href="/privacy_notice" className={styles.link}>
              <Chars str="Privacy Policy"></Chars>
            </Link>
            <Link href="/cookie_policy" className={styles.link}>
              <Chars str="Cookies Policy"></Chars>
            </Link>
            {/* <div className={styles.languageSwitcherContainer}> */}
            <LanguageSwitcher />
            {/* </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
