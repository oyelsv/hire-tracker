import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { LogOut, Settings, Clock, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const menuItemClasses = 'hover:cursor-pointer';

export function UserAvatar({ name, image }: User) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 hover:cursor-pointer border">
          {image && <AvatarImage src={image} alt={name?.charAt(0)} />}
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        {name && <DropdownMenuLabel className="font-medium truncate">👋 {name}</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className={cn('p-0 bg-background', menuItemClasses)}>
            <ToggleGroup type="single" variant="outline" size="sm" className="w-full bg-background">
              <ToggleGroupItem disabled={theme === 'dark'} value="dark" onClick={() => setTheme('dark')}>
                <Moon />
                <span className="text-xs">Dark</span>
              </ToggleGroupItem>
              <ToggleGroupItem disabled={theme === 'light'} value="light" onClick={() => setTheme('light')}>
                <Sun />
                <span className="text-xs">Light</span>
              </ToggleGroupItem>
              <ToggleGroupItem disabled={theme === 'system'} value="system" onClick={() => setTheme('system')}>
                <Monitor />
                <span className="text-xs">System</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
