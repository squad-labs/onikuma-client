import React, { useMemo } from 'react';
import styles from '@/components/common/bar/gameDateBar/GameDateBar.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';
import { monthTextMap } from '@/shared/utils/date';

type Props = {
  id: string;
  startDate: string;
  endDate?: string;
};

const cn = classNames.bind(styles);

const GameDateBar = ({ id, startDate, endDate }: Props) => {
  console.log('start', startDate);
  const month = useMemo(() => {
    const key = startDate.slice(5, 7);
    return monthTextMap[key as keyof typeof monthTextMap] ?? '';
  }, [id, startDate]);

  const year = useMemo(() => {
    return startDate.slice(0, 4);
  }, [id, startDate]);

  const date = useMemo(() => {
    return startDate.slice(8, 10);
  }, [id, startDate]);

  return (
    <div className={cn('bar-container')}>
      <Image
        src={getStaticSrc('icon', ICON_SRC_PATH.SRC.CALENDAR)}
        alt="calendar"
        width={24}
        height={24}
        priority
        className={cn('icon')}
      />
      <span className={cn('text')}>
        {month} {date} {year}, 00:00:00 ~ 23:59:59 UTC
      </span>
    </div>
  );
};

export default GameDateBar;
