"use client"

import clsx from "clsx"
import gsap from "gsap"
import {useEffect, useRef, useState} from "react"
import {FC} from "react"

import {useResponsiveSize} from "utils/getSize"

import styles from "./index.module.scss"

export interface ICanvasGradient {
    className?: string
    speed?: number
    isActive?: boolean
    isView?: boolean
    style?: "purple" | "blue"
    customStyle?: Object
}

export const CanvasGradient: FC<ICanvasGradient> = ({
    className,
    speed = 5,
    isActive = true,
    isView = true,
    style = "purple",
    customStyle,
}) => {
    // return

    const [isActiveLocal, setIsActiveLocal] = useState<boolean>(isActive)

    const borderWidthDefault = useResponsiveSize(2)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number | null>(null) // Для хранения id анимации
    const angleRef = useRef<number>(0) // Хранение текущего угла

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const parent = canvas.parentElement
        if (!parent) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const setupCanvas = () => {
            const parentParams = parent.getBoundingClientRect()
            const borderRadius = parseFloat(
                getComputedStyle(canvas).borderRadius,
            )
            const borderWidth =
                parseFloat(getComputedStyle(canvas).borderWidth) ||
                borderWidthDefault

            const canvasWidth = parentParams.width + borderWidth * 3
            const canvasHeight = parentParams.height + borderWidth * 3

            canvas.width = canvasWidth
            canvas.height = canvasHeight
            canvas.style.width = `${(canvasWidth * 100) / parentParams.width}%`
            canvas.style.height = `${(canvasHeight * 100) / parentParams.height}%`

            const centerX = canvas.width / 2
            const centerY = canvas.height / 2

            const draw = () => {
                if (!isActiveLocal) return // Если isActive false, выходим из анимации

                ctx.clearRect(0, 0, canvas.width, canvas.height)

                const angle = angleRef.current // Берем текущий угол
                const x0 = centerX + (canvas.width / 2) * Math.cos(angle)
                const y0 = centerY + (canvas.height / 2) * Math.sin(angle)
                const x1 = centerX - (canvas.width / 2) * Math.cos(angle)
                const y1 = centerY - (canvas.height / 2) * Math.sin(angle)

                const gradient = ctx.createLinearGradient(x0, y0, x1, y1)

                switch (style) {
                    case "blue":
                        gradient.addColorStop(0, "#3fb7fe")
                        gradient.addColorStop(0.7, "#3fb9fe33")
                        break
                    case "purple":
                        gradient.addColorStop(0.4, "rgba(0, 0, 0, 0.00)")
                        gradient.addColorStop(0.58, "#8e92ee")
                        gradient.addColorStop(0.65, "#3b49e0")
                        gradient.addColorStop(0.87, "rgba(0, 0, 0, 0.00)")
                        break

                    default:
                        break
                }

                ctx.strokeStyle = gradient
                ctx.lineWidth = borderWidth

                const clearance = borderWidth * 1.5

                ctx.beginPath()
                ctx.moveTo(clearance + borderRadius, clearance)
                ctx.lineTo(canvas.width - clearance - borderRadius, clearance)
                ctx.quadraticCurveTo(
                    canvas.width - clearance,
                    clearance,
                    canvas.width - clearance,
                    clearance + borderRadius,
                )
                ctx.lineTo(
                    canvas.width - clearance,
                    canvas.height - clearance - borderRadius,
                )
                ctx.quadraticCurveTo(
                    canvas.width - clearance,
                    canvas.height - clearance,
                    canvas.width - clearance - borderRadius,
                    canvas.height - clearance,
                )
                ctx.lineTo(clearance + borderRadius, canvas.height - clearance)
                ctx.quadraticCurveTo(
                    clearance,
                    canvas.height - clearance,
                    clearance,
                    canvas.height - clearance - borderRadius,
                )
                ctx.lineTo(clearance, clearance + borderRadius)
                ctx.quadraticCurveTo(
                    clearance,
                    clearance,
                    clearance + borderRadius,
                    clearance,
                )
                ctx.closePath()

                ctx.stroke()

                // Увеличиваем угол на величину скорости
                angleRef.current += speed / 1000
                animationRef.current = requestAnimationFrame(draw) // Сохраняем id анимации
            }

            if (isActiveLocal) {
                draw() // Запуск анимации, если isActive true
            } else if (animationRef.current) {
                cancelAnimationFrame(animationRef.current) // Остановка анимации, если isActive false
            }
        }

        setupCanvas()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current) // Остановка анимации при размонтировании
            }
        }
    }, [borderWidthDefault, speed, isActiveLocal]) // Следим за изменением isActive и speed

    useEffect(() => {
        gsap.killTweensOf(canvasRef.current)

        gsap.to(canvasRef.current, {
            opacity: isView ? 1 : 0,
            duration: 1,
            onComplete() {
                !isActive && setIsActiveLocal(false)
            },
            onStart() {
                isActive && setIsActiveLocal(true)
            },
        })
    }, [isView, isActive])

    return (
        <canvas
            className={clsx(
                styles.canvas,
                className,
                isActive && styles.active,
            )}
            style={customStyle}
            ref={canvasRef}
        />
    )
}
