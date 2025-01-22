import * as React from 'react';

import { CaretDown, Cross } from '@strapi/icons';
import { Select } from '@strapi/ui-primitives';
import { styled, css } from 'styled-components';

import { useComposedRefs } from '../../hooks/useComposeRefs';
import { Box, BoxComponent, BoxProps } from '../../primitives/Box';
import { Flex, FlexComponent } from '../../primitives/Flex';
import { Typography, TypographyComponent, TypographyProps } from '../../primitives/Typography';
import { ANIMATIONS } from '../../styles/motion';
import { inputFocusStyle } from '../../themes';
import { ScrollArea } from '../../utilities/ScrollArea';
import { Field, useField } from '../Field';

/* -------------------------------------------------------------------------------------------------
 * SelectTrigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerSize = 'S' | 'M';

interface TriggerProps extends BoxProps<'div'>, Pick<Field.InputProps, 'name' | 'id'> {
  /**
   * @default "Clear"
   */
  clearLabel?: string;
  disabled?: boolean;
  hasError?: boolean;
  onClear?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  /**
   * @default "M"
   */
  size?: TriggerSize;
  startIcon?: React.ReactElement;
  withTags?: boolean;
}

const SelectTrigger = React.forwardRef<HTMLDivElement, TriggerProps>(
  (
    { onClear, clearLabel = 'Clear', startIcon, disabled, hasError, children, id, size = 'M', withTags, ...restProps },
    ref,
  ) => {
    const triggerRef = React.useRef<HTMLSpanElement>(null!);

    const handleClearClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
      if (onClear && !disabled) {
        onClear(e);
        triggerRef.current.focus();
      }
    };

    const { labelNode } = useField('SelectTrigger');

    const composedRefs = useComposedRefs(triggerRef, ref);

    return (
      <Select.Trigger asChild>
        <StyledTrigger
          aria-disabled={disabled}
          $hasError={hasError}
          ref={composedRefs}
          alignItems="center"
          justifyContent="space-between"
          position="relative"
          overflow="hidden"
          hasRadius
          background={disabled ? 'neutral150' : 'neutral0'}
          gap={4}
          cursor="default"
          aria-labelledby={labelNode ? `${id}-label` : undefined}
          $size={size}
          $withTags={withTags}
          {...restProps}
        >
          <Flex flex="1" tag="span" gap={3}>
            {/* TODO: make this composable in v2 – <Select.Icon /> */}
            {startIcon && (
              <Flex tag="span" aria-hidden>
                {startIcon}
              </Flex>
            )}
            {children}
          </Flex>
          <Flex tag="span" gap={3}>
            {onClear ? (
              <IconBox
                tag="button"
                hasRadius
                background="transparent"
                role="button"
                tabIndex={0}
                onClick={handleClearClick}
                aria-disabled={disabled}
                aria-label={clearLabel}
                title={clearLabel}
                cursor="pointer"
              >
                <Cross />
              </IconBox>
            ) : null}
            <DownIcon>
              <CaretDown />
            </DownIcon>
          </Flex>
        </StyledTrigger>
      </Select.Trigger>
    );
  },
);

const IconBox = styled<BoxComponent<'button'>>(Box)`
  border: none;
  display: flex;

  svg {
    height: 1.1rem;
    width: 1.1rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

const StyledTrigger = styled<FlexComponent>(Flex)<{
  $hasError?: boolean;
  $size: TriggerSize;
  $withTags?: boolean;
}>`
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  ${(props) => {
    switch (props.$size) {
      case 'S':
        return css`
          padding-block: ${props.theme.spaces[1]};
          padding-inline-start: ${props.$withTags ? props.theme.spaces[1] : props.theme.spaces[4]};
          padding-inline-end: ${props.theme.spaces[3]};
        `;
      default:
        return css`
          padding-block: ${props.$withTags ? '0.3rem' : props.theme.spaces[2]};
          padding-inline-start: ${props.$withTags ? props.theme.spaces[1] : props.theme.spaces[4]};
          padding-inline-end: ${props.theme.spaces[3]};
        `;
    }
  }}
  cursor: pointer;

  &[aria-disabled='true'] {
    color: ${(props) => props.theme.colors.neutral500};
  }

  /* Required to ensure the below inputFocusStyles are adhered too */
  &:focus-visible {
    outline: none;
  }

  ${({ theme, $hasError }) => inputFocusStyle()({ theme, $hasError })};
`;

const DownIcon = styled(Select.Icon)`
  display: flex;
  & > svg {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

/* -------------------------------------------------------------------------------------------------
 * SelectValue
 * -----------------------------------------------------------------------------------------------*/

interface ValueProps
  extends Omit<TypographyProps, 'children' | 'placeholder'>,
    Pick<Select.SelectValueProps, 'placeholder' | 'children'> {
  asChild?: boolean;
}

const SelectValue = React.forwardRef<HTMLSpanElement, ValueProps>(({ children, placeholder, ...restProps }, ref) => (
  <ValueType ref={ref} ellipsis {...restProps}>
    <StyledValue placeholder={placeholder}>{children}</StyledValue>
  </ValueType>
));

const ValueType = styled<TypographyComponent>(Typography)`
  flex: 1;
  font-size: 1.4rem;
  line-height: 2.2rem;
`;

const StyledValue = styled(Select.Value)`
  display: flex;
  gap: ${({ theme }) => theme.spaces[1]};
  flex-wrap: wrap;
`;

/* -------------------------------------------------------------------------------------------------
 * SelectContent
 * -----------------------------------------------------------------------------------------------*/

const SelectContent = React.forwardRef<HTMLDivElement, ContentProps>((props, ref) => {
  return (
    <StyledContent ref={ref} {...props}>
      <ScrollArea>{props.children}</ScrollArea>
    </StyledContent>
  );
});

const StyledContent = styled(Select.Content)`
  background: ${({ theme }) => theme.colors.neutral0};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  min-width: var(--radix-select-trigger-width);
  max-height: 15.6rem;
  z-index: ${({ theme }) => theme.zIndices.popover};

  @media (prefers-reduced-motion: no-preference) {
    animation-duration: ${(props) => props.theme.motion.timings['200']};

    /* The select can't animate out yet, watch https://github.com/radix-ui/primitives/issues/1893, or take a look and solve it yourself. */
    &[data-state='open'] {
      animation-timing-function: ${(props) => props.theme.motion.easings.authenticMotion};

      &[data-side='top'] {
        animation-name: ${ANIMATIONS.slideUpIn};
      }

      &[data-side='bottom'] {
        animation-name: ${ANIMATIONS.slideDownIn};
      }
    }
  }
`;

/* -------------------------------------------------------------------------------------------------
 * SelectViewport
 * -----------------------------------------------------------------------------------------------*/

const SelectViewport = styled(Select.Viewport)`
  padding: ${({ theme }) => theme.spaces[1]};
`;

/* -------------------------------------------------------------------------------------------------
 * SelectItem
 * -----------------------------------------------------------------------------------------------*/

interface ItemProps extends Select.SelectItemProps {}

const SelectItem = React.forwardRef<HTMLDivElement, ItemProps>((props, ref) => (
  <StyledSelectItem ref={ref} {...props} />
));

const itemStyles = css`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: ${(props) => `${props.theme.spaces[2]} ${props.theme.spaces[4]}`};
  padding-left: ${({ theme }) => theme.spaces[4]};
  background-color: ${({ theme }) => theme.colors.neutral0};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces[2]};
  white-space: nowrap;
  user-select: none;
  color: ${({ theme }) => theme.colors.neutral800};

  &:focus-visible {
    outline: none;
    background-color: ${({ theme }) => theme.colors.primary100};
    cursor: pointer;
  }
`;

const StyledSelectItem = styled(Select.Item)`
  ${itemStyles}

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary100};
  }

  &[data-state='checked'] {
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary600};
    font-weight: bold;
  }
`;

const Root = Select.Root;
const Trigger = SelectTrigger;
const Value = SelectValue;
const Portal = Select.Portal;
const Content = SelectContent;
const Viewport = SelectViewport;
const Item = SelectItem;
const ItemIndicator = Select.ItemIndicator;
const ItemText = Select.ItemText;
const Group = Select.Group;

type SelectProps = Select.SelectProps;
type SingleSelectProps = Select.SingleSelectProps;
type MultiSelectProps = Select.MultiSelectProps;
type PortalProps = Select.SelectPortalProps;
type ContentProps = Select.SelectContentProps;
type ViewportProps = Select.SelectViewportProps;
type ItemIndicatorProps = Select.SelectItemIndicatorProps;
type ItemTextProps = Select.SelectItemTextProps;
type GroupProps = Select.SelectGroupProps;
type ValueRenderFn = Select.SelectValueRenderFn;

export { Root, Trigger, Value, Portal, Content, Viewport, Item, ItemIndicator, ItemText, Group };
export type {
  SingleSelectProps,
  MultiSelectProps,
  SelectProps,
  TriggerProps,
  ValueProps,
  ValueRenderFn,
  PortalProps,
  ContentProps,
  ViewportProps,
  ItemProps,
  ItemIndicatorProps,
  ItemTextProps,
  GroupProps,
};
