"use client"

import {useGSAP} from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import {FC, PropsWithChildren, useRef} from "react"

import {IModal} from "@/hooks/useModal"

import styles from "./index.module.scss"

export interface IModalWrapper {
    modal: IModal
    tl?: gsap.core.Timeline
    reverseDelay?: number
}

export const ModalWrapper: FC<PropsWithChildren<IModalWrapper>> = ({
    children,
    modal,
    tl,
    reverseDelay,
}) => {
    const refBG = useRef<HTMLDivElement>(null)
    const refRoot = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        tl &&
            tl
                .eventCallback("onStart", () => {
                    gsap.set(refRoot.current, {
                        autoAlpha: 1,
                    })
                })
                .eventCallback("onReverseComplete", () => {
                    gsap.set(refRoot.current, {
                        autoAlpha: 0,
                    })
                })
    }, [tl])

    return (
        <div className={clsx(styles.ModalWrapper)} ref={refRoot}>
            <div
                className={clsx(styles.ModalWrapper_bg)}
                onClick={modal.close}
                ref={refBG}
            />
            {children}
        </div>
    )
}
