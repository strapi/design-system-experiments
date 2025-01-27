import * as React from 'react';

import * as Checkbox from '@radix-ui/react-checkbox';
import { Minus } from '@strapi/icons';
import { styled, useTheme } from 'styled-components';

import { useComposedRefs } from '../../hooks/useComposeRefs';
import { useControllableState } from '../../hooks/useControllableState';
import { useId } from '../../hooks/useId';
import { Box, BoxProps } from '../../primitives/Box';
import { Flex } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';

/* -------------------------------------------------------------------------------------------------
 * CheckIcon
 * -----------------------------------------------------------------------------------------------*/

const CheckIcon = ({ fill, ...props }: BoxProps<'svg'>) => {
  const { colors } = useTheme();

  return (
    <Box
      tag="svg"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill ? colors[fill] : undefined}
      {...props}
    >
      <path d="M29.0613 10.0613L13.0613 26.0613C12.9219 26.2011 12.7563 26.3121 12.574 26.3878C12.3917 26.4635 12.1962 26.5024 11.9988 26.5024C11.8013 26.5024 11.6059 26.4635 11.4235 26.3878C11.2412 26.3121 11.0756 26.2011 10.9363 26.0613L3.93626 19.0613C3.79673 18.9217 3.68605 18.7561 3.61053 18.5738C3.53502 18.3915 3.49615 18.1961 3.49615 17.9988C3.49615 17.8014 3.53502 17.606 3.61053 17.4237C3.68605 17.2414 3.79673 17.0758 3.93626 16.9363C4.07579 16.7967 4.24143 16.686 4.42374 16.6105C4.60604 16.535 4.80143 16.4962 4.99876 16.4962C5.19608 16.4962 5.39147 16.535 5.57378 16.6105C5.75608 16.686 5.92173 16.7967 6.06126 16.9363L12 22.875L26.9388 7.93876C27.2205 7.65697 27.6027 7.49866 28.0013 7.49866C28.3998 7.49866 28.782 7.65697 29.0638 7.93876C29.3455 8.22055 29.5039 8.60274 29.5039 9.00126C29.5039 9.39977 29.3455 9.78197 29.0638 10.0638L29.0613 10.0613Z" />
    </Box>
  );
};

/* -------------------------------------------------------------------------------------------------
 * CheckboxEl
 * -----------------------------------------------------------------------------------------------*/

interface CheckboxElProps extends Checkbox.CheckboxProps {}

type CheckboxElement = HTMLButtonElement;

const CheckboxEl = React.forwardRef<CheckboxElement, CheckboxElProps>(
  ({ defaultChecked, disabled, checked: checkedProp, onCheckedChange, ...props }, forwardedRef) => {
    const checkboxRef = React.useRef<CheckboxElement>(null!);
    const [checked, setChecked] = useControllableState({
      defaultProp: defaultChecked,
      prop: checkedProp,
      onChange: onCheckedChange,
    });

    const composedRefs = useComposedRefs(checkboxRef, forwardedRef);

    return (
      <CheckboxRoot ref={composedRefs} checked={checked} disabled={disabled} onCheckedChange={setChecked} {...props}>
        <CheckboxIndicator disabled={disabled} forceMount>
          {checked === true ? <CheckIcon width="1.6rem" fill={disabled ? 'neutral500' : 'neutral0'} /> : null}
          {checked === 'indeterminate' ? <Minus fill={disabled ? 'neutral500' : 'neutral0'} /> : null}
        </CheckboxIndicator>
      </CheckboxRoot>
    );
  },
);

const CheckboxRoot = styled(Checkbox.Root)`
  background: ${(props) => props.theme.colors.neutral0};
  width: 2rem;
  height: 2rem;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.colors.neutral300};
  position: relative;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  // this ensures the checkbox is always a square even in flex-containers.
  flex: 0 0 2rem;

  &[data-state='checked'],
  &[data-state='indeterminate'] {
    border: 1px solid ${(props) => props.theme.colors.primary600};
    background-color: ${(props) => props.theme.colors.primary600};
  }

  &[data-disabled] {
    border: 1px solid ${(props) => props.theme.colors.neutral300};
    background-color: ${(props) => props.theme.colors.neutral200};
  }

  /* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: -1;
    min-width: 44px;
    min-height: 44px;
  }
`;

const CheckboxIndicator = styled(Checkbox.Indicator)<{ disabled?: boolean }>`
  display: inline-flex;
  pointer-events: auto !important;
  width: 100%;
  height: 100%;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

/* -------------------------------------------------------------------------------------------------
 * Checkbox
 * -----------------------------------------------------------------------------------------------*/

interface CheckboxProps extends CheckboxElProps {}

const CheckboxImpl = React.forwardRef<CheckboxElement, CheckboxProps>(({ children, ...restProps }, forwardedRef) => {
  const labelId = useId(restProps.id);

  if (!children) {
    return <CheckboxEl ref={forwardedRef} {...restProps} />;
  }

  return (
    <Flex gap={2}>
      <CheckboxEl id={labelId} {...restProps} />
      <Typography tag="label" textColor="neutral800" htmlFor={labelId}>
        {children}
      </Typography>
    </Flex>
  );
});

export { CheckboxImpl as Checkbox };
export type { CheckboxProps, CheckboxElProps, CheckboxElement };
