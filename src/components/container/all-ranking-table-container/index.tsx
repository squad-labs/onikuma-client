import React, { useMemo } from 'react';
import styles from '@/components/container/all-ranking-table-container/AllRankingTableContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import Image from 'next/image';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';

const cn = classNames.bind(styles);

const rankingsData = [
  { rank: 1, walletAddress: '0x67812...6fC6', onigiri: '1.77b' },
  { rank: 2, walletAddress: '0x67812...6fC6', onigiri: '1.77b' },
  { rank: 3, walletAddress: '0x67812...6fC6', onigiri: '1.77b' },
  { rank: 4, walletAddress: '0x67812...6fC6', onigiri: '1.77b' },
  { rank: 5, walletAddress: '0x67812...6fC6', onigiri: '1.77b' },
  { rank: 6, walletAddress: '0x67812...6fC6', onigiri: '1.77b' },
  { rank: 7, walletAddress: '0x67812...6fC6', onigiri: '1.77b' },
];

const AllRankingTableContainer = () => {
  return (
    <div className={cn('container')}>
      <div className={cn('table-header')}>
        <div className={cn('header-wrapper')}>
          <div className={cn('header-inner-left')}>
            <div className={cn('h-my-ranking')}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="regular"
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
            </div>
            <div className={cn('h-wallet-address')}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="regular"
                text="Wallet Address"
              />
            </div>
          </div>
          <div className={cn('header-inner-right')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="regular"
              text="Onigiri"
            />
          </div>
        </div>
      </div>
      <div className={cn('table-body')}>
        {rankingsData.map((item, index) => (
          <div className={cn('list-item')}>
            <div className={cn('item-inner-left')}>
              <div className={cn('i-my-ranking')}>
                <BaseText
                  size="medium"
                  color="DARK"
                  weight="regular"
                  text={item.rank.toString()}
                />
              </div>
              <div className={cn('i-wallet-address')}>
                <BaseText
                  size="medium"
                  color="DARK"
                  weight="regular"
                  text={item.walletAddress}
                />
              </div>
            </div>
            <div className={cn('item-inner-right')}>
              <BaseText
                size="medium"
                color="DARK"
                weight="regular"
                text={item.onigiri}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRankingTableContainer;
