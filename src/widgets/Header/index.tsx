"use client"

import global from "assets/Global.svg"
import dot from "assets/dot.svg"
// import {FlyingParticles} from "shared/components/flying-particles";
import mobileBg from "assets/mobileBg.png"
import name from "assets/name.svg"
import star from "assets/star.svg"
import clsx from "clsx"
import gsap from "gsap"
import Image, {StaticImageData} from "next/image"
import Link from "next/link"
import {FC, useEffect, useRef, useState} from "react"

import {useLanguageStore} from "@/utils/useLanguageStore"

import LoginButton from "shared/components/LoginButton"
import OnboardingButton from "shared/components/OnboardingButton"

import styles from "./index.module.scss"

type Props = {
    children?: React.ReactNode
    href?: string
    isDropdown?: boolean
    dropItems?: {
        href: string
        text: string
    }[]
}

type LanguageSwitcherProps = {
    languages?: {
        value: string
        label: string
    }[]
    isTop?: boolean
}

const Li: FC<Props> = ({
    href = "/",
    children,
    isDropdown = false,
    dropItems,
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const dropdown = useRef<HTMLUListElement>(null)

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024)
        if (dropdown.current && isMobile) {
            const {height} = dropdown.current.getBoundingClientRect()
            dropdown.current.style.setProperty("--height", `${height}px`)
            dropdown.current.style.height = "0px"
        }
    }, [isMobile])

    const onMouseEnter = () => {
        if (isMobile) return
        setOpen(true)
    }
    const onMouseLeave = () => {
        if (isMobile) return
        setOpen(false)
    }

    return isDropdown ? (
        <span
            onClick={() => {
                if (!isMobile) return
                setOpen(!open)
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`${styles.link} ${styles.dropdownLink}`}
        >
            <Image
                src={dot as StaticImageData}
                alt="dot"
                className={styles.dot}
            ></Image>
            {children}
            <ul
                ref={dropdown}
                className={`${styles.dropdown} ${open ? styles.activeDropdown : ""}`}
            >
                {/* <FlyingParticles color='#fff' speed={1000}></FlyingParticles> */}
                {dropItems?.map(({href, text}, i) => (
                    <li key={i}>
                        <Link className={styles.link} href={href}>
                            {text}
                        </Link>
                    </li>
                ))}
            </ul>
        </span>
    ) : (
        <Link href={href} className={`${styles.link}`}>
            {children}
        </Link>
    )
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
    languages = [
        {label: "English", value: "en"},
        {label: "Spanish", value: "es"},
        {label: "Portuguese", value: "pt"},
    ],
    isTop = false,
}) => {
    // const [lang, setLang] = useState<Record<string, string>>(languages[0]);
    const {lang, setLang} = useLanguageStore()
    const w = languages.reduce((prev, curr) =>
        prev.label.length > curr.label.length ? prev : curr,
    )

    return (
        <div className={clsx(styles.languageSwitcher, isTop ? styles.top : "")}>
            <span className={styles.languageSwitcher_title}>
                <Image src={global as StaticImageData} alt="Global" />
                <b style={{width: `${w.label.length}ch`}}>{lang.label}</b>
            </span>
            <div className={styles.languageSwitcher_languages}>
                {/* <FlyingParticles color='#fff' speed={1000}></FlyingParticles> */}
                {languages.map(({label, value}) => {
                    return (
                        <span
                            className={
                                lang.value === value ? styles.active : ""
                            }
                            key={value}
                            onClick={() => setLang({label, value})}
                        >
                            {label}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export {LanguageSwitcher}

interface MenuProps {
    active: boolean
    setActive: (active: boolean) => void
}

const Burger: FC<MenuProps> = ({active, setActive}) => {
    return (
        <button
            className={`${styles.burger} ${active ? styles.active : ""}`}
            onClick={() => setActive(!active)}
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}

const Header = () => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        const tl = gsap.timeline({
            defaults: {
                duration: 2,
                ease: "sine.inOut",
            },
        })
        tl.fromTo(
            `.${styles.logo}`,
            {opacity: 0, duration: 1},
            {opacity: 1, duration: 1},
            0,
        )
            // .fromTo(`.${styles.star}`, { rotateZ: 360 * 4, duration: 2, ease: "expo.out", }, { rotateZ: -360 * 4, duration: 2, ease: "expo.out", }, 0)
            .from(`.${styles.name}`, {x: 20, duration: 2}, 0)
    }, [])

    return (
        <>
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
            <header className={styles.headerContainer}>
                <div className={styles.leftItem}>
                    {/* <Link href='/' className={styles.logo}>
          <Image
            src={star as StaticImageData}
            alt='star'
            className={styles.star}
          />
          <Image
            src={name as StaticImageData}
            alt='name'
            className={styles.name}
          />
        </Link> */}
                </div>
                <div
                    className={`${styles.centralContainer} line-appearance-list`}
                >
                    <Li
                        isDropdown
                        dropItems={[
                            {href: "/team", text: "About us"},
                            {
                                href: "https://careers.trilliondigital.io/",
                                text: "Join us",
                            },
                            {href: "/faq", text: "FAQ’s"},
                        ]}
                    >
                        About
                    </Li>
                    <Li
                        isDropdown
                        dropItems={[
                            {href: "/", text: "OTC"},
                            {href: "/", text: "Electronic Trading"},
                        ]}
                    >
                        Solutions
                    </Li>
                    <Li href="/contact">Contact</Li>
                </div>
                <div className={styles.rightItem}>
                    <LanguageSwitcher />
                    <div className={styles.loginButton}>
                        <LoginButton />
                    </div>
                    <OnboardingButton />
                    <Burger active={active} setActive={setActive}></Burger>
                </div>
            </header>
            <div
                className={`${styles.menu} ${active ? styles.activeMenu : ""}`}
            >
                <Image
                    src={mobileBg as StaticImageData}
                    alt="mobileBg"
                    className={styles.mobileBg}
                ></Image>
                <div className={styles.menuContainer}>
                    <Li
                        isDropdown
                        dropItems={[
                            {href: "/team", text: "About us"},
                            {
                                href: "https://careers.trilliondigital.io/",
                                text: "Join us",
                            },
                            {href: "/faq", text: "FAQ’s"},
                        ]}
                    >
                        About
                    </Li>
                    <Li
                        isDropdown
                        dropItems={[
                            {href: "/", text: "OTC"},
                            {href: "/", text: "Electronic Trading"},
                        ]}
                    >
                        Solutions
                    </Li>
                    <Li href="/contact">Contact</Li>
                    <OnboardingButton />
                    <LoginButton />
                    <LanguageSwitcher isTop />
                </div>
            </div>
        </>
    )
}

export default Header
