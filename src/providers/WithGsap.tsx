"use client"

import {useGSAP} from "@gsap/react"
import gsap from "gsap"
// import {Draggable} from "gsap/Draggable"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import Script from "next/script"
import {FC, PropsWithChildren, useState} from "react"

interface IWithGsapProps {}

const libs = [
    // "/libs/ScrollSmoother.min.js",
    // "/libs/SplitText.min.js",
    "/libs/ScrollTrigger.min.js",
    // "/libs/DrawSVG.min.js",
]

export const WithGsap: FC<PropsWithChildren<IWithGsapProps>> = ({children}) => {
    const [countScriptLoad, setCountScriptLoad] = useState<number>(0)

    useGSAP(() => {
        if (countScriptLoad == libs.length) {
            gsap.registerPlugin(
                ScrollTrigger,
                // SplitText,
                // DrawSVGPlugin,
                // Draggable,
                ScrollToPlugin,
            )

            gsap.config({
                nullTargetWarn: false,
            })

            console.log("load scripts")

            gsap.delayedCall(1, () => {
                ScrollTrigger.refresh()
                console.log("gsap refresh!")
            })
        }
    }, [countScriptLoad])

    return (
        <>
            {libs.map((lib, i) => (
                <Script
                    src={lib}
                    onLoad={() => setCountScriptLoad((prev) => prev + 1)}
                    key={i}
                />
            ))}
            {children}
        </>
    )
}
