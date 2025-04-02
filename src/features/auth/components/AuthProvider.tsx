import { createContext, PropsWithChildren, useContext } from 'react';
import { useLoginMutation } from '../api/mutations/useLoginMutation.ts';
import { useLogoutMutation } from '../api/mutations/useLogoutMutation.ts';

type AuthContext = {
  handleLogin: () => void;
  handleLogout: () => void;
};

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthContext | undefined>(undefined);

/**
 * AuthProvider component that provides authentication context to its children.
 * @param children - The child components that will have access to the authentication context.
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        handleLogin: useLoginMutation,
        handleLogout: useLogoutMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use the AuthContext
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
