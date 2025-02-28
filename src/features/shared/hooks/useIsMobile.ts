import { useState, useEffect } from 'react';

/**
 * Simple hook to check if the current viewport is mobile sized
 * @param breakpoint The width in pixels to consider as "mobile" (default: 550)
 * @returns Boolean indicating if the viewport is mobile size
 */
export const useIsMobile = (breakpoint = 550) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;