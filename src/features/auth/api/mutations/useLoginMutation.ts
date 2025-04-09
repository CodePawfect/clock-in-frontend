import { useMutation } from '@tanstack/react-query';
import { ApiError } from '../../../../commons/ApiError.ts';

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
  return useMutation<void, ApiError, LoginCredentials>({
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
        throw {
          message: `Login failed with status: ${response.status}`,
          status: response.status,
        } as ApiError;
      }

      return;
    },
  });
}
