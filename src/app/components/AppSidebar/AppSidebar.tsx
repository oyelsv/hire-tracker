'use client';

import { useTheme } from 'next-themes';
import { signOut } from 'next-auth/react';
import { Coffee, Linkedin, Github, LogOut, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

import { useCurrentUser } from '@/hooks/useCurrentUser';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button, buttonVariants } from '@/components/ui/button';

import packageJson from '../../../../package.json';

export function AppSidebar() {
  const user = useCurrentUser();
  const { theme, setTheme } = useTheme();

  return (
    /* @TODO: make Sidebar floating */
    <Sidebar>
      <SidebarHeader>
        <div className="flex w-full items-center pl-2">
          <div>Logo</div>
          <div className="ml-auto">
            {theme === 'light' && (
              <Button size="icon" variant="outline" onClick={() => setTheme('dark')}>
                <Moon />
              </Button>
            )}
            {theme === 'dark' && (
              <Button size="icon" variant="ghost" onClick={() => setTheme('light')}>
                <Sun />
              </Button>
            )}
          </div>
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
        <div>
          <small className="text-xs font-medium leading-none">
            <span className="after:content-['\a0']">Developed by:</span>
            <a href="mailto:oyelsv@gmail.com" className="underline">
              Oleksandr Yeliseev
            </a>
          </small>
          <div className="">
            <span className="text-sm">My socials:</span>
            <div className="flex gap-x-1 mt-1">
              <Link
                target="_blank"
                href="https://github.com/oyelsv"
                className={buttonVariants({ variant: 'secondary', size: 'icon' })}
              >
                <Github />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/oyelsv/"
                className={buttonVariants({ variant: 'secondary', size: 'icon' })}
              >
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>
        <SidebarSeparator />
        <div>
          <Link
            href="https://github.com/oyelsv/hire-tracker/releases"
            target="_blank"
            className="text-xs text-muted-foreground"
          >
            Version: <span className="underline">{packageJson.version}</span>
          </Link>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" size="icon">
            <Coffee />
          </Button>
          {user && (
            <Button variant="ghost" size="icon" onClick={() => signOut()}>
              <LogOut />
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
