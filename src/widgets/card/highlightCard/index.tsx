import React from 'react';
import styles from '@/widgets/card/highlightCard/HighlightCard.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type HighlightCardProps = {
  title: string;
  mainText: string;
  subText: string;
};

const HighlightCard = ({ title, mainText, subText }: HighlightCardProps) => {
  return (
    <div className={cn('card')}>
      <p className={cn('title')}>{title}</p>
      <div className={cn('non-title')}>
        <p className={cn('main-text')}>{mainText}</p>
        <p className={cn('sub-text')}>{subText}</p>
      </div>
    </div>
  );
};

export default HighlightCard;
