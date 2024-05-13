import * as React from 'react';

import { styled } from 'styled-components';

import { Flex } from '../Flex';
import { RawTh, RawTd, RawTdProps } from '../RawTable/RawCell';

const CellWrapper = styled(RawTd)`
  vertical-align: middle;
  text-align: left;
  color: ${({ theme }) => theme.colors.neutral600};
  outline-offset: -4px;

  /**
  * Hack to make sure the checkbox looks aligned
  */
  input {
    vertical-align: sub;
  }
`;

export interface ThProps extends RawTdProps {
  children: React.ReactNode;
  /**
   * @deprecated just pass everything as children.
   */
  action?: React.ReactNode;
}

export const Th = ({ children, action, ...props }: ThProps) => {
  return (
    <CellWrapper as={RawTh} {...props}>
      <Flex>
        {children}
        {action}
      </Flex>
    </CellWrapper>
  );
};

export const Td = ({ children, ...props }: RawTdProps) => {
  return <CellWrapper {...props}>{children}</CellWrapper>;
};
