import clsx from "clsx"
import {FC} from "react"

import styles from "./index.module.scss"

interface IIconInfo {}

export const IconInfo: FC<IIconInfo> = () => {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_352_7129)">
                <circle
                    cx="9.50016"
                    cy="9.49967"
                    r="7.91667"
                    stroke="#616AE3"
                    stroke-width="1.5"
                />
                <path
                    d="M9.5 13.458V8.70801"
                    stroke="#616AE3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />
                <circle
                    cx="0.791667"
                    cy="0.791667"
                    r="0.791667"
                    transform="matrix(1 0 0 -1 8.7085 7.125)"
                    fill="#616AE3"
                />
            </g>
            <defs>
                <clipPath id="clip0_352_7129">
                    <rect width="19" height="19" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}
