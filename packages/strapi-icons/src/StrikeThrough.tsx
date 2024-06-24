import * as React from 'react';
import type { SVGProps } from 'react';
const SvgStrikeThrough = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#32324D"
      d="M16.39 2.17c.68.1 1.17.2 1.46.39.39.2.58.39.78.58.2.3.3.78.39 1.18l.78 3.5h1.95V1H2.84l-.59 6.83H4l.98-3.9a5 5 0 0 1 .39-.98c.2-.2.49-.39.88-.58.39-.1.88-.3 1.56-.3.58 0 1.36-.1 2.34-.1v8.78h-7.8v1.95h7.8v7.41c0 .2.1.3-.1.39-.2.1-.39.2-.88.2l-2.04.39-.1 1.36h9.94l-.1-1.36-2.04-.3c-.49 0-.69-.1-.78-.2-.2-.09-.1-.19-.1-.38V12.7h7.8v-1.95h-7.8V1.97c.98 0 1.85.1 2.44.2Z"
    />
  </svg>
);
export default SvgStrikeThrough;
