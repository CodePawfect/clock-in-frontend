import { createContext, PropsWithChildren, useContext } from 'react';

type AuthContext = {
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
};

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthContext | undefined>(undefined);

/**
 * AuthProvider component that provides authentication context to its children.
 * @param children - The child components that will have access to the authentication context.
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  async function handleLogin() {
    //TODO: Implement a real login with http only cookie
  }

  async function handleLogout() {
    //TODO: Implement a real logout with clearing the http only cookie
  }

  return (
    <AuthContext.Provider
      value={{
        handleLogin: handleLogin,
        handleLogout: handleLogout,
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
