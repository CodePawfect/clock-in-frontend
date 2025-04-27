import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Calendar, Home, PartyPopper } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NavMain() {
  const items = [
    { title: 'Home', url: '/home', icon: Home },
    { title: 'Worktimes', url: '/worktimes', icon: Calendar },
    { title: 'Events', url: '/events', icon: PartyPopper },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url} className="flex items-center space-x-2">
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
