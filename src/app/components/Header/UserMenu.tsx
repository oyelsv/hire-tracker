import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { LogOut, Settings, Clock } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

const menuItemClasses = 'hover:cursor-pointer';

export function UserAvatar({ name, image, email }: User) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 hover:cursor-pointer">
          {image && <AvatarImage src={image} alt={name?.charAt(0)} />}
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {email && (
          <DropdownMenuLabel className="font-medium text-muted-foreground truncate">👋 {email}</DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled className={cn(menuItemClasses)}>
            <Settings />
            <span>Settings</span>
            <DropdownMenuShortcut className="[&_svg]:size-3">
              <Clock />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className={menuItemClasses} onClick={() => signOut()}>
            <LogOut />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
