import { useMemo } from 'react';
import { BadgeCheck, CircleCheck, CircleX, Drum, Phone, Send, Undo2, Video } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Status, StatusEnum } from '@/app/applications/models';

const projectIndicatorStyles: Status = {
  [StatusEnum.Applied]: 'order-0 text-blue-500',
  [StatusEnum.Offer]: 'order-1 text-green-500',
  [StatusEnum.Screening]: 'order-2 text-yellow-500',
  [StatusEnum.Accepted]: 'order-3 text-emerald-200',
  [StatusEnum.Interview]: 'order-4 text-purple-500',
  [StatusEnum.Rejected]: 'order-5 text-red-500',
  [StatusEnum.Final]: 'order-6 text-indigo-500',
  [StatusEnum.Withdrawn]: 'order-7 text-gray-400',
};

export interface ProjectIndicatorProps {
  className?: string;
  status: StatusEnum;
  count: number;
}

export function ProjectIndicator({ className, status, count }: ProjectIndicatorProps) {
  const StatusIcon = useMemo(() => {
    switch (status) {
      case StatusEnum.Applied:
        return Send;
      case StatusEnum.Screening:
        return Phone;
      case StatusEnum.Interview:
        return Video;
      case StatusEnum.Final:
        return Drum;
      case StatusEnum.Offer:
        return BadgeCheck;
      case StatusEnum.Accepted:
        return CircleCheck;
      case StatusEnum.Rejected:
        return CircleX;
      case StatusEnum.Withdrawn:
        return Undo2;
      default:
        return null;
    }
  }, [status]);

  return (
    <div className={cn(projectIndicatorStyles[status], className)}>
      <div className="flex items-center mb-1">
        {StatusIcon && <StatusIcon className="w-4 h-4 mr-1.5" />}
        <span className="grow text-white text-sm">{StatusEnum[status]}</span>
        <span className="flex items-center justify-center w-4 font-semibold text-sm text-current">{count}</span>
      </div>
      <div className={cn('flex w-full h-1 bg-current rounded', count === 0 && 'opacity-25')} />
    </div>
  );
}

ProjectIndicator.displayName = 'ProjectIndicator';
