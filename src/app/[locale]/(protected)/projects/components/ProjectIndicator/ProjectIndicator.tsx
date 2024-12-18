import { BadgeCheck, CircleCheck, CircleX, Drum, Phone, Send, Undo2, Video } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { cn } from '@/lib/utils';

import { Status, StatusEnum } from '@/app/[locale]/(protected)/applications/models';

const projectIndicatorStyles: Status = {
  [StatusEnum.Applied]: 'order-0 text-blue-500',
  [StatusEnum.Offer]: 'order-1 text-green-500',
  [StatusEnum.Screening]: 'order-2 text-yellow-500',
  [StatusEnum.Accepted]: 'order-3 text-emerald-300',
  [StatusEnum.Interview]: 'order-4 text-purple-500',
  [StatusEnum.Rejected]: 'order-5 text-red-500',
  [StatusEnum.Final]: 'order-6 text-indigo-500',
  [StatusEnum.Withdrawn]: 'order-7 text-gray-400',
};

export interface ProjectIndicatorProps {
  status: StatusEnum;
  count: number;
  locale: string;
}

function StatusIcon(status: StatusEnum) {
  const className = 'w-4 h-4 mr-1.5 shrink-0';

  switch (status) {
    case StatusEnum.Applied:
      return <Send className={className} />;
    case StatusEnum.Screening:
      return <Phone className={className} />;
    case StatusEnum.Interview:
      return <Video className={className} />;
    case StatusEnum.Final:
      return <Drum className={className} />;
    case StatusEnum.Offer:
      return <BadgeCheck className={className} />;
    case StatusEnum.Accepted:
      return <CircleCheck className={className} />;
    case StatusEnum.Rejected:
      return <CircleX className={className} />;
    case StatusEnum.Withdrawn:
      return <Undo2 className={className} />;
    default:
      return null;
  }
}

export async function ProjectIndicator({ locale, status, count }: ProjectIndicatorProps) {
  const t = await getTranslations({ locale, namespace: 'projects.card.status' });

  return (
    <div className={cn(projectIndicatorStyles[status])}>
      <div className="flex items-center mb-1.5 pl-0.5">
        {StatusIcon(status)}
        {/* @TODO: fix ts error */}
        {/* @ts-ignore */}
        <span className="grow text-foreground text-xs truncate">{t(StatusEnum[status].toLowerCase())}</span>
        <span className="flex items-center justify-center font-semibold text-xs text-current px-1">{count}</span>
      </div>
      <div className={cn('flex w-full h-1 bg-current rounded-full', count === 0 && 'opacity-25')} />
    </div>
  );
}

ProjectIndicator.displayName = 'ProjectIndicator';
