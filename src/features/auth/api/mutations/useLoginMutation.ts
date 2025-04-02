import { useMutation } from '@tanstack/react-query';

interface LoginCredentials {
  username: string;
  password: string;
}

export function useLoginMutation() {
  return useMutation<void, Error, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials): Promise<void> => {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      return;
    },

    onSuccess: () => {
      console.log('Login successful (HttpOnly cookie is set)');
    },

    onError: (error) => {
      console.error('Login mutation failed:', error.message);
    },
  });
}
