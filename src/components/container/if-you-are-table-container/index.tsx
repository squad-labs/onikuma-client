import React, { useMemo } from 'react';
import styles from '@/components/container/if-you-are-table-container/IfYouAreTableContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';

const cn = classNames.bind(styles);

const Data = [
  { ifYouAre: 'ONIKUMA GENESIS NFT HOLDER', multipliers: 'x2' },
  { ifYouAre: 'Holding more than 2 ONIKUMA GENESIS NFT', multipliers: 'x3' },
  { ifYouAre: 'Holding Berachain NFT', multipliers: '1.5x' },
  { ifYouAre: 'Winner of the Contest', multipliers: '100x' },
  { ifYouAre: 'Participation', multipliers: '1.15x' },
];

const IfYouAreTableContainer = () => {
  return (
    <div className={cn('container')}>
      <div className={cn('table-header')}>
        <div className={cn('header-wrapper')}>
          <div className={cn('header-inner-left')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="regular"
              text="If you are..."
            />
          </div>
          <div className={cn('header-inner-right')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="regular"
              text="Multipliers"
            />
          </div>
        </div>
      </div>
      <div className={cn('table-body')}>
        {Data.map((item, index) => (
          <div className={cn('list-item')}>
            <div className={cn('item-inner-left')}>
              <BaseText
                size="medium"
                color="DARK"
                weight="regular"
                text={item.ifYouAre}
              />
            </div>
            <div className={cn('item-inner-right')}>
              <BaseText
                size="medium"
                color="DARK"
                weight="regular"
                text={item.multipliers}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IfYouAreTableContainer;
