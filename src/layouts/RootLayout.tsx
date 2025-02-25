"use client"

import {FC, PropsWithChildren, useEffect} from "react"
import {WithGsap} from "providers/WithGsap"
import {WithMain} from "providers/main-provider"
import {Preloader} from "widgets/Preloader"
import Footer from "widgets/Footer"
import Header from "widgets/Header"
import {ScrollLayout} from "./ScrollLayout/ScrollLayout"
import {Lvh} from "./lvh"
import {StrapiProvider} from "layouts/themeProvider"

interface IRootLayout {}

export const RootLayout: FC<PropsWithChildren<IRootLayout>> = ({children}) => {
    useEffect(() => {
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual"
        }
    }, [])
    return (
        <StrapiProvider>
            <Lvh />
            
            <ScrollLayout>
                <WithMain>
                    <WithGsap>
                        <Preloader />
                        <Header />
                        {children}
                        <Footer />
                    </WithGsap>
                </WithMain>
            </ScrollLayout>
        </StrapiProvider>
    )
}
