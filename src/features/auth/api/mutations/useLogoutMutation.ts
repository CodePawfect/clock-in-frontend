import { useMutation } from '@tanstack/react-query';
import { ApiError } from '../../../../commons/types/ApiError.ts';

/**
 * Custom hook to handle user logout.
 * This hook uses the `useMutation` from React Query to perform a logout operation.
 */
export function useLogoutMutation() {
  return useMutation<void, ApiError, void>({
    mutationFn: async (): Promise<void> => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw {
          message: `Logout failed with status: ${response.status}`,
          status: response.status,
        } as ApiError;
      }

      return;
    },
  });
}
