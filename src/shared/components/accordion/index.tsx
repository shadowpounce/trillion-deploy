"use client"

import clsx from "clsx"
import {FC, ReactNode, useEffect, useRef, useState} from "react"

import {BlocksContent, BlocksRenderer} from "@strapi/blocks-react-renderer"

import styles from "./index.module.scss"

export interface IAccordion {
    index?: number
    question: string
    // description?: BlocksContent
    answer?: ReactNode
}

export const Accordion: FC<IAccordion> = ({index, question, answer}) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    const refRoot = useRef<HTMLDivElement>(null)
    const refHeader = useRef<HTMLDivElement>(null)
    const refDescription = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = refDescription.current
        if (element) {
            element.style.height = `${isActive ? element.scrollHeight : 0}px`
        }
    }, [isActive])

    return (
        <div
            className={clsx(styles.Accordion, isActive && styles.active)}
            onClick={() => setIsActive((prev) => !prev)}
            ref={refRoot}
        >
            <div className={clsx(styles.Accordion_header)} ref={refHeader}>
                {/* {index != undefined && (
                    <div className={clsx(styles.Accordion_num)}>
                        {(index + 1).toString().padStart(2, "0")}
                    </div>
                )} */}
                <div className={clsx(styles.Accordion_title)}>{question}</div>
            </div>
            <div className={clsx(styles.Accordion_button)} />
            <div
                className={clsx(styles.Accordion_description)}
                ref={refDescription}
            >
                <div className={styles.Accordion_description_inner}>
                    <div className={styles.Accordion_content}>
                        {/* <BlocksRenderer content={description || []} /> */}
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    )
}
