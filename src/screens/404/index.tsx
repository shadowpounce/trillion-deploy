import clsx from "clsx"
import {FC} from "react"

import {Slider} from "shared/components/slider"

import styles from "./index.module.scss"

interface IPage404 {
    text: string
}

export const Page404: FC<IPage404> = ({text}) => {
    return (
        <div className={clsx(styles.Page404)}>
            <Slider
                type="row"
                items={[
                    <div className={clsx(styles.Page404_text)}>
                        | 404 {text && `• ${text}`}
                    </div>,
                ]}
            />
        </div>
    )
}
