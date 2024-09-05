import React, { Fragment, useMemo } from 'react';
import styles from '@/widgets/text/dateText/DateText.module.scss';
import classNames from 'classnames/bind';
import { DateTextProps } from '@/shared/types/ui/Text';
import { COLOR } from '@/shared/constants/COLOR';
import Image from 'next/image';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';

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
      {withIcon && (
        <Image
          src={getStaticSrc('icon', ICON_SRC_PATH.SRC.CALENDAR)}
          alt="calendar"
          width={24}
          height={24}
          priority
          className={cn('icon')}
        />
      )}
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
