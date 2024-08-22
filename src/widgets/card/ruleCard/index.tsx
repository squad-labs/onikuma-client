import React from 'react';
import styles from '@/widgets/card/ruleCard/RuleCard.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type RuleCardProps = {
  photo: string;
  textLine1: string;
  textLine2: string;
  textLine3: string;
};

const RuleCard = ({
  photo,
  textLine1,
  textLine2,
  textLine3,
}: RuleCardProps) => {
  return (
    <div className={cn('card')}>
      <div className={cn('photo')}>
        <img src={photo} alt="Rule Card" />
      </div>
      <div className={cn('text')}>
        <p>{textLine1}</p>
        <h2>{textLine2}</h2>
        <p>{textLine3}</p>
      </div>
    </div>
  );
};

export default RuleCard;