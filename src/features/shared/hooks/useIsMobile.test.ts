import { describe, it, expect, afterAll, vi } from 'vitest';
import { renderHook } from "@testing-library/react";
import { act } from "react";
import useIsMobile from "./useIsMobile";

describe('useIsMobile', () => {
    const originalInnerWidth = window.innerWidth;

    // Restore original window properties after all tests
    afterAll(() => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: originalInnerWidth
        });
    });

    it('should return true when window width is less than breakpoint', () => {
        // Mock window.innerWidth
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 500
        });
        const {result} = renderHook(() => useIsMobile(720));
        expect(result.current).toBe(true);
    });

    it('should return false when window width is greater than breakpoint', () => {
        // Mock window.innerWidth
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024
        });
        const {result} = renderHook(() => useIsMobile(720));
        expect(result.current).toBe(false);
    });

    it('should update value when window is resized', () => {
        // Start with desktop size
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024
        });
        const {result} = renderHook(() => useIsMobile(720));
        expect(result.current).toBe(false);

        // Simulate resize event to mobile size
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                value: 500
            });
            // Dispatch resize event
            window.dispatchEvent(new Event('resize'));
        });
        expect(result.current).toBe(true);
    });

    it('should use the default breakpoint when none is provided', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 700
        });
        const {result} = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
    });

    it('should use default breakpoint (720px) when called without arguments', () => {
        // Set window width to 700px (below default breakpoint)
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 700
        });
        // Call hook the same way you do in your components (no arguments)
        const {result} = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);

        // Change window width and simulate resize event
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                value: 800
            });
            // Trigger resize event
            window.dispatchEvent(new Event('resize'));
        });
        // Now check the same hook instance with the new window size
        expect(result.current).toBe(false);
    });

    it('should clean up event listener on unmount', () => {
        // Spy on addEventListener and removeEventListener - use vi instead of jest
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

        const {unmount} = renderHook(() => useIsMobile());

        // Verify addEventListener was called with 'resize'
        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

        // Unmount the component
        unmount();

        // Verify removeEventListener was called with 'resize'
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

        // Clean up spies
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });
});
