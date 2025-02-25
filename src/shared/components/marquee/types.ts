export interface MarqueeProps {
    speed?: number;
    hoverSpeed?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export type Optionally<T extends object> = {
    [K in keyof T]?: T[K];
}