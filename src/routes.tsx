import { RouteObject } from 'react-router-dom';
import SignInPage from './pages/SignInPage.tsx';
import WorkTimePage from './pages/WorkTimePage.tsx';
import ProtectedRoute from './features/auth/components/security/ProtectedRoute.tsx';
import HomePage from './pages/HomePage.tsx';
import EventPage from './pages/EventPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import Layout from '@/commons/components/Layout.tsx';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';

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
    element: (
      <ProtectedRoute>
        <SidebarProvider>
          <Layout />
        </SidebarProvider>
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: '/worktimes',
    element: (
      <ProtectedRoute>
        <SidebarProvider>
          <Layout />
        </SidebarProvider>
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <WorkTimePage /> }],
  },
  {
    path: '/events',
    element: (
      <ProtectedRoute>
        <SidebarProvider>
          <Layout />
        </SidebarProvider>
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <EventPage /> }],
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <SidebarProvider>
          <Layout />
        </SidebarProvider>
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <SettingsPage /> }],
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
