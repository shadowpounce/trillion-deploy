import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { createMarquee } from '../../lib';
import { MarqueeProps } from '../../types';
import css from './marquee.module.scss';

interface Props extends MarqueeProps {
    className?: string;
    children: React.ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const Marquee: React.FC<Props> = ({
    className,
    children,
    ...marqueeProps
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const instance = useRef<ReturnType<typeof createMarquee>>();

    useEffect(() => {
        instance.current?.update(marqueeProps);
    }, [marqueeProps]);
    
    useEffect(() => {
        if(contentRef.current) {
            const marquee = createMarquee(contentRef.current, marqueeProps);
            instance.current = marquee;
            return () => marquee.destroy();
        }
    }, []);
    
    return (    
        <div className={clsx(
            css.root,
            css['root_' + marqueeProps.direction || 'up'],
            className
        )}>
            <div 
                className={css.content}
                ref={contentRef}
            >
                {[1,2].map((index) => (
                    <div 
                        className={css.content_item}
                        key={index}
                    >
                        <div className={css.block}>
                            {children}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}