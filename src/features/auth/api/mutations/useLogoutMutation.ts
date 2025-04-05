import { useMutation } from '@tanstack/react-query';

export function useLogoutMutation() {
  return useMutation<void, Error, void>({
    mutationFn: async (): Promise<void> => {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

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
