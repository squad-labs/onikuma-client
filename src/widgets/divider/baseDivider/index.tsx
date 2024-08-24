import React from 'react';
import styles from '@/widgets/divider/baseDivider/BaseDivider.module.scss';
import classNames from 'classnames/bind';
import { BaseDividerProps } from '@/shared/types/ui/Divider';
import { COLOR } from '@/shared/constants/COLOR';

const cn = classNames.bind(styles);

const BaseDivider = ({
  type,
  color,
  length = 100,
  minLength = 0,
  thick = 2,
  radius = 0,
}: BaseDividerProps) => {
  const getDivider = () => {
    if (type === 'horizontal') {
      return (
        <div
          className={cn('divider', 'divider-horizontal')}
          style={{
            width: `${length}%`,
            minWidth: minLength,
            height: thick,
            backgroundColor: COLOR[color],
            borderRadius: radius,
          }}
        />
      );
    } else {
      return (
        <div
          className={cn('divider', 'divider-vertical')}
          style={{
            height: `${length}%`,
            minHeight: minLength,
            width: thick,
            backgroundColor: COLOR[color],
            borderRadius: radius,
          }}
        />
      );
    }
  };
  return getDivider();
};

export default BaseDivider;
