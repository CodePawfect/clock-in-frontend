import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import SignInPage from './features/worktimes/pages/auth/SignInPage.tsx';
import WorkTimePage from './features/worktimes/pages/worktime/WorkTimePage.tsx';

const router = createBrowserRouter([
  { path: '/signin', element: <SignInPage /> },
  { path: '/worktime', element: <WorkTimePage /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
