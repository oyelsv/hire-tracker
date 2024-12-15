import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';

import { cn, getFlagEmoji, getIntlDateFormat } from '@/lib/utils';

import {
  Application,
  EmploymentTypeEnum,
  StatusEnum,
  WorkTypeEnum,
} from '@/app/[locale]/(protected)/applications/models';

import { Separator } from '@/components/ui/separator';
import { NeonBadge, NeonBadgeProps } from '@/components/NeonBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const wrapperStyles: Record<StatusEnum, string> = {
  [StatusEnum.Applied]: 'before:bg-blue-700/65 dark:before:bg-blue-700/55',
  [StatusEnum.Offer]: 'before:bg-green-700/50 dark:before:bg-green-700/55',
  [StatusEnum.Screening]: 'before:bg-yellow-700/65 dark:before:bg-yellow-700/55',
  [StatusEnum.Accepted]: 'before:bg-emerald-700/35 dark:before:bg-emerald-700/55',
  [StatusEnum.Interview]: 'before:bg-purple-700/45 dark:before:bg-purple-700/55',
  [StatusEnum.Rejected]: 'before:bg-red-700/65 dark:before:bg-red-700/55',
  [StatusEnum.Final]: 'before:bg-indigo-700/65 dark:before:bg-indigo-700/55',
  [StatusEnum.Withdrawn]: 'before:bg-gray-700/65 dark:before:bg-gray-700/55',
};

const statusBadgeStyles: Record<StatusEnum, string> = {
  [StatusEnum.Applied]: 'bg-blue-700/15 text-blue-500',
  [StatusEnum.Offer]: 'bg-green-700/15 text-green-500',
  [StatusEnum.Screening]: 'bg-yellow-700/15 text-yellow-500',
  [StatusEnum.Accepted]: 'bg-emerald-700/15 text-emerald-500',
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
          'bg-card max-w-96 rounded-md dark:border drop-shadow-md relative',
          'before:w-1.5 before:h-[calc(100%+2px)] before:absolute before:left-[-1px] before:top-[-1px]',
          'before:rounded-bl-md before:rounded-tl-md',
        ],
        wrapperStyles[status as StatusEnum]
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
            <h2 className="text-sm font-semibold leading-5 text-foreground line-clamp-2 underline">{position}</h2>
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
            statusBadgeStyles[status as StatusEnum]
          )}
        >
          {StatusEnum[status]}
        </span>
      </div>
      {/* Card content */}
      <div className="flex items-center px-4 space-x-1.5 mt-3">
        {workType !== null && <NeonBadge variant={getWorkTypeBadge(workType)}>{WorkTypeEnum[workType]}</NeonBadge>}
        {workType !== null && employmentType !== null && <Separator className="h-3" orientation="vertical" />}
        {employmentType !== null && (
          <NeonBadge variant={getEmploymentTypeBadge(employmentType)}>{EmploymentTypeEnum[employmentType]}</NeonBadge>
        )}
      </div>
      {/* Card Footer */}
      <div className="flex items-center mt-2 pl-4 pr-3 pb-2">
        <div className="flex items-center space-x-1.5 text-xs pl-0.5">
          <span className="flex items-center space-x-1.5 shrink-0 text-foreground">
            <span className="mt-0.5 font-semibold">
              {/* @TODO add dynamic html-lang */}
              {getIntlDateFormat(new Date(createdAt))}
            </span>
          </span>
          {countryISOCode && (
            <>
              <Separator className="h-3" orientation="vertical" />
              <span className="inline-flex text-sm">{getFlagEmoji(countryISOCode)}</span>
            </>
          )}
          {url && (
            <>
              <Separator className="h-3" orientation="vertical" />
              <Link href={url} target="_blank">
                <LinkIcon className="w-3 h-3 text-blue-500" />
              </Link>
            </>
          )}
        </div>
        {salary?.currency && salary?.amount && (
          <p className="font-bold text-green-600 pl-2 ml-auto">
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
