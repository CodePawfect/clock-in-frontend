import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import * as isMobileModule from './useIsMobile';
import useSidebarState from './useSidebarState';

describe('useSidebarState', () => {
  // Create a mock for the useIsMobile hook
  vi.mock('./useIsMobile', () => ({
    default: vi.fn(),
  }));

  it('defaults to open on desktop', () => {
    vi.mocked(isMobileModule.default).mockReturnValue(false);

    const { result } = renderHook(() => useSidebarState());

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isOpen).toBe(true);
  });

  it('defaults to closed on mobile', () => {
    vi.mocked(isMobileModule.default).mockReturnValue(true);

    const { result } = renderHook(() => useSidebarState());

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isOpen).toBe(false);
  });

  it('respects initialState when provided', () => {
    vi.mocked(isMobileModule.default).mockReturnValue(true);

    const { result } = renderHook(() => useSidebarState(true));

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isOpen).toBe(true);
  });

  it('toggleSidebar switches isOpen state', () => {
    vi.mocked(isMobileModule.default).mockReturnValue(false);

    const { result } = renderHook(() => useSidebarState());

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('updates isOpen when device type changes', () => {
    vi.mocked(isMobileModule.default).mockReturnValue(false);

    const { result, rerender } = renderHook(() => useSidebarState());

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isOpen).toBe(true);

    // Switch to mobile and trigger the effect
    vi.mocked(isMobileModule.default).mockReturnValue(true);
    rerender();

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isOpen).toBe(false);
  });
});
