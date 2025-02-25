import clsx from "clsx"
import {FC} from "react"

import styles from "./index.module.scss"

interface ILoadingRing {}

export const LoadingRing: FC<ILoadingRing> = () => {
    return <div className={clsx(styles.LoadingRing)} />
}
