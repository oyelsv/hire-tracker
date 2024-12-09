'use client';

import { signOut } from 'next-auth/react';
import { Menu, LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <div className="flex items-center p-2 justify-between border-b">
      <Button variant="ghost" size="icon">
        <Menu />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => signOut()}>
        <LogOut />
      </Button>
    </div>
  );
}

Header.displayName = 'Header';
