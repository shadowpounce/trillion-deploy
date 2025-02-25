import clsx from "clsx"
import {FC, PropsWithChildren} from "react"

import styles from "./index.module.scss"

interface INavbarItem {
    href?: string
}

export const NavbarItem: FC<PropsWithChildren<INavbarItem>> = ({
    children,
    href,
}) => {
    return (
        <div className={clsx(styles.NavbarItem)}>
            <a href={href}>{children}</a>
        </div>
    )
}
