import { beforeEach, describe, expect, test, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { renderHook, waitFor } from '@testing-library/react';
import createQueryClientProviderWrapper from '../../../test-utils/QueryClientProviderWrapper.tsx';
import { useWorkTimesQuery } from './useWorkTimesQuery.ts';

const fetchMocker = createFetchMock(vi);

describe('test useWorkTimesQuery hook', () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  test('should success', async () => {
    const expectedUrl = 'http://localhost:3000/api/worktimes/15/2025';
    const expectedMethod = 'GET';
    const week = 15;
    const year = 2025;

    fetchMock.mockResponseOnce(JSON.stringify({ workTimes: [] }), {
      status: 200,
    });

    const { result } = renderHook(() => useWorkTimesQuery(week, year), {
      wrapper: createQueryClientProviderWrapper(),
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetchMock.requests()[0].url).toEqual(expectedUrl);
    expect(fetchMock.requests()[0].method).toEqual(expectedMethod);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual([]);
  });
});
