import React, { ChangeEvent } from 'react';
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
  setPrice: (event: ChangeEvent<HTMLInputElement>) => void;
  meta?: {
    price: string;
    balance: string;
    percent: string;
  };
};

const PriceInfoCard = ({
  type,
  title,
  ticker,
  imageUrl,
  price,
  setPrice,
  meta,
}: Props) => {
  return (
    <div className={cn('card-container')}>
      <div className={cn('top-inner')}>
        <BaseBedge
          padding="long"
          color={{ primary: 'DARK', secondary: 'LIGHT' }}
        >
          <div className={cn('tag-inner')}>
            <Image
              src={imageUrl}
              width={28}
              height={28}
              alt="coin"
              className={cn('image')}
            />
            <BaseText text={title} size="medium" weight="bold" color="DARK" />
            <BaseText
              text={ticker}
              size="medium"
              weight="light"
              color={'BASE_GRAY_1'}
            />
          </div>
        </BaseBedge>
        <input
          value={price}
          type="text"
          placeholder="0.0"
          onChange={(event) => setPrice(event)}
          className={cn('input', type)}
          disabled={type === 'top'}
        />
      </div>
      <div className={cn('bot-container')}>
        <div className={cn('text-wrapper')}>
          <BaseText
            text={`${title} Price`}
            size="medium"
            weight="light"
            color="DARK_GRAY_5"
          />
          <BaseText
            text={`$${meta?.price} HONEY`}
            size="medium"
            weight="light"
            color="DARK"
          />
          <BaseText
            text={`+${meta?.percent}%`}
            size="medium"
            weight="regular"
            color="BASE_RED_1"
          />
        </div>
        <div className={cn('text-wrapper')}>
          <BaseText
            text={`My Balance`}
            size="medium"
            weight="light"
            color="DARK_GRAY_5"
          />
          <BaseText
            text={`${title}`}
            size="medium"
            weight="light"
            color="DARK"
          />
          <BaseText
            text={`${meta?.balance}`}
            size="medium"
            weight="regular"
            color="DARK_GRAY_5"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceInfoCard;
