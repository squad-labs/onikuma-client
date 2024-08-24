import React, { Fragment, useMemo } from 'react';
import styles from '@/widgets/text/dateText/DateText.module.scss';
import classNames from 'classnames/bind';
import CalendarIcon from '@/assets/icons/calendar.svg';
import { DateTextProps } from '@/shared/types/ui/Text';
import { COLOR } from '@/shared/constants/COLOR';

const cn = classNames.bind(styles);

const DateText = ({
  startDate,
  endDate = undefined,
  isUTC = true,
  withIcon = true,
  size = 'medium',
  weight,
  color,
}: DateTextProps) => {
  const sDate = useMemo(() => {
    return startDate;
  }, [isUTC]);

  const eDate = useMemo(() => {
    return endDate;
  }, [isUTC]);

  const inlineStyle = {
    color: COLOR[color],
  };

  return (
    <div className={cn('text-container')}>
      {withIcon && <CalendarIcon className={cn('icon')} viewBox="0 0 24 24" />}
      <span
        className={cn('text', 'start', `text-${size}`, `text-${weight}`)}
        style={inlineStyle}
      >
        {sDate}
      </span>
      {eDate && (
        <Fragment>
          <span
            className={cn('seperator', `text-${size}`, `text-${weight}`)}
            style={inlineStyle}
          >
            ~
          </span>
          <span
            className={cn('text', `text-${size}`, `text-${weight}`)}
            style={inlineStyle}
          >
            {eDate}
          </span>
        </Fragment>
      )}
    </div>
  );
};

export default DateText;
