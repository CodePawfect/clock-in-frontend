import { RouteObject } from 'react-router-dom';
import SignInPage from './features/auth/pages/SignInPage.tsx';
import WorkTimePage from './features/worktimes/pages/WorkTimePage.tsx';
import ProtectedRoute from './features/auth/components/ProtectedRoute.tsx';

const publicRoutes: RouteObject[] = [
  {
    path: '/signin',
    element: <SignInPage />,
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: '/worktime',
    element: <WorkTimePage />,
  },
];

export const routes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes.map((route) => ({
    ...route,
    element: <ProtectedRoute>{route.element}</ProtectedRoute>,
  })),
];
