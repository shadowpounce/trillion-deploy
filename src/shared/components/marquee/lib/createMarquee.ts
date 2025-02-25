import { Optionally } from "../types";
import { MarqueeProps } from "../types";

export const createMarquee = (
    element: HTMLElement,
    props: MarqueeProps
) => {
    const position = { x: 0, y: 0 };
    let isHover = false;

    const params = {
        speed: props.speed || 1,
        hoverSpeed: props.hoverSpeed || 1,
        direction: props.direction || 'right'
    }

    let raf = -1;
    let now = performance.now();

    const onHover = () => {
        isHover = true;
    }

    const onLeave = () => {
        isHover = false;
    }

    const draw = () => {
        element.style.transform = `translate3d(${-position.x}px, ${-position.y}px, 0)`;
    };

    const checkVisible = () => {
        const { top: elTop, height: elHeight } = element.getBoundingClientRect();

        return elTop + elHeight > 0 && elTop < window.innerHeight
    }

    const update = (timestamp: number) => {
        if(timestamp - now < (1000 / 90)) return;

        now = timestamp;

        const width = element.scrollWidth;
        const height = element.scrollHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        
        const speed = isHover ? params.hoverSpeed : params.speed;
        
        if (params.direction === 'up') {
            position.y += speed;

            if(position.y >= centerY) {
                position.y = 0;
            }
        } 
        
        else if (params.direction === 'down') {
            position.y -= speed;

            if(position.y <= 0) {
                position.y = centerY;
            }
        } 

        else if(params.direction === 'left') {
            position.x += speed;

            if(position.x >= centerX) {
                position.x = 0;
            }
        } 
        
        else {
            position.x -= speed;

            if(position.x <= 0) {
                position.x = centerX;
            }
        }
    };

    const tick = (timestamp: number) => {
        if(checkVisible()) {
            update(timestamp);
            draw();
        }

        raf = requestAnimationFrame(tick);
    };

    const init = () => {
        element.addEventListener("mouseenter", onHover);
        element.addEventListener("mouseleave", onLeave);

        raf = requestAnimationFrame(tick);
    }

    const destroy = () => {
        element.removeEventListener("mouseenter", onHover);
        element.removeEventListener("mouseleave", onLeave);

        cancelAnimationFrame(raf);

        raf = -1;
    }

    init();

    return {
        update(config: Optionally<MarqueeProps>) {
            params.speed = config?.speed || params.speed;
            params.hoverSpeed = config?.hoverSpeed || params.hoverSpeed;
            params.direction = config?.direction || params.direction
        },
        destroy
    };
};
