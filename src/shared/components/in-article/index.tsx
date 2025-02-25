"use client"

import clsx from "clsx"
import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import {FC, useEffect, useState} from "react"

import {gsapDelay} from "utils/gsap/gsapDelay"

import styles from "./index.module.scss"

interface IInArticle {
    scope: HTMLDivElement
}

export const InArticle: FC<IInArticle> = ({scope}) => {
    const [headings, setHeadings] = useState<
        {id: string; text: string; level: number}[]
    >([])

    useEffect(() => {
        // console.log(scope)
        gsap.registerPlugin(ScrollToPlugin)

        if (scope) {
            const headingElements = gsap.utils.toArray(
                "h1, h2, h3, h4, h5, h6",
                scope,
            ) as HTMLDivElement[]

            const headingData = headingElements.map((heading, i) => {
                heading.id = `heading_${i}`

                return {
                    id: heading.id,
                    text: heading.innerText,
                    level: Number(heading.tagName.replace("H", "")),
                }
            })

            setHeadings(headingData)
        }
    }, [])

    return (
        <div className={clsx(styles.InArticle)}>
            <h3 className={clsx(styles.InArticle_title)}>IN THIS ARTICLE</h3>
            <ul className={clsx(styles.InArticle_headings)}>
                {headings.map((e, i) => (
                    <li
                        className={clsx(styles.InArticle_headings_item)}
                        key={e.id}
                        onClick={() => {
                            gsap.to(window, {
                                duration: 0.5,
                                scrollTo: {
                                    y: `#heading_${i}`,
                                    offsetY: 150,
                                },
                            })
                        }}
                    >
                        {e.text}
                    </li>
                ))}
            </ul>
        </div>
    )
}
