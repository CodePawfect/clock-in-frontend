import { PropsWithChildren } from 'react';
import { useAuth } from './AuthProvider.tsx';
import { Navigate } from 'react-router-dom';

/**
 * Restricts access to a route based on authentication status.
 * @param children - The child components to be rendered if the user is authenticated.
 */
export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
