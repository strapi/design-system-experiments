import * as React from 'react';

import styled from 'styled-components';

import { GridContext } from './GridContext';
import { Box, BoxProps } from '../Box';
import handleResponsiveValues, { ResponsiveValue } from '../helpers/handleResponsiveValues';

export interface GridProps extends BoxProps {
  gridCols?: number;
  gap?: ResponsiveValue;
}

const GridWrapper = styled(Box)<Required<Pick<GridProps, 'gridCols' | 'gap'>>>`
  display: grid;
  grid-template-columns: repeat(${({ gridCols }) => gridCols}, 1fr);
  ${({ theme, gap }) => handleResponsiveValues('gap', gap, theme)}
`;

export const Grid: React.FC<GridProps> = ({ gap = '0', gridCols = 12, ...props }) => {
  const context = React.useMemo<Required<Pick<GridProps, 'gridCols' | 'gap'>>>(
    () => ({ gap, gridCols }),
    [gap, gridCols],
  );

  return (
    <GridContext.Provider value={context}>
      <GridWrapper gap={gap} gridCols={gridCols} {...props} />
    </GridContext.Provider>
  );
};
