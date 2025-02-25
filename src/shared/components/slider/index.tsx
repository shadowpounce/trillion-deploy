import clsx from "clsx"
import {FC, ReactNode, useEffect} from "react"

import styles from "./index.module.scss"
import {SliderLine} from "./slider-line"

interface ISlider {
    type: "row" | "col"
    items: ReactNode[]
    className?: string
    speedMultiplayer?: number
    speedMultiplayerHover?: number
    direction?: "to-right" | "to-left"
    checkLoad?: boolean
}

export const Slider: FC<ISlider> = ({
    items,
    type,
    className,
    speedMultiplayer = 1,
    speedMultiplayerHover = speedMultiplayer,
    direction = "to-left",
    checkLoad = false,
}) => {
    return (
        <div
            className={clsx(
                styles.Slider,
                styles[type],
                styles[direction],
                className,
            )}
        >
            <div className={clsx(styles.Slider_inner)}>
                <SliderLine
                    items={items}
                    type={type}
                    speedMultiplayer={speedMultiplayer}
                    speedMultiplayerHover={speedMultiplayerHover}
                    direction={direction}
                    checkLoad={checkLoad}
                />
            </div>
        </div>
    )
}
