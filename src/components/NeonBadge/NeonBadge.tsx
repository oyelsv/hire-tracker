import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Badge, BadgeProps, badgeVariants } from '@/components/ui/badge';

export const neonBadgeVariants = cva(badgeVariants(), {
  variants: {
    variant: {
      default: badgeVariants({ variant: 'default' }),
      secondary: badgeVariants({ variant: 'secondary' }),
      outline: badgeVariants({ variant: 'outline' }),
      destructive: badgeVariants({ variant: 'destructive' }),
      emerald: 'bg-green-700/10 text-green-600 hover:bg-green-700/15',
      sapphire: 'bg-blue-700/10 text-blue-500 hover:bg-green-700/15',
      amethyst: 'bg-purple-700/15 text-purple-500 hover:bg-purple-700/15',
    },
  },
  defaultVariants: {
    variant: 'emerald',
  },
});

export interface NeonBadgeProps extends Omit<BadgeProps, 'variant'>, Partial<VariantProps<typeof neonBadgeVariants>> {}

export function NeonBadge({ variant, className, ...props }: NeonBadgeProps) {
  return (
    <Badge className={cn('py-0.5 px-2 !border-0 font-bold', neonBadgeVariants({ variant }), className)} {...props} />
  );
}

NeonBadge.displayName = 'NeonBadge';
