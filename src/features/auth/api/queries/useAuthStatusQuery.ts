import { useQuery } from '@tanstack/react-query';
import { User } from '../../types/User.ts';
import { ApiError } from '../../../../commons/types/ApiError.ts';

/**
 * The authentication status of the user.
 */
export interface AuthStatus {
  isAuthenticated: boolean;
  user: User;
}

/**
 * A hook to retrieve the authentication status of the user.
 * Uses the `/api/auth/me` endpoint to check if the user is authenticated.
 */
export function useAuthStatusQuery() {
  return useQuery<AuthStatus, ApiError>({
    queryKey: ['status'],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/me`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw {
          message: `Retrieving auth status failed with status: ${response.status}`,
          status: response.status,
        } as ApiError;
      }

      const data: AuthStatus = await response.json();

      return data;
    },
  });
}
