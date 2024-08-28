import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/widgets/dropdown/calendarDropdown/CalendarDropdown.module.scss';
import '@/widgets/dropdown/calendarDropdown/custom-date-picker-style.module.scss';
import classNames from 'classnames/bind';
import { CalendarDropdownProps } from '@/shared/types/ui/Dropdown';

const cn = classNames.bind(styles);

const CalendarDropdown = ({
  labelIcon,
  initialStartDate,
  initialEndDate,
  onDateChange,
  buttonImage,
}: CalendarDropdownProps) => {
  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const [startDate, setStartDate] = useState<Date | undefined>(
    initialStartDate,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setStartDate(initialStartDate);
  }, [initialStartDate]);

  useEffect(() => {
    setEndDate(initialEndDate);
  }, [initialEndDate]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start ?? undefined);
    setEndDate(end ?? undefined);
    onDateChange(start ?? undefined, end ?? undefined);
    setOpen(false);
  };

  return (
    <div className={cn('calendar-dropdown-container')}>
      <div className={cn('calendar-label')}>
        {labelIcon && <img src={labelIcon} className={cn('label-icon')}></img>}
        <span className={cn('date-range-label')}>
          {startDate && endDate
            ? `${formatDate(startDate)} - ${formatDate(endDate)}`
            : 'Select a date range'}
        </span>
        <button
          onClick={() => setOpen(!open)}
          className={cn('dropdown-button')}
        >
          <img src={buttonImage} alt="open calendar" />
        </button>
      </div>
      {open && (
        <div className={cn('dropdown-content')}>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            dateFormat="yyyy/MM/dd"
            className={cn('custom-datepicker')}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarDropdown;
