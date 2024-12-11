'use client';

import { Menu } from 'lucide-react';

import { useCurrentUser } from '@/hooks/useCurrentUser';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

import { UserAvatar } from './UserMenu';

export function Header() {
  const user = useCurrentUser();
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex items-center p-2 pr-3 justify-between bg-card border-b sticky top-0 z-10">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu />
      </Button>
      {user && <UserAvatar {...user} />}
    </div>
  );
}

Header.displayName = 'Header';
