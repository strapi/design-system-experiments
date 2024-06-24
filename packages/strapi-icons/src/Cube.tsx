import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCube = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 448 512" {...props}>
    <path
      fill="#212134"
      d="M216.3 2c4.8-2.6 10.5-2.6 15.3 0l190.7 104c5.1 2.8 8.3 8.2 8.3 14s-3.2 11.2-8.3 14L231.7 238c-4.8 2.6-10.5 2.6-15.3 0L25.7 134c-5.1-2.8-8.3-8.2-8.3-14s3.2-11.2 8.3-14L216.3 2zM23.7 170l176 96c5.1 2.8 8.3 8.2 8.3 14v216c0 5.6-3 10.9-7.8 13.8s-10.9 3-15.8.3L8.3 414c-5.1-2.8-8.3-8.1-8.3-14V184c0-5.6 3-10.9 7.8-13.8s10.9-3 15.8-.3zm400.7 0c5-2.7 11-2.6 15.8.3s7.8 8.1 7.8 13.8V400c0 5.9-3.2 11.2-8.3 14l-176 96c-5 2.7-11 2.6-15.8-.3s-7.8-8.1-7.8-13.8V280c0-5.9 3.2-11.2 8.3-14l176-96z"
    />
  </svg>
);
export default SvgCube;
