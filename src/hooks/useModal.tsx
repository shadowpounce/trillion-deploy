"use client"

import {useState} from "react"

export interface IModal {
    isActive: boolean
    open: () => void
    close: () => void
    toggle: () => void
    data: any
    setData: any
}

export const useModal = (): IModal => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const [data, setData] = useState<any>()

    const open = () => {
        setIsActive(true)
    }

    const close = () => {
        setIsActive(false)
    }

    const toggle = () => {
        setIsActive((prev) => !prev)
    }

    return {
        isActive,
        open,
        close,
        toggle,
        data,
        setData,
    }
}
