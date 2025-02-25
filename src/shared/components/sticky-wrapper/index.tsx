import clsx from "clsx"
import {ComponentPropsWithoutRef, FC, PropsWithChildren} from "react"

import {MediaQuery} from "../media-query"

import styles from "./index.module.scss"

interface IStickyWrapper extends ComponentPropsWithoutRef<"div"> {
    container?: ComponentPropsWithoutRef<"div">
    web?: boolean
}

export const StickyWrapper: FC<PropsWithChildren<IStickyWrapper>> = ({
    children,
    container,
    web,
    className,
    ...props
}) => {
    return (
        <>
            {web ? (
                <div
                    {...props}
                    className={clsx(styles.StickyWrapper, className)}
                >
                    <div
                        {...container}
                        className={clsx(
                            styles.StickyWrapper_content,
                            container?.className,
                        )}
                    >
                        {children}
                    </div>
                </div>
            ) : (
                <>
                    <MediaQuery query="(min-width: 1025px)">
                        {children}
                    </MediaQuery>
                    <MediaQuery query="(max-width: 1024px)">
                        <div
                            {...props}
                            className={clsx(styles.StickyWrapper, className)}
                        >
                            <div
                                {...container}
                                className={clsx(
                                    styles.StickyWrapper_content,
                                    container?.className,
                                )}
                            >
                                {children}
                            </div>
                        </div>
                    </MediaQuery>
                </>
            )}
        </>
    )
}
