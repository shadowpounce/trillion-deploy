import {useEffect} from "react"

export function useCustomScroll() {
    useEffect(() => {
        let ticking = false // Флаг для управления `requestAnimationFrame`
        let lastScrollY = 0 // Текущая позиция прокрутки
        const scrollSpeed = 20 // Скорость прокрутки (чем меньше значение, тем медленнее)

        const onScroll = (event: WheelEvent) => {
            event.preventDefault() // Отключаем стандартное поведение
            const delta = event.deltaY // Дельта прокрутки

            if (!ticking) {
                ticking = true
                requestAnimationFrame(() => {
                    // Обновляем позицию вручную
                    lastScrollY += Math.sign(delta) * scrollSpeed
                    window.scrollTo(0, lastScrollY)
                    ticking = false
                })
            }
        }

        // Подключаем обработчик
        window.addEventListener("wheel", onScroll, {passive: false})

        return () => {
            // Очищаем обработчик при размонтировании
            window.removeEventListener("wheel", onScroll)
        }
    }, [])
}
