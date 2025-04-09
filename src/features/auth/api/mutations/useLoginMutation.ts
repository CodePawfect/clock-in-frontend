import { useMutation } from '@tanstack/react-query';

/**
 * Interface representing the login credentials.
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Custom hook to handle user login.
 * It uses the `useMutation` hook from React Query to perform a POST request to the login endpoint.
 */
export function useLoginMutation() {
  return useMutation<void, Error, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials): Promise<void> => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      return;
    },
  });
}
