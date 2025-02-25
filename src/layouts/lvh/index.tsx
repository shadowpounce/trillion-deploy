/**
 * @fileoverview Sets full device screen height to html tag for CSS use
 * Renders only once on page load and is used to fix shakin in Instagram in-app & ios chrome
 */
import clsx from "clsx"
import {useEffect, useRef, useState} from "react"

import styles from "./index.module.scss"

const isChromeIOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor
    const isIOS = /iPad|iPhone|iPod/.test(userAgent)
    const isChrome = /CriOS/.test(userAgent)

    return isIOS && isChrome
}

const setStyleVar = (name: string, value: number) => {
    if (window.innerWidth > 576) {
        document.documentElement.style.removeProperty(`--${name}`)
    } else if (
        document.documentElement.style.getPropertyValue(`--${name}`) !==
        `${value}px`
    ) {
        document.documentElement.style.setProperty(`--${name}`, `${value}px`)
    }
}

export const Lvh = () => {
    const refLvh = useRef<HTMLDivElement>(null)
    const refSvh = useRef<HTMLDivElement>(null)
    const [isRender, setIsRender] = useState<boolean>(false)

    useEffect(() => {
        render()

        function render() {
            if (!refLvh.current || !refSvh.current) return null

            const bottomMenuOffset = 0 //px

            const vh =
                (window[isChromeIOS() ? "innerHeight" : "outerHeight"] +
                    bottomMenuOffset) *
                0.01
            const lvh = refLvh.current.getBoundingClientRect().height * 0.01
            const svh = refSvh.current.getBoundingClientRect().height * 0.01

            // alert(
            //     `${window.innerHeight * 0.01},${window.outerHeight * 0.01}, ${lvh}, ${svh}`,
            // )

            setStyleVar("vh", vh)
            setStyleVar("lvh", lvh)
            setStyleVar("svh", svh)

            setIsRender(true)
        }
    }, [])

    if (isRender) return null

    return (
        <>
            <div className={clsx(styles.lvh)} ref={refLvh} />
            <div className={clsx(styles.svh)} ref={refSvh} />
        </>
    )
}
