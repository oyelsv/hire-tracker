import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

import { cn, getFlagEmoji, getIntlDateFormat } from '@/lib/utils';

import { Application, EmploymentTypeEnum, StatusEnum, WorkTypeEnum } from '@/app/applications/models';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { NeonBadge, NeonBadgeProps } from '@/components/NeonBadge';

const wrapperStyles = {
  [StatusEnum.Applied]: 'before:bg-blue-700/15',
  [StatusEnum.Offer]: 'before:bg-green-700/15',
  [StatusEnum.Screening]: 'before:bg-yellow-700/15',
  [StatusEnum.Accepted]: 'before:bg-emerald-700/15',
  [StatusEnum.Interview]: 'before:bg-purple-700/15',
  [StatusEnum.Rejected]: 'before:bg-red-700/15',
  [StatusEnum.Final]: 'before:bg-indigo-700/15',
  [StatusEnum.Withdrawn]: 'before:bg-gray-700/15',
};

const statusBadgeStyles = {
  [StatusEnum.Applied]: 'bg-blue-700/15 text-blue-500',
  [StatusEnum.Offer]: 'bg-green-700/15 text-green-500',
  [StatusEnum.Screening]: 'bg-yellow-700/15 text-yellow-500',
  [StatusEnum.Accepted]: 'bg-emerald-700/15 text-emerald-200',
  [StatusEnum.Interview]: 'bg-purple-700/15 text-purple-500',
  [StatusEnum.Rejected]: 'bg-red-700/15 text-red-500',
  [StatusEnum.Final]: 'bg-indigo-700/15 text-indigo-500',
  [StatusEnum.Withdrawn]: 'bg-gray-700/15 text-gray-400',
};

const getWorkTypeBadge = (workType: WorkTypeEnum | null | undefined): NeonBadgeProps['variant'] => {
  switch (workType) {
    case WorkTypeEnum.Remote:
      return 'emerald';
    case WorkTypeEnum.Onsite:
      return 'sapphire';
    case WorkTypeEnum.Hybrid:
      return 'amethyst';
    default:
      return null;
  }
};

const getEmploymentTypeBadge = (employmentType: EmploymentTypeEnum | null | undefined): NeonBadgeProps['variant'] => {
  switch (employmentType) {
    case EmploymentTypeEnum.FullTime:
      return 'emerald';
    case EmploymentTypeEnum.PartTime:
      return 'sapphire';
    case EmploymentTypeEnum.Contract:
      return 'amethyst';
    default:
      return null;
  }
};

export function ApplicationPreviewCard({
  // id,
  company,
  position,
  createdAt,
  status,
  employmentType = null,
  url,
  countryISOCode,
  workType = null,
  salary,
}: Application) {
  return (
    <div
      className={cn(
        [
          'bg-zinc-900/95 max-w-96 rounded-md drop-shadow relative',
          'before:w-1.5 before:h-full before:absolute before:left-0 before:top-0',
          'before:rounded-bl-md before:rounded-tl-md',
        ],
        wrapperStyles[status]
      )}
    >
      {/* Card Header */}
      <div className="flex pl-4">
        <div className="flex grow gap-x-3 pt-3 pr-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{company?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grow">
            {/* @TODO: use Link here */}
            <h2 className="text-sm font-semibold leading-5 text-white line-clamp-2 underline">{position}</h2>
            <p className="text-xs font-bold text-muted-foreground mt-1 line-clamp-1">{company?.name}</p>
          </div>
        </div>
        <span
          className={cn(
            [
              'inline-flex items-center px-2 py-0.5 rounded-bl-lg rounded-tr-md text-xs font-semibold',
              'shrink-0 self-baseline',
              'before:w-1.5 before:h-1.5 before:mr-1 before:rounded-full before:bg-current',
            ],
            statusBadgeStyles[status]
          )}
        >
          {StatusEnum[status]}
        </span>
      </div>
      {/* Card content */}
      <div className="flex items-center px-4 space-x-1.5 mt-3">
        {workType !== null && <NeonBadge variant={getWorkTypeBadge(workType)}>{WorkTypeEnum[workType]}</NeonBadge>}
        {workType !== null && employmentType !== null && (
          <Separator className="h-3 bg-border/35" orientation="vertical" />
        )}
        {employmentType !== null && (
          <NeonBadge variant={getEmploymentTypeBadge(employmentType)}>{EmploymentTypeEnum[employmentType]}</NeonBadge>
        )}
      </div>
      {/* Card Footer */}
      <div className="flex items-center mt-2 pl-4 pr-3 pb-2">
        <div className="flex items-center space-x-1.5 text-xs pl-0.5">
          <span className="flex items-center space-x-1.5 shrink-0 text-white">
            <span className="mt-0.5 font-semibold">
              {/* @TODO add dynamic html-lang */}
              {getIntlDateFormat(new Date(createdAt))}
            </span>
          </span>
          {countryISOCode && (
            <>
              <Separator className="h-3 bg-border/35" orientation="vertical" />
              <span className="inline-flex text-sm">{getFlagEmoji(countryISOCode)}</span>
            </>
          )}
          {url && (
            <>
              <Separator className="h-3 bg-border/35" orientation="vertical" />
              <Link href={url} target="_blank">
                <LinkIcon className="w-3 h-3 text-blue-500" />
              </Link>
            </>
          )}
        </div>
        {salary?.currency && salary?.amount && (
          <p className="font-bold text-green-500 pl-2 ml-auto">
            {/* @TODO add dynamic html-lang */}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: salary.currency,
              minimumFractionDigits: 0,
            }).format(salary.amount)}
          </p>
        )}
      </div>
    </div>
  );
}

ApplicationPreviewCard.displayName = 'ApplicationPreviewCard';