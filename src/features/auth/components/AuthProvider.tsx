import { createContext, PropsWithChildren, useContext, useState } from 'react';
import {
  LoginCredentials,
  useLoginMutation,
} from '../api/mutations/useLoginMutation.ts';
import { useLogoutMutation } from '../api/mutations/useLogoutMutation.ts';
import { User } from '../types/User.ts';
import toast from 'react-hot-toast';
import { ApiError } from '../../../commons/ApiError.ts';

/**
 * AuthContext type that defines the shape of the authentication context.
 */
type AuthContext = {
  handleLogin: (credentials: LoginCredentials) => Promise<void>;
  handleLogout: () => Promise<void>;
  isLoggedIn: boolean;
  loggedInUser: User | null;
};

type AuthProviderProps = PropsWithChildren;
const AuthContext = createContext<AuthContext | undefined>(undefined);

/**
 * AuthProvider component that provides authentication context to its children.
 * @param children - The child components that will have access to the authentication context.
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  /**
   * Handles the login process by calling the login mutation.
   * @param credentials - The login credentials provided by the user.
   */
  async function handleLogin(credentials: LoginCredentials) {
    await loginMutation.mutateAsync(credentials, {
      onSuccess: () => {
        setIsLoggedIn(true);
      },
      onError: (error: ApiError) => {
        if (error.status === 401) {
          toast.error('Invalid username or password');
        }

        if (error.status === 500) {
          toast.error('Server error, please try again later');
        }
      },
    });
  }

  /**
   * Handles the logout process by calling the logout mutation.
   */
  async function handleLogout() {
    await logoutMutation.mutateAsync(undefined, {
      onSuccess: () => {
        setIsLoggedIn(false);
        setUser(null);
      },
      onError: (error: ApiError) => {
        if (error.status === 401) {
          toast.error('You are not logged in');
        }

        if (error.status === 500) {
          toast.error('Server error, please try again later');
        }
      },
    });
  }

  return (
    <AuthContext.Provider
      value={{
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        isLoggedIn: isLoggedIn,
        loggedInUser: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use the authentication context.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
