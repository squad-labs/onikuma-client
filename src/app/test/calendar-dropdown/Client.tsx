'use client';
import React from 'react';
import styles from '@/app/test/calendar-dropdown/page.module.scss';
import className from 'classnames/bind';
import CalendarDropdown from '@/widgets/dropdown/calendarDropdown';

const cn = className.bind(styles);

const TestClientPage = () => {
  return (
    <div className={cn('container')}>
      <h2>Calendar Dropdown</h2>
      <section className={cn('element-container')}>
        <CalendarDropdown
          labelIcon="/icons/calendar-icon.svg"
          initialStartDate={new Date('2024-03-05')}
          initialEndDate={new Date('2024-06-05')}
          onDateChange={(start, end) => {
            console.log('Selected Date Range:', start, 'to', end);
          }}
          buttonImage="/icons/chevron-dropdown-icon.svg"
        />
      </section>
    </div>
  );
};

export default TestClientPage;
