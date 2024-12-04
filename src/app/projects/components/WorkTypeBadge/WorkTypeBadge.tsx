import { cn } from '@/lib/utils';

import { WorkType, WorkTypeEnum } from '@/app/applications/models';

const workTypeBadgeStyles: WorkType = {
  [WorkTypeEnum.Onsite]: 'bg-blue-700/10 text-blue-700',
  [WorkTypeEnum.Hybrid]: 'bg-purple-700/15 text-purple-500',
  [WorkTypeEnum.Remote]: 'bg-green-700/15 text-green-500',
};

export function WorkTypeBadge({ type }: { type: WorkTypeEnum }) {
  return (
    <div className={cn('inline-flex py-1 px-2 rounded-full text-xs font-semibold', workTypeBadgeStyles[type])}>
      {WorkTypeEnum[type]}
    </div>
  );
}

WorkTypeBadge.displayName = 'WorkTypeBadge';
