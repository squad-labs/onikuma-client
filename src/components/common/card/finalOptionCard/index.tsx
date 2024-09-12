import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import styles from '@/components/common/card/finalOptionCard/FinalOptionCard.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import PriceInfoCard from '@/components/common/card/priceInfoCard';
import BaseButton from '@/widgets/button/baseButton';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, OPEN_MODAL } from '@/context/global/slice/modalSlice';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { postPoolIn } from '@/shared/api/Activity';
import { handleNumberUpdate } from '@/shared/utils/number';

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
  title: string;
  value: string;
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
  value,
  baseTokenName,
  roundTicker,
  roundTokenName,
  roundTokenPrice,
}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [tokenAmount, setTokenAmount] = useState<number | ''>(0);
  const [tokenPrice, setTokenPrice] = useState<string>(tokenAmount.toString());
  const { mintToken, getTokenPrice } = useContext(RoundContext);

  const poolInMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_POOL_IN],
    mutationFn: postPoolIn,
    onSuccess: () => {
      dispatch(CLOSE_MODAL());
    },
    onError: () => {},
  });

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const _value = handleNumberUpdate(event.target.value);
    setTokenAmount(_value);
  }, []);

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
          type={'bottom'}
          title={roundTokenName}
          ticker={`$${roundTicker}`}
          imageUrl={imageUrl}
          price={tokenAmount.toString()}
          setPrice={handleOnChange}
        />
        <PriceInfoCard
          type={'top'}
          title={baseTokenName}
          ticker={`$${baseTicker}`}
          imageUrl={imageUrl}
          price={tokenPrice}
          setPrice={handleOnChange}
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
            dispatch(
              OPEN_MODAL({
                name: 'PoolInModal',
                data: {
                  topicId: topicId,
                  title: title,
                  value: value,
                  imageUrl: imageUrl,
                  poolAmount: 100,
                  baseTicker: 'HONEY',
                  baseTokenName: 'HONEY',
                  baseTokenPrice: 0.002,
                  roundTicker: roundTicker,
                  roundTokenName: roundTokenName,
                  roundTokenPrice: roundTokenPrice,
                },
              }),
            );
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
