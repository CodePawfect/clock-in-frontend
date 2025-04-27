import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar.tsx';
import NavUser from '@/commons/components/sidebar/NavUser.tsx';
import NavMain from '@/commons/components/sidebar/NavMain.tsx';
import NavSecondary from '@/commons/components/sidebar/NavSecondary.tsx';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="text-2xl font-bold">Clock:In</SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
