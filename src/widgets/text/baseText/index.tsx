import React from 'react';
import styles from '@/widgets/text/baseText/BaseText.module.scss';
import classNames from 'classnames/bind';
import { BaseTextProps } from '@/shared/types/ui/Text';
import { COLOR } from '@/shared/constants/COLOR';

const cn = classNames.bind(styles);

const BaseText = ({
  text,
  color,
  weight,
  size = 'medium',
  classNames = [],
  icon = undefined,
}: BaseTextProps) => {
  return (
    <div className={cn('text-container')}>
      {icon && icon}
      <span
        className={cn('text', `text-${size}`, `text-${weight}`, ...classNames)}
        style={{
          color: COLOR[color],
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default BaseText;
