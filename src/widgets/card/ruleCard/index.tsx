'use client';
import React, { ReactNode } from 'react';
import styles from '@/widgets/card/ruleCard/RuleCard.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type RuleCardProps = {
  textLine1: string;
  textLine2: string;
  textLine3: string;
  children: ReactNode;
};

const RuleCard = ({
  children,
  textLine1,
  textLine2,
  textLine3,
}: RuleCardProps) => {
  return (
    <div className={cn('card')}>
      <div className={cn('photo')}>{children}</div>
      <div className={cn('text')}>
        <p className={cn('step')}>{textLine1}</p>
        <h2 className={cn('title')}>{textLine2}</h2>
        <p className={cn('content')}>{textLine3}</p>
      </div>
    </div>
  );
};

export default RuleCard;
