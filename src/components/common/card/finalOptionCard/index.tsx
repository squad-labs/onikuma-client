import React, { useCallback } from 'react';
import styles from '@/components/common/card/finalOptionCard/FinalOptionCard.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import PriceInfoCard from '@/components/common/card/priceInfoCard';
import BaseButton from '@/widgets/button/baseButton';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { postPoolIn } from '@/shared/api/Activity';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '@/context/global/slice/modalSlice';

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
  title: string;
  imageUrl: string;
  poolAmount: number;
  baseTicker: string;
  baseTokenPrice: string;
  baseTokenName: string;
  roundTokenName: string;
  roundTicker: string;
  roundTokenPrice: string;
};

const FinalOptionCard = ({
  topicId,
  title,
  imageUrl,
  baseTicker,
  poolAmount,
  baseTokenName,
  baseTokenPrice,
  roundTicker,
  roundTokenName,
  roundTokenPrice,
}: Props) => {
  const dispatch = useDispatch()
  const router = useRouter();

  return (
    <div className={cn('card-container')}>
      <div className={cn('text-wrapper')}>
        <BaseText
          text="Now the real game begins"
          color={'DARK'}
          size={'large'}
          weight={'regular'}
        />
      </div>
      <div className={cn('text-wrapper')}>
        <BaseText
          text="This is not the end of the game..."
          color={'DARK'}
          size={'medium'}
          weight={'regular'}
        />
      </div>
      <div className={cn('text-wrapper')}>
        <BaseText
          text="Guess who will win the most TVL and pool in it!"
          color={'DARK'}
          size={'medium'}
          weight={'regular'}
        />
      </div>
      <div className={cn('info-container')}>
        <PriceInfoCard
          type={'top'}
          title={baseTokenName}
          ticker={`$${baseTicker}`}
          imageUrl="https://s2.coinmarketcap.com/static/img/coins/64x64/10948.png"
          price={baseTokenPrice}
        />
        <PriceInfoCard
          type={'bottom'}
          title={roundTokenName}
          ticker={`$${roundTicker}`}
          imageUrl="https://s2.coinmarketcap.com/static/img/coins/64x64/10948.png"
          price={roundTokenPrice}
        />
      </div>
      <div className={cn('button-container')}>
        <BaseButton
          text={'Pool in'}
          shape="shape-4"
          label="pool-in-button"
          colors={{ primary: 'BASE_BLUE_1', secondary: 'BASE_CREAM_1' }}
          theme="fill"
          fontSize="large"
          fontWeight="regular"
          onClick={() => {
            dispatch(OPEN_MODAL({
              name: 'PoolInModal',
              data: {
                topicId: topicId,
                title: title,
                imageUrl: imageUrl,
                poolAmount: 100, 
                baseTicker: 'HONEY',
                baseTokenName: 'HONEY',
                baseTokenPrice: 0.002,
                roundTicker: 'VITA',
                roundTokenName: 'VITALIK',
                roundTokenPrice: 0.001,
              }
            }))
          }}
        />
        <BaseButton
          text={'Dashboard'}
          shape="shape-4"
          label="dashboard-button"
          colors={{ primary: 'BASE_BLUE_1', secondary: 'BASE_CREAM_1' }}
          theme="outline"
          fontSize="large"
          fontWeight="regular"
          onClick={() => router.push(`/d/${topicId}`)}
        />
      </div>
    </div>
  );
};

export default FinalOptionCard;
