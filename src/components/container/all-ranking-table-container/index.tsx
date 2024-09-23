import React, { Fragment, useEffect, useState } from 'react';
import styles from '@/components/container/all-ranking-table-container/AllRankingTableContainer.module.scss';
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
  leaders: LeaderItems[];
};

const AllRankingTableContainer = ({ leaders }: Props) => {
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
                <Fragment>
                  <BaseText
                    size="medium"
                    color="BASE_BLUE_1"
                    weight="bold"
                    text="Ranking"
                  />
                  <Image
                    src={getStaticSrc('icon', ICON_SRC_PATH.SRC.DOWNLOAD)}
                    alt="download"
                    width={14}
                    height={14}
                    priority
                    className={cn('icon')}
                  />
                </Fragment>
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
      <div className={cn('table-body')} id="container">
        {leaders?.map((item: LeaderItems, index: number) => {
          const rank = index + 1;
          return (
            <div className={cn('list-item')} key={index}>
              <div className={cn('item-inner-left')}>
                <div className={cn('i-my-ranking')}>
                  <BaseText
                    size="medium"
                    color="DARK"
                    weight="bold"
                    text={rank.toString()}
                  />
                </div>
                <div className={cn('i-wallet-address')}>
                  <BaseText
                    size="medium"
                    color="DARK"
                    weight="regular"
                    text={item.wallet ? getShortenAddress(item.wallet) : '-'}
                  />
                </div>
              </div>
              <div className={cn('item-inner-right')}>
                <BaseText
                  size="medium"
                  color="DARK"
                  weight="regular"
                  text={item.point ? thousandFormat(item.point) : '-'}
                />
              </div>
            </div>
          );
        })}
        <div id="observer-block"></div>
      </div>
    </div>
  );
};

export default AllRankingTableContainer;
