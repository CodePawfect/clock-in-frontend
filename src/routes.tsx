import { RouteObject } from 'react-router-dom';
import SignInPage from './pages/SignInPage.tsx';
import WorkTimePage from './pages/WorkTimePage.tsx';
import ProtectedRoute from './features/auth/components/ProtectedRoute.tsx';

/**
 * Public routes that do not require authentication.
 */
const publicRoutes: RouteObject[] = [
  {
    path: '/signin',
    element: <SignInPage />,
  },
];

/**
 * Protected routes that require authentication.
 */
const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <WorkTimePage />,
  },
  {
    path: '/worktime',
    element: <WorkTimePage />,
  },
];

/**
 * All routes that are used in the application.
 */
export const routes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes.map((route) => ({
    ...route,
    element: <ProtectedRoute>{route.element}</ProtectedRoute>,
  })),
];
