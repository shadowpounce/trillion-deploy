// import clsx from "clsx"
import gsap from "gsap"
import {ReactLenis, useLenis} from "lenis/react"
import {FC, PropsWithChildren, useEffect, useRef} from "react"

// import styles from "./index.module.scss"

interface ILenisLayout {}

export const LenisLayout: FC<PropsWithChildren<ILenisLayout>> = ({
    children,
}) => {
    const lenis = useLenis(({scroll}) => {
        // called every scroll
        console.log("lenis scroll")
    })

    const lenisRef = useRef<any>()

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000)
        }

        gsap.ticker.add(update)

        return () => {
            gsap.ticker.remove(update)
        }
    })

    return (
        <ReactLenis root ref={lenisRef} autoRaf={false}>
            {children}
        </ReactLenis>
    )
}
