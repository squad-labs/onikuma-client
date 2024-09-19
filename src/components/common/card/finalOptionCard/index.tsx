import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from '@/components/common/card/finalOptionCard/FinalOptionCard.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import PriceInfoCard from '@/components/common/card/priceInfoCard';
import BaseButton from '@/widgets/button/baseButton';
import { useRouter } from 'next/navigation';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { getTokenData, postPoolIn } from '@/shared/api/Activity';
import { handleNumberUpdate } from '@/shared/utils/number';
import { QUERY_KEY } from '@/shared/constants/QUERY_KEY';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '@/context/global/slice/modalSlice';

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
}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [tokenAmount, setTokenAmount] = useState<number | ''>(0);
  const [tokenPrice, setTokenPrice] = useState<string>(tokenAmount.toString());
  const { mintToken, getTokenPrice } = useContext(RoundContext);

  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_PRICE, topicId],
    queryFn: () => getTokenData({ topicId }),
  });

  const poolInMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_POOL_IN],
    mutationFn: postPoolIn,
    onSuccess: (data) => {
      dispatch(CLOSE_MODAL());
      console.log(data);
    },
    onError: () => {},
  });

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const _value = handleNumberUpdate(event.target.value);
    setTokenAmount(_value);
  }, []);

  const handlePoolIn = useCallback(() => {
    if (tokenAmount !== 0 && tokenAmount !== '' && tokenAmount !== undefined) {
      poolInMutation.mutate({
        topicId: topicId,
        topicToken: tokenAmount,
        reserveToken: parseFloat(tokenPrice),
        pickerName: value,
      });
    }
  }, [topicId, tokenAmount, tokenPrice, title, value]);

  useEffect(() => {
    if (tokenAmount === undefined || tokenAmount === '' || tokenAmount === 0) {
      setTokenPrice('0');
      return;
    }
    const _getTokenPrice = async () => {
      const token = await getTokenPrice(tokenAmount.toString());
      if (token === undefined) setTokenPrice('0');
      else setTokenPrice(String(token));
    };
    _getTokenPrice();
  }, [tokenAmount]);

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
      {data && (
        <div className={cn('info-container')}>
          <PriceInfoCard
            type={'bottom'}
            title={roundTokenName}
            ticker={`$${roundTicker}`}
            imageUrl={imageUrl}
            price={tokenAmount.toString()}
            setPrice={handleOnChange}
            meta={{
              price: data.price,
              balance: data.myBalance,
              percent: (
                ((data.price - data.initialPrice) / data.initialPrice) *
                100
              ).toString(),
            }}
          />
          <PriceInfoCard
            type={'top'}
            title={baseTokenName}
            ticker={`$${baseTicker}`}
            imageUrl={imageUrl}
            price={tokenPrice}
            setPrice={handleOnChange}
            meta={{
              price: '1',
              balance: data.myBalanceHoney,
              percent: data.myBalanceHoney,
            }}
          />
        </div>
      )}
      <div className={cn('button-container')}>
        <BaseButton
          disabled={tokenAmount === 0 || tokenAmount === ''}
          text={'Pool in'}
          shape="shape-4"
          label="pool-in-button"
          colors={{ primary: 'BASE_BLUE_1', secondary: 'BASE_CREAM_1' }}
          theme="fill"
          fontSize="large"
          fontWeight="regular"
          onClick={() => {
            mintToken(handlePoolIn);
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
