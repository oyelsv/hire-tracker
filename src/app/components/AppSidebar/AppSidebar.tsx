'use client';

import { useTheme } from 'next-themes';
import { Coffee, LogOut, Moon, Sun } from 'lucide-react';
import { signOut } from 'next-auth/react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-end">
          {theme === 'light' && (
            <Button size="icon" variant="outline" onClick={() => setTheme('dark')}>
              <Moon />
            </Button>
          )}
          {theme === 'dark' && (
            <Button size="icon" variant="outline" onClick={() => setTheme('light')}>
              <Sun />
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-between">
          <Button variant="outline">
            <Coffee />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => signOut()}>
            <LogOut />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
