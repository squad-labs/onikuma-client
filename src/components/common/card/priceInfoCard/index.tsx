import React from 'react';
import styles from '@/components/common/card/priceInfoCard/PriceInfoCard.module.scss';
import classNames from 'classnames/bind';
import BaseBedge from '@/widgets/bedge/baseBedge';
import BaseText from '@/widgets/text/baseText';
import Image from 'next/image';

const cn = classNames.bind(styles);

type Props = {
  type: 'top' | 'bottom';
  title: string;
  ticker: string;
  imageUrl: string;
  price: string;
};

const PriceInfoCard = ({ type, title, ticker, imageUrl, price }: Props) => {
  return (
    <div className={cn('card-container')}>
      <div className={cn('top-inner')}>
        <BaseBedge
          padding="long"
          color={{ primary: 'DARK', secondary: 'LIGHT' }}
        >
          <div className={cn('tag-inner')}>
            <Image src={imageUrl} width={24} height={24} alt="coin" />
            <BaseText text={title} size="small" weight="bold" color="DARK" />
            <BaseText
              text={ticker}
              size="small"
              weight="light"
              color={'BASE_GRAY_1'}
            />
          </div>
        </BaseBedge>
        <BaseText text={price} size="large" weight="bold" color="DARK" />
      </div>
      <div className={cn('bot-container')}>
        <div className={cn('text-wrapper')}>
          <BaseText text={`${title} Price`} size="medium" weight="light" color="DARK_GRAY_5" />
          <BaseText text={`$1 HONEY`} size="medium" weight="light" color="DARK" />
          <BaseText text={`$2,027.87`} size="medium" weight="light" color="DARK_GRAY_5" />
          <BaseText text={`+0%`} size="medium" weight='regular' color="BASE_RED_1" />
        </div>
        <div className={cn('text-wrapper')}>
          <BaseText text={`My Balance`} size="medium" weight="light" color="DARK_GRAY_5" />
          <BaseText text={`$1 TRUMP`} size="medium" weight="light" color="DARK" />
          <BaseText text={`$2,027.87 HONEY`} size="medium" weight='regular' color="DARK_GRAY_5" />
          {type === 'top' && <BaseText text={`max`} size="medium" weight='regular' color="BASE_RED_1" />}
        </div>
      </div>
    </div>
  );
};

export default PriceInfoCard;
