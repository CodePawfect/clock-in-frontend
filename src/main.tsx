import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import SignInPage from './features/auth/pages/SignInPage.tsx';
import WorkTimePage from './features/worktimes/pages/WorkTimePage.tsx';

const router = createBrowserRouter([
  { path: '/signin', element: <SignInPage /> },
  { path: '/worktime', element: <WorkTimePage /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
