import * as React from 'react';
import type { SVGProps } from 'react';
const SvgUnderline = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#32324D"
      d="M12 17.3c1.99 0 3.9-.74 5.3-2.07a6.9 6.9 0 0 0 2.2-5.01V1h-3v9.22c0 1.13-.47 2.2-1.32 3A4.63 4.63 0 0 1 12 14.48c-1.2 0-2.34-.45-3.18-1.24a4.14 4.14 0 0 1-1.32-3.01V1h-3v9.22a6.9 6.9 0 0 0 2.2 5.01 7.73 7.73 0 0 0 5.3 2.08Zm9.75 2.14H2.25v2.83h19.5v-2.83Z"
    />
  </svg>
);
export default SvgUnderline;
