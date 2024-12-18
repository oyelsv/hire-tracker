import { formats } from '@/i18n/request';

type Formats = typeof formats;

declare module '*.svg' {
  import { FC, SVGProps } from 'react';

  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module '*.svg?url' {
  const content: any;
  export default content;
}

declare global {
  interface IntlFormats extends Formats {}
}
