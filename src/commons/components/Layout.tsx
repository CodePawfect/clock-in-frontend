import { SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/commons/components/sidebar/AppSidebar.tsx';

export default function Layout() {
  return (
    <>
      <AppSidebar />
      <main className="flex">
        <SidebarTrigger />
        <Outlet />
      </main>
    </>
  );
}
