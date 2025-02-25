"use client"

import {useGSAP} from "@gsap/react"
import {useClickAway} from "@uidotdev/usehooks"
import clsx from "clsx"
import gsap from "gsap"
import {
    FC,
    MutableRefObject,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react"
import {createPortal} from "react-dom"

import {gsapDelay} from "utils/gsap/gsapDelay"

import styles from "./index.module.scss"

interface IDropdownWrapper {
    header: ReactNode
    dropdown: ReactNode
}

export const DropdownWrapper: FC<IDropdownWrapper> = ({header, dropdown}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isMounted, setMounted] = useState<boolean>(false)

    const refDropMenu = useRef<HTMLDivElement>(null)
    const refHeader = useRef<HTMLDivElement>(null)

    const refClick: MutableRefObject<Element | null> = useClickAway(() => {
        setIsOpen(false)
    })

    const handleOpen = () => {
        setIsOpen((prev) => !prev)
    }

    const tl = useRef<gsap.core.Timeline>()

    const {contextSafe} = useGSAP(() => {
        gsapDelay(() => {
            tl.current = gsap
                .timeline({
                    paused: true,
                    defaults: {
                        ease: "power2.inOut",
                        duration: 0.5,
                    },
                })
                .fromTo(
                    refDropMenu.current,
                    {autoAlpha: 0, y: 10},
                    {
                        duration: 0.5,
                        autoAlpha: 1,
                        y: 0,
                    },
                )
        })
    }, [])

    const animSelect = contextSafe((isOpen: boolean) => {
        if (isOpen) {
            tl.current?.play()
        } else {
            tl.current?.reverse()
        }
    })

    useEffect(() => {
        animSelect(isOpen)

        if (isOpen) {
            refHeader.current?.children[0].classList.add("open")
        } else {
            refHeader.current?.children[0].classList.remove("open")
        }
    }, [isOpen])

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div
            className={clsx(styles.DropdownWrapper)}
            ref={(ref) => {
                if (ref) refClick.current = ref
            }}
        >
            <div
                className={clsx(
                    styles.DropdownWrapper_header,
                    isOpen && styles.open,
                )}
                onClick={handleOpen}
                ref={refHeader}
            >
                {header}
            </div>
            {isMounted &&
                createPortal(
                    <div
                        className={clsx(styles.DropdownWrapper_menu)}
                        ref={refDropMenu}
                    >
                        {dropdown}
                    </div>,
                    refClick.current ? refClick.current : document.body,
                )}
        </div>
    )
}
