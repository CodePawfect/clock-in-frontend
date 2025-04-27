import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Calendar, Home, PartyPopper } from 'lucide-react';

export default function NavMain() {
  const items = [
    {
      title: 'Home',
      url: '/home',
      icon: Home,
    },
    {
      title: 'Worktimes',
      url: '/worktimes',
      icon: Calendar,
    },
    {
      title: 'Events',
      url: '/events',
      icon: PartyPopper,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
