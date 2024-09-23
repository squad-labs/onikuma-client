import React, { useEffect, useMemo, useState } from 'react';
import styles from '@/components/container/my-ranking-table-container/MyRankingTableContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import Image from 'next/image';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';
import { LeaderItems } from '@/shared/types/data/leaderboard';
import { getShortenAddress } from '@/shared/utils/format';
import { thousandFormat } from '@/shared/utils/number';

const cn = classNames.bind(styles);

type Props = {
  myItem?: LeaderItems & {
    ranking: number;
  };
};

const MyRankingTableContainer = ({ myItem }: Props) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={cn('container')}>
      <div className={cn('table-header')}>
        <div className={cn('header-wrapper')}>
          <div className={cn('header-inner-left')}>
            <div className={cn('h-my-ranking')}>
              {width > 768 ? (
                <BaseText
                  size="medium"
                  color="BASE_BLUE_1"
                  weight="bold"
                  text="My Ranking"
                />
              ) : (
                <Image
                  src={getStaticSrc('icon', ICON_SRC_PATH.SRC.MEDAL)}
                  alt="ranking"
                  width={24}
                  height={24}
                  priority
                  className={cn('icon')}
                />
              )}
            </div>
            <div className={cn('h-wallet-address')}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="bold"
                text="Wallet Address"
              />
            </div>
          </div>
          <div className={cn('header-inner-right')}>
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.ONIGIRI)}
              alt="onigiri"
              width={28}
              height={28}
              priority
              className={cn('icon')}
            />
          </div>
        </div>
      </div>
      <div className={cn('table-body')}>
        <div className={cn('list-item')}>
          <div className={cn('item-inner-left')}>
            <div className={cn('i-my-ranking')}>
              <BaseText
                size="medium"
                color="DARK"
                weight="bold"
                text={myItem ? myItem.ranking.toString() : '-'}
              />
            </div>
            <div className={cn('i-wallet-address')}>
              <BaseText
                size="medium"
                color="DARK"
                weight="regular"
                text={myItem ? getShortenAddress(myItem.wallet) : '-'}
              />
            </div>
          </div>
          <div className={cn('item-inner-right')}>
            <BaseText
              size="medium"
              color="DARK"
              weight="regular"
              text={myItem ? thousandFormat(myItem.point) : '-'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRankingTableContainer;
