import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import LoginPage from './features/worktimes/pages/auth/LoginPage.tsx';
import WorkTimePage from './features/worktimes/pages/worktime/WorkTimePage.tsx';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/worktime', element: <WorkTimePage /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
