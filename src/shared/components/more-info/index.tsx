import clsx from "clsx"
import {FC, useState} from "react"

import styles from "./index.module.scss"
import {IconInfo} from "./ui/icon-info"

interface IMoreInfo {
    text: string
}

export const MoreInfo: FC<IMoreInfo> = ({text}) => {
    const [isHover, setIsHover] = useState<boolean>(false)

    return (
        <div
            className={clsx(styles.MoreInfo, isHover && styles.active)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className={clsx(styles.MoreInfo_icon)}>
                <IconInfo />
            </div>
            <div className={clsx(styles.MoreInfo_text)}>{text}</div>
        </div>
    )
}
