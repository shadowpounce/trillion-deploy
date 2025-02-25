import { useEffect, useMemo, useState } from "react"

export const useBreakpoints = (breakpoints: string[]) => {
    const [breakpoint, setBreakpoint] = useState(0);

    const bps = useMemo(
        () => [0, ...breakpoints.map((bp) => parseFloat(bp))
            .filter((bp) => !isNaN(bp))
            ],
        [breakpoints]
    );

    const resize = () => {
        const width = window.innerWidth;

        let current = breakpoint;

        for(let bp of bps) {
            if(width >= bp) {
                current = bp;
            }
        }

        if(current !== breakpoint) {
            setBreakpoint(current);
        }
    }

    useEffect(() => {
        resize();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    });

    return breakpoint;
}