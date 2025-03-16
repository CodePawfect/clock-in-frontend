import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../store/authSlice.ts';
import { User } from '../types/User.ts';

/**
 * Custom hook for handling user authentication
 */
export const useLogin = () => {
  const dispatch = useDispatch();
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
  const loginApiUrl = `${baseApiUrl}/api/auth/login`;

  /**
   * Authenticates a user
   */
  const login = async (username: string, password: string): Promise<void> => {
    dispatch(loginStart());

    const response = await fetch(loginApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(loginFailure(errorData.error || errorData.message));
      return;
    }

    const user: User = await response.json();
    dispatch(loginSuccess(user));
  };

  return { login };
};
