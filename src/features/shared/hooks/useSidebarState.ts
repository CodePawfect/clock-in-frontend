import {useEffect, useState} from 'react';
import useIsMobile from './useIsMobile';

/**
 * Hook to manage sidebar state including open/closed status and mobile responsiveness
 * @param initialState Optional override for initial open state
 * @returns Object containing isOpen state, toggle function, and close function for mobile
 */
const useSidebarState = (initialState?: boolean) => {
    const isMobile = useIsMobile();

    // By default, sidebar is closed on mobile and open on desktop
    const [isOpen, setIsOpen] = useState(
        initialState !== undefined ? initialState : !isMobile
    );

    // Update isOpen when device type changes (only if initialState wasn't specified)
    useEffect(() => {
        if (initialState === undefined) {
            setIsOpen(!isMobile);
        }
    }, [isMobile, initialState]);

    // Toggle sidebar open/
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Close sidebar only on mobile devices
    const closeSidebarOnMobile = () => {
        if (isMobile) {
            setIsOpen(false);
        }
    };

    return {
        isMobile,
        isOpen,
        toggleSidebar,
        closeSidebarOnMobile
    };
};

export default useSidebarState;