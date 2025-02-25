"use client"

import {useWindowSize} from "@uidotdev/usehooks"
import clsx from "clsx"
import React, {FC, useEffect, useMemo, useRef, useState} from "react"

import styles from "./index.module.scss"

interface ICanvasGrid {
    element?: React.RefObject<HTMLElement>
    isActive: boolean // для активации анимации
}

type Square = {
    x: number
    y: number
    opacity: number
    flickerSpeed: number
}

export const CanvasGrid: FC<ICanvasGrid> = ({element, isActive}) => {
    const refCanvas = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number | null>(null)
    const [currentOpacity, setCurrentOpacity] = useState(1) // начальная прозрачность для плавного появления
    const [squares, setSquares] = useState<Square[]>([]) // состояние для квадратов
    const [squareSize, setSquareSize] = useState<number>(0)
    const [gap, setGap] = useState<number>(0)

    const windowSize = useWindowSize()

    useEffect(() => {
        if (windowSize.width) {
            setSquareSize(windowSize.width * 0.002)
            setGap(windowSize.width * 0.0042)
        }
    }, [windowSize])

    useEffect(() => {
        const handleResize = () => {
            if (refCanvas.current && squareSize && gap) {
                let target: HTMLElement

                // Определяем родительский элемент для размера канваса
                if (element?.current) target = element.current
                else target = refCanvas.current.parentElement as HTMLDivElement

                const canvas = refCanvas.current
                const context = canvas.getContext("2d")

                const w = target.clientWidth // ширина родителя
                const h = target.clientHeight // высота родителя
                canvas.width = w
                canvas.height = h

                // Генерация сетки квадратов
                const newSquares: Square[] = []
                for (let x = 0; x < w; x += squareSize + gap) {
                    for (let y = 0; y < h; y += squareSize + gap) {
                        newSquares.push({
                            x,
                            y,
                            opacity: Math.random() * 0.2 + 0.2, // начальная прозрачность от 0.2 до 1
                            flickerSpeed: Math.random() * 0.02 + 0.01, // случайная скорость мигания
                        })
                    }
                }
                setSquares(newSquares) // сохраняем квадраты в состоянии
            }
        }

        if (refCanvas.current) {
            handleResize() // устанавливаем размеры при монтировании

            // Обработчик изменения размера экрана
            window.addEventListener("resize", handleResize)
        }

        return () => {
            window.removeEventListener("resize", handleResize) // очищаем обработчик
        }
    }, [element, squareSize, gap])

    useEffect(() => {
        const canvas = refCanvas.current
        const context = canvas?.getContext("2d")

        const drawGrid = () => {
            if (context && canvas) {
                context.clearRect(0, 0, canvas.width, canvas.height)

                squares.forEach((square) => {
                    // Мигание прозрачности
                    square.opacity += square.flickerSpeed
                    if (square.opacity > 1 || square.opacity < 0.2) {
                        square.flickerSpeed *= -1 // Инвертируем скорость при достижении границ прозрачности
                    }

                    // Используем текущую прозрачность
                    context.beginPath()
                    context.rect(square.x, square.y, squareSize, squareSize)
                    context.fillStyle = `rgba(255, 255, 255, ${square.opacity * currentOpacity})` // Синий квадрат с текущей прозрачностью
                    context.fill()
                    context.closePath()
                })
            }
        }

        const animate = () => {
            if (isActive) {
                // Проверка, активен ли компонент
                drawGrid()
                animationRef.current = requestAnimationFrame(animate)
            }
        }

        if (isActive) {
            // Запускаем анимацию, если isActive
            animationRef.current = requestAnimationFrame(animate)
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current) // Останавливаем анимацию при размонтировании
            }
        }
    }, [squares, currentOpacity, squareSize, gap, isActive])

    // Эффект для плавного изменения прозрачности при активации/деактивации
    // useEffect(() => {
    //     if (isActive) {
    //         // Плавное появление
    //         const fadeIn = setInterval(() => {
    //             setCurrentOpacity((prev) => {
    //                 if (prev < 1) {
    //                     return Math.min(1, prev + 0.05) // Увеличиваем, но не больше 1
    //                 } else {
    //                     clearInterval(fadeIn) // Останавливаем таймер
    //                     return 1
    //                 }
    //             })
    //         }, 50) // каждые 50ms увеличиваем прозрачность

    //         return () => clearInterval(fadeIn) // очистка таймера при изменении isActive
    //     } else {
    //         // Плавное исчезновение
    //         const fadeOut = setInterval(() => {
    //             setCurrentOpacity((prev) => {
    //                 if (prev > 0) {
    //                     return Math.max(0, prev - 0.05) // Уменьшаем, но не меньше 0
    //                 } else {
    //                     clearInterval(fadeOut) // Останавливаем таймер
    //                     return 0
    //                 }
    //             })
    //         }, 50) // каждые 50ms уменьшаем прозрачность

    //         return () => clearInterval(fadeOut) // очистка таймера при изменении isActive
    //     }
    // }, [isActive])

    return (
        <canvas
            className={clsx(styles.CanvasGrid, isActive && styles.active)}
            ref={refCanvas}
        />
    )
}
