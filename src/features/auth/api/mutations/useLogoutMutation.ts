import { useMutation } from '@tanstack/react-query';

/**
 * Custom hook to handle user logout.
 * This hook uses the `useMutation` from React Query to perform a logout operation.
 */
export function useLogoutMutation() {
  return useMutation<void, Error, void>({
    mutationFn: async (): Promise<void> => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.status}`);
      }

      return;
    },

    onSuccess: () => {
      console.log('Logout was successful (HttpOnly cookie is invalidated)');
    },

    onError: (error) => {
      console.error('Logout mutation failed:', error.message);
    },
  });
}
