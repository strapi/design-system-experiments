/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';

import { useFloating, flip, shift, offset, autoUpdate } from '@floating-ui/react-dom';
import {
  startOfWeek,
  today,
  getDayOfWeek,
  isSameDay,
  startOfMonth,
  toCalendarDate,
  CalendarDate,
  endOfMonth,
  minDate as minDateFn,
  maxDate as maxDateFn,
  parseAbsolute,
  getLocalTimeZone,
} from '@internationalized/date';
import { useFocusGuards } from '@radix-ui/react-focus-guards';
import { FocusScope } from '@radix-ui/react-focus-scope';
import { Calendar, Cross } from '@strapi/icons';
import { composeEventHandlers } from '@strapi/ui-primitives';
import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';
import { css, styled, type DefaultTheme } from 'styled-components';

import { createContext } from '../../helpers/context';
import { useComposedRefs } from '../../hooks/useComposeRefs';
import { useControllableState } from '../../hooks/useControllableState';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { useId } from '../../hooks/useId';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { Box, BoxComponent, BoxProps } from '../../primitives/Box';
import { Flex, FlexComponent, FlexProps } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';
import { ANIMATIONS } from '../../styles/motion';
import { inputFocusStyle } from '../../themes';
import { useDesignSystem } from '../../utilities/DesignSystemProvider';
import { DismissibleLayer, DismissibleLayerProps } from '../../utilities/DismissibleLayer';
import { Portal } from '../../utilities/Portal';
import { Field, useField } from '../Field';
import { SingleSelect, SingleSelectOption } from '../Select/SingleSelect';

const DEFAULT_PAST_RANGE = 200;
const DEFAULT_FUTURE_RANGE = 15;

/* -------------------------------------------------------------------------------------------------
 * DatePicker
 * -----------------------------------------------------------------------------------------------*/

interface DatePickerContextValue {
  calendarDate: CalendarDate;
  content: DatePickerContentElement | null;
  contentId: string;
  disabled: boolean;
  locale: string;
  /*
   * Minimum year, that can be selected through the year select
   */
  minDate: CalendarDate;
  /*
   * Maximum year, that can be selected through the year select
   */
  maxDate: CalendarDate;
  open: boolean;
  onCalendarDateChange: (date: CalendarDate) => void;
  onContentChange: (content: DatePickerContentElement | null) => void;
  onOpenChange: (isOpen: boolean) => void;
  onTextInputChange: (textInput: DatePickerTextInputElement | null) => void;
  onTextValueChange: (textValue: string) => void;
  onTriggerChange: (trigger: DatePickerTriggerElement | null) => void;
  onValueChange: (value: CalendarDate | undefined) => void;
  required: boolean;
  textInput: DatePickerTextInputElement | null;
  textValue?: string;
  timeZone: string;
  trigger: DatePickerTriggerElement | null;
  value?: CalendarDate;
}

const [DatePickerProvider, useDatePickerContext] = createContext<DatePickerContextValue>('DatePicker');

interface DatePickerProps
  extends Pick<Partial<DatePickerContextValue>, 'disabled' | 'locale'>,
    Pick<CalendarProps, 'monthSelectLabel' | 'yearSelectLabel'>,
    Omit<TextInputProps, 'onChange' | 'value' | 'ref' | 'size'> {
  calendarLabel?: string;
  className?: string;
  /*
   * Minimum year, that can be selected through the year select
   */
  minDate?: Date;
  /*
   * Maximum year, that can be selected through the year select
   */
  maxDate?: Date;
  /**
   * @default Now
   */
  initialDate?: Date;
  /**
   * onChange function, passed from a parent component, it takes the actual date value and it is used inside the different handlers related to the change event for the DatePicker and the TimePicker and also the clear event for the TimePicker
   */
  onChange?: (date: Date | undefined) => void;
  onClear?: (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => void;
  clearLabel?: string;
  /**
   * @default
   */
  size?: 'S' | 'M';
  value?: Date;
}

const DatePicker = React.forwardRef<DatePickerTextInputElement, DatePickerProps>(
  (
    {
      /**
       * DatePickerCalendar props
       */
      calendarLabel,
      className,
      initialDate,
      locale: defaultLocale,
      maxDate,
      minDate,
      monthSelectLabel = 'Month',
      onChange,
      value: valueProp,
      yearSelectLabel = 'Year',
      /**
       * Combobox props
       */
      hasError: hasErrorProp,
      id: idProp,
      name: nameProp,
      disabled = false,
      required: requiredProp = false,
      onClear,
      clearLabel = 'Clear',
      size = 'M',
      autoComplete = 'off',
      ...restProps
    },
    ref,
  ) => {
    const timeZone = getLocalTimeZone();

    const designContext = useDesignSystem('DatePicker');

    const locale = defaultLocale ?? designContext.locale;

    const formatter = useDateFormatter(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const [open, setOpen] = React.useState(false);
    const [trigger, setTrigger] = React.useState<DatePickerTriggerElement | null>(null);
    const [textInput, setTextInput] = React.useState<DatePickerTextInputElement | null>(null);
    const [content, setContent] = React.useState<DatePickerContentElement | null>(null);
    const [textValue, setTextValue] = React.useState<string | undefined>();

    const [value, setValue] = useControllableState<CalendarDate | undefined>({
      defaultProp: initialDate ? convertUTCDateToCalendarDate(initialDate) : undefined,
      prop: valueProp ? convertUTCDateToCalendarDate(valueProp) : undefined,
      onChange(date) {
        if (onChange) {
          onChange(date?.toDate(timeZone));
        }
      },
    });

    const [actualMinDate, actualMaxDate] = React.useMemo(() => {
      const now = initialDate ? convertUTCDateToCalendarDate(initialDate) : today('UTC');
      const actualMinDate = minDate
        ? convertUTCDateToCalendarDate(minDate)
        : now.set({ day: 1, month: 1, year: now.year - DEFAULT_PAST_RANGE });

      let actualMaxDate = maxDate
        ? convertUTCDateToCalendarDate(maxDate)
        : now.set({ day: 31, month: 12, year: now.year + DEFAULT_FUTURE_RANGE });

      if (actualMaxDate.compare(actualMinDate) < 0) {
        actualMaxDate = actualMinDate.set({ day: 31, month: 12, year: actualMinDate.year + DEFAULT_FUTURE_RANGE });
      }

      return [actualMinDate, actualMaxDate];
    }, [minDate, maxDate, initialDate]);

    /**
     * Setting the initial calendar state based on priority.
     */
    const [calendarDate, setCalendarDate] = React.useState<CalendarDate>(
      makeInitialCalendarDate({
        currentValue: value,
        minDate: actualMinDate,
        maxDate: actualMaxDate,
      }),
    );

    const contentId = useId();

    const clearRef = React.useRef(null);

    const handleClearClick: React.MouseEventHandler<HTMLButtonElement> & React.MouseEventHandler<HTMLDivElement> = (
      e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>,
    ) => {
      if (onClear && !disabled) {
        setTextValue('');
        setValue(undefined);

        onClear(e);
        textInput?.focus();
      }
    };

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (nextOpen && value) {
          setCalendarDate(value);
        }

        setOpen(nextOpen);
      },
      [value],
    );

    useIsomorphicLayoutEffect(() => {
      if (valueProp) {
        const date = convertUTCDateToCalendarDate(valueProp);
        setTextValue(formatter.format(date.toDate(timeZone)));
        setCalendarDate(date);
      } else {
        setTextValue('');
      }
    }, [valueProp, formatter, timeZone]);

    useIsomorphicLayoutEffect(() => {
      if (initialDate && textValue === undefined) {
        const date = convertUTCDateToCalendarDate(initialDate);
        setTextValue(formatter.format(date.toDate(timeZone)));
      }
    }, [initialDate, textValue, formatter, timeZone]);

    const { error, ...field } = useField('Combobox');
    const hasError = Boolean(error) || hasErrorProp;
    const id = field.id ?? idProp;
    const name = field.name ?? nameProp;
    const required = field.required || requiredProp;

    let ariaDescription: string | undefined;
    if (error) {
      ariaDescription = `${id}-error`;
    } else if (field.hint) {
      ariaDescription = `${id}-hint`;
    }

    return (
      <DatePickerProvider
        calendarDate={calendarDate}
        content={content}
        contentId={contentId}
        disabled={disabled}
        locale={locale}
        minDate={actualMinDate}
        maxDate={actualMaxDate}
        open={open}
        onCalendarDateChange={setCalendarDate}
        onContentChange={setContent}
        onOpenChange={handleOpenChange}
        onTextInputChange={setTextInput}
        onTextValueChange={setTextValue}
        onTriggerChange={setTrigger}
        onValueChange={setValue}
        required={required}
        textInput={textInput}
        textValue={textValue}
        timeZone={timeZone}
        trigger={trigger}
        value={value}
      >
        <DatePickerTrigger className={className} hasError={hasError} size={size}>
          <Calendar fill="neutral500" aria-hidden />
          <DatePickerTextInput
            ref={ref}
            aria-describedby={ariaDescription}
            id={id}
            name={name}
            autoComplete={autoComplete}
            {...restProps}
          />
          {textValue && onClear ? (
            <IconBox
              tag="button"
              hasRadius
              background="transparent"
              type="button"
              onClick={handleClearClick}
              aria-disabled={disabled}
              aria-label={clearLabel}
              title={clearLabel}
              ref={clearRef}
            >
              <Cross />
            </IconBox>
          ) : null}
        </DatePickerTrigger>
        <Portal>
          <DatePickerContent label={calendarLabel}>
            <DatePickerCalendar monthSelectLabel={monthSelectLabel} yearSelectLabel={yearSelectLabel} />
          </DatePickerContent>
        </Portal>
      </DatePickerProvider>
    );
  },
);

const isPrintableCharacter = (str: string): boolean => {
  return Boolean(str.match(/^[^a-zA-Z]*$/));
};

const makeInitialCalendarDate: (args: {
  currentValue?: CalendarDate;
  minDate: CalendarDate;
  maxDate: CalendarDate;
}) => CalendarDate = ({ currentValue, minDate, maxDate }) => {
  const now = today('UTC');

  if (currentValue) {
    return currentValue;
  }

  if (minDateFn(minDate, now) === minDate && maxDateFn(maxDate, now) === maxDate) {
    return now;
  }

  if (minDateFn(minDate, now) === now) {
    return minDate;
  }

  if (maxDateFn(maxDate, now) === now) {
    return maxDate;
  }

  return now;
};

/* -------------------------------------------------------------------------------------------------
 * DatePickerTrigger
 * -----------------------------------------------------------------------------------------------*/

const DATE_PICKER_TRIGGER_NAME = 'DatePickerTrigger';

type DatePickerTriggerElement = HTMLDivElement;

interface TriggerProps extends FlexProps {
  hasError?: boolean;
  size?: DatePickerProps['size'];
}

const DatePickerTrigger = React.forwardRef<DatePickerTriggerElement, TriggerProps>(
  ({ hasError, size, ...restProps }, forwardedRef) => {
    const context = useDatePickerContext(DATE_PICKER_TRIGGER_NAME);

    const composedRefs = useComposedRefs(forwardedRef, (node) => context.onTriggerChange(node));

    const handleOpenChange = () => {
      if (!context.disabled) {
        context.onOpenChange(true);
      }
    };

    return (
      <FocusScope
        asChild
        // we make sure we're not trapping once it's been closed
        // (closed !== unmounted when animating out)
        trapped={context.open}
        onMountAutoFocus={(event) => {
          // we prevent open autofocus because we manually focus the selected item
          event.preventDefault();
        }}
        onUnmountAutoFocus={(event) => {
          /**
           * In firefox there's a some kind of selection happening after
           * unmounting all of this, so we make sure we clear that.
           */
          document.getSelection()?.empty();
          event.preventDefault();
        }}
      >
        <TriggerElement
          ref={composedRefs}
          $hasError={hasError}
          $size={size}
          {...restProps}
          hasRadius
          gap={3}
          overflow="hidden"
          background={context.disabled ? 'neutral150' : 'neutral0'}
          onClick={composeEventHandlers(restProps.onClick, () => {
            // Whilst browsers generally have no issue focusing the trigger when clicking
            // on a label, Safari seems to struggle with the fact that there's no `onClick`.
            // We force `focus` in this case. Note: this doesn't create any other side-effect
            // because we are preventing default in `onPointerDown` so effectively
            // this only runs for a label "click"
            context.textInput?.focus();
          })}
          onPointerDown={composeEventHandlers(restProps.onPointerDown, (event) => {
            // prevent implicit pointer capture
            // https://www.w3.org/TR/pointerevents3/#implicit-pointer-capture
            const target = event.target as HTMLElement;

            if (target.hasPointerCapture(event.pointerId)) {
              target.releasePointerCapture(event.pointerId);
            }

            /**
             * This has been added to allow events inside the trigger to be easily fired
             * e.g. the clear button or removing a tag
             */
            const buttonTarg = target.closest('button') ?? target.closest('div');

            if (buttonTarg !== event.currentTarget) {
              return;
            }

            // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
            // but not when the control key is pressed (avoiding MacOS right click)
            if (event.button === 0 && event.ctrlKey === false) {
              handleOpenChange();
              /**
               * Firefox had issues focussing the input correctly.
               */
              context.textInput?.focus();
            }
          })}
        />
      </FocusScope>
    );
  },
);

const TriggerElement = styled<FlexComponent>(Flex)<{ $hasError?: boolean; $size: TriggerProps['size'] }>`
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  ${(props) => {
    switch (props.$size) {
      case 'S':
        return css`
          padding-block: ${props.theme.spaces[1]};
          padding-inline: ${props.theme.spaces[3]};
        `;
      default:
        return css`
          padding-block: ${props.theme.spaces[2]};
          padding-inline: ${props.theme.spaces[3]};
        `;
    }
  }}

  & > svg {
    flex: 1 0 auto;
  }

  &[data-disabled] {
    color: ${({ theme }) => theme.colors.neutral600};
    background: ${({ theme }) => theme.colors.neutral150};
    cursor: not-allowed;
  }

  /* Required to ensure the below inputFocusStyles are adhered too */
  &:focus-visible {
    outline: none;
  }

  ${({ theme, $hasError }) => inputFocusStyle()({ theme, $hasError })};
`;

const IconBox = styled<BoxComponent<'button'>>(Box)`
  border: none;
  color: ${({ theme }) => theme.colors.neutral600};
  padding: 0;
  cursor: pointer;
`;

/* -------------------------------------------------------------------------------------------------
 *  DatePickerTextInput
 * -----------------------------------------------------------------------------------------------*/

const DATE_PICKER_TEXT_INPUT_NAME = 'DatePickerTextInput';

type DatePickerTextInputElement = HTMLInputElement;

interface TextInputProps extends React.ComponentPropsWithRef<'input'>, Pick<Field.InputProps, 'hasError'> {}

const DatePickerTextInput = React.forwardRef<DatePickerTextInputElement, TextInputProps>(
  ({ placeholder, ...props }, forwardedRef) => {
    const context = useDatePickerContext(DATE_PICKER_TEXT_INPUT_NAME);

    const { onTextValueChange, textValue, onTextInputChange, onOpenChange, disabled, locale } = context;

    const composedRefs = useComposedRefs(forwardedRef, (node) => onTextInputChange(node));

    const handleOpenChange = () => {
      if (!disabled) {
        onOpenChange(true);
      }
    };

    const formatter = useDateFormatter(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const [dateFormatPlaceholder, separator, dateStructure] = React.useMemo(() => {
      const parts = formatter.formatToParts(new Date());

      const dateStructure = parts.filter(
        (part) => part.type === 'year' || part.type === 'month' || part.type === 'day',
      );

      const placeholder = dateStructure.map((part) => {
        switch (part.type) {
          case 'day':
            return 'DD';
          case 'month':
            return 'MM';
          case 'year':
            return 'YYYY';
          default:
            return '';
        }
      });

      const separator = parts.find((part) => part.type === 'literal')?.value ?? '';

      return [placeholder, separator, dateStructure];
    }, [formatter]);

    /**
     * the `pattern` prop of an input cannot be a regex it must be a string without the `/` delimiters.
     * Therefore, we manually escape the separator and `d` character.
     */
    const inputPattern = dateFormatPlaceholder.map((part) => `\\d{${part.length}}`).join(`\\${separator}`);

    return (
      <Input
        role="combobox"
        type="text"
        inputMode="numeric"
        ref={composedRefs}
        aria-autocomplete="none"
        aria-controls={context.contentId}
        aria-disabled={context.disabled}
        aria-expanded={context.open}
        aria-required={context.required}
        aria-haspopup="dialog"
        data-state={context.open ? 'open' : 'closed'}
        disabled={disabled}
        data-disabled={disabled ? '' : undefined}
        pattern={inputPattern}
        placeholder={placeholder ?? dateFormatPlaceholder.join(separator)}
        {...props}
        value={textValue ?? ''}
        onBlur={composeEventHandlers(props.onBlur, () => {
          if (!context.textValue) {
            context.onValueChange(undefined);

            return;
          }

          context.onTextValueChange(formatter.format(context.calendarDate.toDate(context.timeZone)));
          context.onValueChange(context.calendarDate);
        })}
        onChange={composeEventHandlers(props.onChange, (event) => {
          if (isPrintableCharacter(event.target.value)) {
            const inputByPart = event.target.value.split(separator);

            /**
             * by using the dateStructure to understand the localised order we split and organise the event.target.value
             * to DD MM YYYY and return as an array.
             */
            const [day, month, year] = dateStructure
              .map((part, index) => {
                const value = inputByPart[index];

                return {
                  ...part,
                  value,
                };
              })
              /**
               * TODO: This could probably be better done?
               */
              .sort((a, b) => {
                if (a.type === 'year') {
                  return 1;
                }

                if (b.type === 'year') {
                  return -1;
                }

                if (a.type === 'month') {
                  return 1;
                }

                if (b.type === 'month') {
                  return -1;
                }

                return 0;
              })
              .map((part) => part.value);

            const currentYear = context.calendarDate.year;

            /**
             * If a user types 2 for the year then the year should be the current year with the last number as what they typed.
             * This applies for if they've typed two numbers but not three or four numbers.
             */
            let newYear = context.calendarDate.year;

            if (year) {
              /**
               * ensure the year is _at least_ 2 digits long so if the year
               * is 2023 and you type 9 the year becomes 2009 instead of 2029,
               * this is much similar to how other DatePickers work and makes more sense.
               */
              const normalizedYear = year.length === 1 ? `0${year}` : year;

              /**
               * The year we set to _must_ be 4 digits long.
               */
              newYear =
                year.length < 3
                  ? Number(`${currentYear}`.slice(0, 4 - normalizedYear.length) + normalizedYear)
                  : Number(normalizedYear);
            }

            /**
             * If you type a value like `94` and that's above the maxDate e.g. 2040 then
             * we assume you would have meant 1994 and correct the date. Again, this is
             * similar to how other DatePickers work.
             *
             * Note we only do this if the typed value is less than 3 digits long.
             */
            if (year && year.length < 3 && newYear > context.maxDate.year) {
              newYear -= 100;
            }

            const newDateWithYear = context.calendarDate.set({ year: newYear });

            const maxMonthNumber = newDateWithYear.calendar.getMonthsInYear(newDateWithYear);

            const newDateWithMonthAndYear = newDateWithYear.set({
              month: month && Number(month) <= maxMonthNumber ? Number(month) : undefined,
            });

            const maxDayNumber = newDateWithMonthAndYear.calendar.getDaysInMonth(newDateWithMonthAndYear);

            const newDateWithDayMonthAndYear = newDateWithMonthAndYear.set({
              day: day && Number(day) <= maxDayNumber ? Number(day) : undefined,
            });

            context.onCalendarDateChange(constrainValue(newDateWithDayMonthAndYear, context.minDate, context.maxDate));

            context.onTextValueChange(event.target.value);
          }
        })}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (!context.open && (isPrintableCharacter(event.key) || ['ArrowDown', 'Backspace'].includes(event.key))) {
            handleOpenChange();
          } else if (['Tab'].includes(event.key) && context.open) {
            event.preventDefault();
          } else if (['Escape'].includes(event.key)) {
            if (context.open) {
              context.onOpenChange(false);
            } else {
              context.onValueChange(undefined);
              context.onTextValueChange('');
            }
            event.preventDefault();
          } else if (context.open && ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();

            switch (event.key) {
              case 'ArrowDown': {
                const nextDate = context.calendarDate.add({ weeks: 1 });

                if (context.maxDate && nextDate.compare(context.maxDate) > 0) {
                  return;
                }

                context.onCalendarDateChange(nextDate);

                return;
              }
              case 'ArrowRight': {
                const nextDate = context.calendarDate.add({ days: 1 });

                if (context.maxDate && nextDate.compare(context.maxDate) > 0) {
                  return;
                }

                context.onCalendarDateChange(nextDate);

                return;
              }
              case 'ArrowUp': {
                const nextDate = context.calendarDate.subtract({ weeks: 1 });

                if (context.minDate && nextDate.compare(context.minDate) < 0) {
                  return;
                }

                context.onCalendarDateChange(nextDate);

                return;
              }
              case 'ArrowLeft': {
                const nextDate = context.calendarDate.subtract({ days: 1 });

                if (context.minDate && nextDate.compare(context.minDate) < 0) {
                  return;
                }

                context.onCalendarDateChange(nextDate);
              }
              // eslint-disable-next-line no-fallthrough
              default:
                break;
            }
          } else if (context.open && ['Enter'].includes(event.key)) {
            event.preventDefault();
            onTextValueChange(formatter.format(context.calendarDate.toDate(context.timeZone)));
            context.onValueChange(context.calendarDate);
            context.onOpenChange(false);
          }
        })}
      />
    );
  },
);

function constrainValue(date: CalendarDate, minValue: CalendarDate, maxValue: CalendarDate) {
  if (minValue) {
    date = maxDateFn(date, minValue);
  }

  if (maxValue) {
    date = minDateFn(date, maxValue);
  }

  return date;
}

const Input = styled.input`
  width: 100%;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.neutral800};
  border: none;
  background-color: transparent;

  &:focus-visible {
    outline: none;
  }

  &[aria-disabled='true'] {
    cursor: inherit;
  }
`;

/* -------------------------------------------------------------------------------------------------
 *  DatePickerContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'DatePickerContent';

interface ContentProps extends ContentImplProps {}

type DatePickerContentElement = DatePickerContentImplElement;

const DatePickerContent = React.forwardRef<DatePickerContentElement, ContentProps>((props, forwardedRef) => {
  const [fragment, setFragment] = React.useState<DocumentFragment>();
  const context = useDatePickerContext(CONTENT_NAME);

  // setting the fragment in `useLayoutEffect` as `DocumentFragment` doesn't exist on the server
  useIsomorphicLayoutEffect(() => {
    setFragment(new DocumentFragment());
  }, []);

  if (!context.open) {
    const frag = fragment as Element | undefined;

    return frag ? createPortal(<div>{props.children}</div>, frag) : null;
  }

  return <DatePickerContentImpl {...props} ref={forwardedRef} />;
});

/* -------------------------------------------------------------------------------------------------
 *  DatePickerContentImpl
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_IMPL_NAME = 'DatePickerContent';

interface ContentImplProps extends DismissibleLayerProps {
  /**
   * @default 'Choose date'
   */
  label?: string;
}

type DatePickerContentImplElement = HTMLDivElement;

const DatePickerContentImpl = React.forwardRef<DatePickerContentImplElement, ContentImplProps>(
  (props, forwardedRef) => {
    const { label = 'Choose date', ...restProps } = props;
    const { onOpenChange, ...context } = useDatePickerContext(CONTENT_IMPL_NAME);

    const { x, y, refs, strategy, placement } = useFloating({
      strategy: 'fixed',
      placement: 'bottom-start',
      middleware: [
        offset({
          mainAxis: 4,
        }),
        shift(),
        flip(),
      ],
      elements: {
        reference: context.trigger,
      },
      whileElementsMounted: autoUpdate,
    });

    React.useEffect(() => {
      const close = () => {
        onOpenChange(false);
      };
      window.addEventListener('blur', close);
      window.addEventListener('resize', close);

      return () => {
        window.removeEventListener('blur', close);
        window.removeEventListener('resize', close);
      };
    }, [onOpenChange]);

    const composedRefs = useComposedRefs<DatePickerContentImplElement>(
      forwardedRef,
      (node) => context.onContentChange(node),
      refs.setFloating,
    );

    useFocusGuards();

    return (
      <RemoveScroll allowPinchZoom>
        <DismissibleLayer
          asChild
          // When focus is trapped, a focusout event may still happen.
          // We make sure we don't trigger our `onDismiss` in such case.
          onFocusOutside={(event) => {
            event.preventDefault();
          }}
          onDismiss={() => {
            onOpenChange(false);
          }}
        >
          <ContentElement
            ref={composedRefs}
            data-state={context.open ? 'open' : 'closed'}
            data-side={placement.includes('top') ? 'top' : 'bottom'}
            onContextMenu={(event) => event.preventDefault()}
            id={context.contentId}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            style={{
              left: x,
              top: y,
              position: strategy,
            }}
            hasRadius
            background="neutral0"
            padding={1}
            {...restProps}
          />
        </DismissibleLayer>
      </RemoveScroll>
    );
  },
);

const ContentElement = styled<BoxComponent>(Box)`
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  z-index: ${({ theme }) => theme.zIndices.popover};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};

  @media (prefers-reduced-motion: no-preference) {
    animation-duration: ${(props) => props.theme.motion.timings['200']};

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
 *  DatePickerCalendar
 * -----------------------------------------------------------------------------------------------*/

const DATE_PICKER_CALENDAR_NAME = 'DatePickerCalendar';

interface CalendarProps extends FlexProps<'div'> {
  monthSelectLabel?: string;
  yearSelectLabel?: string;
}

const DatePickerCalendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ monthSelectLabel, yearSelectLabel, ...restProps }, ref) => {
    const { locale, timeZone, minDate, maxDate, calendarDate, onCalendarDateChange } =
      useDatePickerContext(DATE_PICKER_CALENDAR_NAME);
    const startDate = startOfMonth(calendarDate);

    const years: string[] = React.useMemo(() => {
      const minYear = minDate.year;
      const maxYear = maxDate.year;

      return [...Array(maxYear - minYear + 1).keys()].map((y) => (minYear + y).toString());
    }, [minDate, maxDate]);

    const monthFormatter = useDateFormatter(locale, { month: 'long' });
    const months: string[] = React.useMemo(
      () =>
        [...Array(calendarDate.calendar.getMonthsInYear(calendarDate)).keys()].map((m) =>
          monthFormatter.format(calendarDate.set({ month: m + 1 }).toDate(timeZone)),
        ),
      [calendarDate, monthFormatter, timeZone],
    );

    const dayFormatter = useDateFormatter(locale, { weekday: 'short' });
    /**
     * These are the strings of our days of the week
     * e.g. `Mon`, `Tue`, `Wed`, etc.
     */
    const weekDays = React.useMemo(() => {
      const weekStart = startOfWeek(today(timeZone), locale);

      return [...new Array(7).keys()].map((index) => {
        const date = weekStart.add({ days: index });
        const dateDay = date.toDate(timeZone);

        return dayFormatter.format(dateDay);
      });
    }, [timeZone, locale, dayFormatter]);

    const handleMonthChange = (month: string | number) => {
      if (typeof month === 'number') {
        /**
         * This just to make TS happy, we're not going to get a
         * number because we only use strings as options
         */
        return;
      }

      const updatedDate = calendarDate.set({ month: months.indexOf(month) + 1 });
      onCalendarDateChange(updatedDate);
    };

    const handleYearChange = (year: string | number) => {
      if (typeof year === 'number') {
        /**
         * This just to make TS happy, we're not going to get a
         * number because we only use strings as options
         */
        return;
      }

      const updatedDate = calendarDate.set({ year: parseInt(year, 10) });
      onCalendarDateChange(updatedDate);
    };

    const getDatesInWeek = makeGetDatesInWeek(startDate, locale);

    return (
      <Flex ref={ref} direction="column" alignItems="stretch" padding={4} {...restProps}>
        <ToolbarFlex justifyContent="flex-start" paddingBottom={4} paddingLeft={2} paddingRight={2} gap={2}>
          {/* these are wrapped in their own Field root so they don't get confused with the potential wrapper of the combobox */}
          <Field.Root>
            <SingleSelect
              aria-label={monthSelectLabel}
              value={months[calendarDate.month - 1]}
              onChange={handleMonthChange}
            >
              {months.map((month) => (
                <SingleSelectOption key={month} value={month}>
                  {month}
                </SingleSelectOption>
              ))}
            </SingleSelect>
          </Field.Root>
          <Field.Root>
            <SingleSelect value={calendarDate.year.toString()} aria-label={yearSelectLabel} onChange={handleYearChange}>
              {years.map((year) => (
                <SingleSelectOption key={year} value={year}>
                  {year}
                </SingleSelectOption>
              ))}
            </SingleSelect>
          </Field.Root>
        </ToolbarFlex>
        <table role="grid">
          <thead aria-hidden>
            <tr aria-rowindex={0}>
              {weekDays.map((day, index) => (
                <DatePickerHeaderCell aria-colindex={index} key={day}>
                  {day}
                </DatePickerHeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...new Array(6).keys()].map((weekIndex) => (
              <tr aria-rowindex={weekIndex + 2} key={weekIndex}>
                {getDatesInWeek(weekIndex).map((date, index) =>
                  date ? (
                    <DatePickerCalendarCell
                      key={date.toString()}
                      aria-colindex={index + 1}
                      date={date}
                      startDate={startDate}
                      disabled={minDate.compare(date) > 0 || date.compare(maxDate) > 0}
                    />
                  ) : (
                    <Cell key={index + 1} aria-colindex={index + 1} />
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Flex>
    );
  },
);

const makeGetDatesInWeek = (from: CalendarDate, locale: string) => (weekIndex: number) => {
  let date = from.add({ weeks: weekIndex });
  const dates: Array<CalendarDate | null> = [];

  date = startOfWeek(date, locale);

  /**
   * startOfWeek will clamp dates within the calendar system's valid range, which may
   * start in the middle of a week. In this case, add null placeholders.
   */
  const dayOfWeek = getDayOfWeek(date, locale);
  for (let i = 0; i < dayOfWeek; i++) {
    dates.push(null);
  }

  while (dates.length < 7) {
    dates.push(date);
    const nextDate = date.add({ days: 1 });

    if (isSameDay(date, nextDate)) {
      /**
       * If the next day is the same, we have hit the end of the calendar system.
       */
      break;
    }

    date = nextDate;
  }

  /**
   * Add null placeholders if at the end of the calendar system.
   */
  while (dates.length < 7) {
    dates.push(null);
  }

  return dates;
};

const ToolbarFlex = styled<FlexComponent>(Flex)`
  div[role='combobox'] {
    border: 1px solid transparent;
    background: transparent;
    font-weight: ${(props) => props.theme.fontWeights.bold};

    svg {
      fill: ${({ theme }) => theme.colors.neutral500};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral100};
    }
  }
`;

/* -------------------------------------------------------------------------------------------------
 * DatePickerHeaderCell
 * -----------------------------------------------------------------------------------------------*/

interface HeaderCellProps extends Omit<BoxProps<'td'>, 'children'> {
  children: string;
}

const DatePickerHeaderCell = React.forwardRef<HTMLTableCellElement, HeaderCellProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Th tag="th" role="gridcell" ref={forwardedRef} {...props} height="2.4rem" width="3.2rem">
        <Typography variant="pi" fontWeight="bold" color="neutral800">
          {children.slice(0, 2)}
        </Typography>
      </Th>
    );
  },
);

const Th = styled<BoxComponent<'th' | 'td'>>(Box)`
  border-radius: ${({ theme }) => theme.borderRadius};
  text-transform: capitalize;
`;

/* -------------------------------------------------------------------------------------------------
 *  DatePickerCalendarCell
 * -----------------------------------------------------------------------------------------------*/

const DATE_PICKER_CALEDNAR_CELL_NAME = 'DatePickerCalendarCell';

type DatePickerCalendarCellElement = HTMLTableCellElement;

interface CalendarCellProps extends BoxProps<'td'> {
  date: CalendarDate;
  startDate: CalendarDate;
  disabled: boolean;
}

const DatePickerCalendarCell = React.forwardRef<DatePickerCalendarCellElement, CalendarCellProps>(
  ({ date, startDate, disabled, ...props }, forwardedRef) => {
    const { timeZone, locale, calendarDate, onValueChange, onOpenChange, onTextValueChange, onCalendarDateChange } =
      useDatePickerContext(DATE_PICKER_CALEDNAR_CELL_NAME);

    const isSelected = isSameDay(calendarDate, date);

    const dateFormatter = useDateFormatter(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const label = React.useMemo(() => dateFormatter.format(date.toDate(timeZone)), [dateFormatter, date, timeZone]);

    const cellDateFormatter = useDateFormatter(locale, {
      day: 'numeric',
      calendar: date.calendar.identifier,
    });

    const formattedDate = React.useMemo(
      () => cellDateFormatter.formatToParts(date.toDate(timeZone)).find((part) => part.type === 'day')!.value,
      [cellDateFormatter, date, timeZone],
    );

    const textValueFormatter = useDateFormatter(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const endDate = endOfMonth(startDate);
    const isOutsideVisibleRange = date.compare(startDate) < 0 || date.compare(endDate) > 0;

    let textColor: keyof DefaultTheme['colors'] = 'neutral900';

    if (isSelected) {
      textColor = 'primary600';
    } else if (isOutsideVisibleRange) {
      textColor = 'neutral600';
    }

    return (
      <Cell
        tag="td"
        role="gridcell"
        ref={forwardedRef}
        aria-selected={isSelected}
        {...props}
        hasRadius
        aria-label={label}
        tabIndex={isSelected ? 0 : -1}
        background={isSelected ? 'primary100' : 'neutral0'}
        cursor="pointer"
        onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
          event.preventDefault();
          onCalendarDateChange(date);
          onValueChange(date);
          onTextValueChange(textValueFormatter.format(date.toDate(timeZone)));
          onOpenChange(false);
        })}
        aria-disabled={disabled}
      >
        <Typography variant="pi" textColor={textColor}>
          {formattedDate}
        </Typography>
      </Cell>
    );
  },
);

const Cell = styled<BoxComponent<'th' | 'td'>>(Box)`
  text-align: center;
  padding: 0.7rem;
  // Trick to prevent the outline from overflowing because of the general outline-offset
  outline-offset: -2px !important;
  &[aria-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
  }

  &[aria-disabled='false'] {
    &:hover {
      background: ${({ theme }) => theme.colors.primary100};
      color: ${({ theme }) => theme.colors.primary600};
    }
  }
`;

const convertUTCDateToCalendarDate = (date: Date): CalendarDate => {
  const utcDateString = date.toISOString();
  const zonedDateTime = parseAbsolute(utcDateString, 'UTC');

  /**
   * ZonedDateTime can't have weeks added,
   * see – https://github.com/adobe/react-spectrum/issues/3667
   */
  return toCalendarDate(zonedDateTime);
};

type DatePickerElement = DatePickerTextInputElement;

export { DatePicker };
export type { DatePickerProps, DatePickerElement };
