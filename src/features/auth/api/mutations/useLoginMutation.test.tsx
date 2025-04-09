import { beforeEach, describe, expect, test, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { renderHook, waitFor } from '@testing-library/react';
import { LoginCredentials, useLoginMutation } from './useLoginMutation.ts';
import createQueryClientProviderWrapper from '../../../../test-utils/QueryClientProviderWrapper.tsx';

const fetchMocker = createFetchMock(vi);

describe('test useLoginMutation hook', () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  test('should send correct POST request', async () => {
    const credentials: LoginCredentials = {
      username: 'testuser',
      password: 'testpassword',
    };

    const expectedUrl = 'http://localhost:3000/api/auth/login';
    const expectedMethod = 'POST';
    const expectedBody = JSON.stringify(credentials);

    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: createQueryClientProviderWrapper(),
    });

    result.current.mutate(credentials);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    expect(fetchMock.requests()[0].url).toEqual(expectedUrl);
    expect(fetchMock.requests()[0].method).toEqual(expectedMethod);

    const requestBody = await fetchMock.requests()[0].text();
    expect(requestBody).toEqual(expectedBody);
  });
});
