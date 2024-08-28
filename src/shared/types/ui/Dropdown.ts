import React from 'react';

export type BaseDropdownProps = {
  label: string;
  labelIcon?: string;
  options: string[];
  optionIcons?: string[];
  onSelect: (option: string) => void;
  urls?: string[];
  buttonImage: string;
};

export type CalendarDropdownProps = {
  label?: string;
  labelIcon?: string;
  buttonImage: string;
  initialStartDate: Date | undefined;
  initialEndDate: Date | undefined;
  onDateChange: (
    startDate: Date | undefined,
    endDate: Date | undefined,
  ) => void;
};
