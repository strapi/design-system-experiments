import { RenderOptions, render as renderRTL } from '@test/utils';

import { DatePicker, DatePickerProps } from '../DatePicker';

const Component = (props: Partial<DatePickerProps>) => <DatePicker locale="en-EN" label="date picker" {...props} />;

const render = (props?: Partial<DatePickerProps>, renderOptions?: RenderOptions) =>
  renderRTL(<Component {...props} />, { renderOptions });

describe('DatePicker', () => {
  describe('Input', () => {
    it('should render by default no date', () => {
      const { getByRole, queryByRole } = render();

      expect(getByRole('combobox', { name: 'date picker' })).toHaveValue('');
      expect(queryByRole('dialog')).not.toBeInTheDocument();
      expect(queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    });

    it('should open the calendar popover when clicked', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('dialog')).toBeInTheDocument();
    });

    it('should call onChange and close the dialog when a date is selected in the calendar', async () => {
      const onChange = jest.fn();
      const { getByRole, queryByRole, user } = render({ onChange, initialDate: new Date('Sep 04 2021') });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('dialog')).toBeInTheDocument();

      await user.click(getByRole('gridcell', { name: 'Wednesday, September 1, 2021' }));

      expect(onChange).toHaveBeenCalledWith(new Date('Sep 01 2021'));

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should show the onClear button if there is a value and when pressed call the onClear callback', async () => {
      const onClear = jest.fn();
      const { getByRole, user } = render({ onClear, selectedDate: new Date('Sep 04 2021') });

      expect(getByRole('button', { name: 'Clear' })).toBeInTheDocument();

      await user.click(getByRole('button', { name: 'Clear' }));

      expect(onClear).toHaveBeenCalled();

      /**
       * This won't work due to a bug in `user-event` that doesn't trigger the focus event.
       */
      // expect(getByRole('textbox', { name: 'date picker' })).toHaveFocus();
    });

    it('should call onChange when a selectedDate is passed and a calendar date is pressed', async () => {
      const onChange = jest.fn();
      const { getByRole, user } = render({ selectedDate: new Date('Sep 04 2021'), onChange });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      await user.click(getByRole('gridcell', { name: 'Wednesday, September 8, 2021' }));

      expect(onChange).toHaveBeenCalledWith(new Date('Sep 08 2021'));
    });

    it('should call onChange when we blur the input after typing a date', async () => {
      const onChange = jest.fn();

      const { getByRole, user } = render(
        { onChange },
        {
          wrapper({ children }) {
            return (
              <div>
                {children}
                <button type="button">testing</button>
              </div>
            );
          },
        },
      );

      await user.type(getByRole('combobox', { name: 'date picker' }), '01/09/2021');

      await user.keyboard('[Escape]');

      await user.tab();

      expect(onChange).toHaveBeenCalledWith(new Date('Sep 01 2021'));
    });
  });

  describe('Calendar', () => {
    it('should render the month passed in the initialDate by default', async () => {
      const { getByRole, getByText, getAllByRole, user } = render({ initialDate: new Date('Sep 04 2021') });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('combobox', { name: 'Month' })).toBeInTheDocument();
      expect(getByRole('combobox', { name: 'Year' })).toBeInTheDocument();

      expect(getByText('Su')).toBeInTheDocument();
      expect(getByText('Mo')).toBeInTheDocument();
      expect(getByText('Tu')).toBeInTheDocument();
      expect(getByText('We')).toBeInTheDocument();
      expect(getByText('Th')).toBeInTheDocument();
      expect(getByText('Fr')).toBeInTheDocument();
      expect(getByText('Sa')).toBeInTheDocument();

      /**
       * We always render a 7*7 grid to make sure the calendar is always the same size
       * The header row is hidden.
       */
      expect(getAllByRole('gridcell', { hidden: true })).toHaveLength(49);
    });

    it('should update the grid view when the month is changed', async () => {
      const { getByRole, getAllByRole, user } = render({ initialDate: new Date('Sep 04 2021') });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('6');

      await user.click(getByRole('combobox', { name: 'Month' }));
      await user.click(getByRole('option', { name: 'October' }));

      expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('October');

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('4');
    });

    it('should update the grid view when the year is changed', async () => {
      const { getByRole, getAllByRole, user } = render({
        initialDate: new Date('Sep 04 2021'),
      });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('6');

      await user.click(getByRole('combobox', { name: 'Year' }));
      await user.click(getByRole('option', { name: '2022' }));

      expect(getByRole('combobox', { name: 'Year' })).toHaveTextContent('2022');

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('5');
    });

    it('should call onChange when a date is selected', async () => {
      const onChange = jest.fn();

      const { getByRole, user } = render({ onChange, initialDate: new Date('Sep 04 2021') });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      await user.click(getByRole('gridcell', { name: 'Wednesday, September 1, 2021' }));

      expect(onChange).toHaveBeenCalledWith(new Date('Sep 01 2021'));
    });

    it('should update the view when there is a passed selectedDate and it is updated', async () => {
      const { rerender, getByRole, getAllByRole, user } = render({ selectedDate: new Date('Sep 04 2021') });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getAllByRole('gridcell')[8]).toHaveTextContent('6');

      await user.keyboard('[Escape]');

      rerender(<Component selectedDate={new Date('Oct 04 2021')} />);

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('October');
      expect(getAllByRole('gridcell')[8]).toHaveTextContent('4');
    });

    ['ArrowDown', 'ArrowUp'].forEach((key) =>
      it(`should move my highlighted gridcell ${
        key === 'ArrowDown' ? 'forward' : 'backward'
      } by one week when the ${key} key is pressed`, async () => {
        const { getByRole, user } = render({ selectedDate: new Date('Sep 16 2021') });

        await user.click(getByRole('combobox', { name: 'date picker' }));

        const name = key === 'ArrowDown' ? 'Thursday, September 23, 2021' : 'Thursday, September 9, 2021';

        expect(getByRole('gridcell', { name })).toHaveAttribute('aria-selected', 'false');

        await user.keyboard(`[${key}]`);

        expect(getByRole('gridcell', { name })).toHaveAttribute('aria-selected', 'true');
      }),
    );

    ['ArrowLeft', 'ArrowRight'].forEach((key) =>
      it(`should move my highlighted gridcell ${
        key === 'ArrowDown' ? 'forward' : 'backward'
      } by one day when the ${key} key is pressed`, async () => {
        const { getByRole, user } = render({ selectedDate: new Date('Sep 16 2021') });

        await user.click(getByRole('combobox', { name: 'date picker' }));

        const name = key === 'ArrowLeft' ? 'Wednesday, September 15, 2021' : 'Friday, September 17, 2021';

        expect(getByRole('gridcell', { name })).toHaveAttribute('aria-selected', 'false');

        await user.keyboard(`[${key}]`);

        expect(getByRole('gridcell', { name })).toHaveAttribute('aria-selected', 'true');
      }),
    );

    it('should change the month when we change the date by either a week or day and subsequently its a new month', async () => {
      const { user, getByRole } = render({ selectedDate: new Date('Sep 30 2021') });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('September');

      await user.keyboard('[ArrowRight]');

      expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('October');
      expect(getByRole('gridcell', { name: 'Friday, October 1, 2021' })).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('[ArrowUp]');

      expect(getByRole('combobox', { name: 'Month' })).toHaveTextContent('September');
      expect(getByRole('gridcell', { name: 'Friday, September 24, 2021' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('disabled prop', () => {
    it('should not open the popover is the disabled is true', async () => {
      const { getByRole, queryByRole, user } = render({ disabled: true });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should not clear the input if the input is disabled', async () => {
      const onClear = jest.fn();
      const { getByRole, user } = render({
        onClear,
        selectedDate: new Date('Sep 04 2021'),
        disabled: true,
      });

      expect(getByRole('button', { name: 'Clear' })).toBeInTheDocument();

      await user.click(getByRole('button', { name: 'Clear' }));

      expect(onClear).not.toHaveBeenCalled();
    });
  });

  describe('localisation', () => {
    it('should format by en-EN locale by default', async () => {
      const { getByRole, user } = render({ selectedDate: new Date('Tue Sep 06 2022') });

      expect(getByRole('combobox')).toHaveValue('06/09/2022');

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('gridcell', { hidden: true, name: 'Su' })).toBeInTheDocument();
      expect(getByRole('gridcell', { name: 'Wednesday, September 7, 2022' })).toBeInTheDocument();
    });

    it('should format by the DE locale when passed', async () => {
      const { getByRole, user } = render({ locale: 'de-DE', selectedDate: new Date('Tue Sep 06 2022') });

      expect(getByRole('combobox')).toHaveValue('06.09.2022');

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('gridcell', { hidden: true, name: 'So' })).toBeInTheDocument();
      expect(getByRole('gridcell', { name: 'Mittwoch, 7. September 2022' })).toBeInTheDocument();
    });
  });

  describe('min/max date prop', () => {
    it('should limit the year select options in the Calendar', async () => {
      const { getByRole, queryByRole, user } = render({
        minDate: new Date('Mon Sep 04 2020'),
        maxDate: new Date('Mon Sep 04 2023'),
        initialDate: new Date('Sep 04 2021'),
      });

      await user.click(getByRole('combobox', { name: 'date picker' }));
      await user.click(getByRole('combobox', { name: 'Year' }));

      expect(queryByRole('option', { name: '2019' })).not.toBeInTheDocument();
      expect(queryByRole('option', { name: '2014' })).not.toBeInTheDocument();
    });

    it('should set the initial calendar date to the minimum date if today is before that date', async () => {
      const { getByRole, user } = render({
        minDate: new Date('Sep 04 4000'),
      });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('gridcell', { name: /September 4, 4000/ })).toHaveAttribute('aria-selected', 'true');
    });

    it('should set the intial calendar date to the maximum date if today is after that date', async () => {
      const { getByRole, user } = render({
        maxDate: new Date('Sep 04 2000'),
      });

      await user.click(getByRole('combobox', { name: 'date picker' }));

      expect(getByRole('gridcell', { name: /September 4, 2000/ })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('typing in the input & updating the calendar', () => {
    it('should correctly update the calendar when typing DD/MM/YYYY', async () => {
      const { getByRole, user } = render({ initialDate: new Date('Sept 04 2020'), locale: 'en-GB' });

      await user.click(getByRole('combobox', { name: 'date picker' }));
      await user.clear(getByRole('combobox', { name: 'date picker' }));
      expect(getByRole('gridcell', { name: 'Friday, 4 September 2020' })).toHaveAttribute('aria-selected', 'true');

      getByRole('combobox', { name: 'date picker' }).focus();

      await user.keyboard('05');
      expect(getByRole('gridcell', { name: 'Saturday, 5 September 2020' })).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('/10');
      expect(getByRole('gridcell', { name: 'Monday, 5 October 2020' })).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('/2022');
      expect(getByRole('gridcell', { name: 'Wednesday, 5 October 2022' })).toHaveAttribute('aria-selected', 'true');
    });

    it('should correctly update the calendar when typing D/M/Y & D/M/YY', async () => {
      const { getByRole, user } = render({ initialDate: new Date('Sept 04 2020'), locale: 'en-GB' });

      await user.click(getByRole('combobox', { name: 'date picker' }));
      await user.clear(getByRole('combobox', { name: 'date picker' }));
      expect(getByRole('gridcell', { name: 'Friday, 4 September 2020' })).toHaveAttribute('aria-selected', 'true');

      getByRole('combobox', { name: 'date picker' }).focus();

      await user.keyboard('5');
      expect(getByRole('gridcell', { name: 'Saturday, 5 September 2020' })).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('/1');
      expect(getByRole('gridcell', { name: 'Sunday, 5 January 2020' })).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('/2');
      expect(getByRole('gridcell', { name: 'Saturday, 5 January 2002' })).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('2');
      expect(getByRole('gridcell', { name: 'Wednesday, 5 January 2022' })).toHaveAttribute('aria-selected', 'true');
    });

    it('should not go past the minimum date when typing in the input', async () => {
      const { getByRole, user } = render({ minDate: new Date('Sep 04 2001'), locale: 'en-GB' });

      await user.click(getByRole('combobox', { name: 'date picker' }));
      await user.type(getByRole('combobox', { name: 'date picker' }), '09/03/1994');

      expect(getByRole('gridcell', { name: 'Tuesday, 4 September 2001' })).toHaveAttribute('aria-selected', 'true');
    });

    it('should not go past the maximum date when typing in the input', async () => {
      const { getByRole, user } = render({ maxDate: new Date('Sep 04 2001'), locale: 'en-GB' });

      await user.click(getByRole('combobox', { name: 'date picker' }));
      await user.type(getByRole('combobox', { name: 'date picker' }), '09/03/2004');

      expect(getByRole('gridcell', { name: 'Tuesday, 4 September 2001' })).toHaveAttribute('aria-selected', 'true');
    });
  });
});
