import { describe, expect, test, vi } from 'vitest';
import { useFetchWorkTime } from './useFetchWorkTime';
import { renderHook, waitFor } from '@testing-library/react';

describe('useFetchWorkTime', () => {
  test('should send http get request', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;
    vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:3000');

    const mockedWorkTimesResponse = {
      workTimes: [
        {
          username: 'testuser',
          date: '2025-03-15',
          hoursWorked: 8,
          year: 2025,
          calenderWeek: 11,
          note: 'Testnote',
        },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockedWorkTimesResponse,
    });

    const { result } = renderHook(() => useFetchWorkTime(11, 2025));

    // Initially loading should be true
    expect(result.current.loading).toBe(true);

    // Wait for the async operation to complete and state to update
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/worktimes/11/2025', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    });

    expect(result.current.error).toBe(null);
    expect(result.current.workTimes).toEqual([
      {
        username: 'testuser',
        date: '2025-03-15',
        hoursWorked: 8,
        year: 2025,
        calenderWeek: 11,
        note: 'Testnote',
      },
    ]);

    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });
});
