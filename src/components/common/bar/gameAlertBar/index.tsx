import React from 'react';
import styles from '@/components/common/bar/gameAlertBar/GameAlertBar.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const GameAlertBar = () => {
  return (
    <div className={cn('bar-container')}>
      <p className={cn('bar-text')}>
        0x67812...66fC6 pooled in $2,000 HONEY to Donald Trump 2 minutes ago
      </p>
    </div>
  );
};

export default GameAlertBar;
