import { useQuery } from '@tanstack/react-query';
import { User } from '../../types/User.ts';

export interface AuthStatus {
  isAuthenticated: boolean;
  user: User;
}

export function useAuthStatusQuery() {
  return useQuery<AuthStatus, Error>({
    queryKey: ['status'],
    queryFn: async () => {
      const response = await fetch('/api/auth/status', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(
          `Error while retrieving auth status (status: ${response.status})`
        );
      }

      const data: AuthStatus = await response.json();

      return data;
    },
  });
}
