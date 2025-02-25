import clsx from "clsx"
import {ComponentPropsWithoutRef, FC, PropsWithChildren} from "react"

import styles from "./index.module.scss"
import {NavbarItem} from "./ui/navbar-item"

interface INavbarComp extends ComponentPropsWithoutRef<"div"> {}

const NavbarComp: FC<PropsWithChildren<INavbarComp>> = ({
    children,
    className,
}) => {
    return <div className={clsx(styles.NavbarComp, className)}>{children}</div>
}

export const Navbar = Object.assign(NavbarComp, {
    Item: NavbarItem,
})
