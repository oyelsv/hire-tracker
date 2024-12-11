'use client';

import { signOut } from 'next-auth/react';
import { Menu, LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex items-center p-2 justify-between border-b">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => signOut()}>
        <LogOut />
      </Button>
    </div>
  );
}

Header.displayName = 'Header';
