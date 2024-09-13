import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from '@/components/common/modal/poolInModal/PoolInModal.module.scss';
import classNames from 'classnames/bind';
import { PoolInModalProps } from '@/shared/types/ui/Modal';
import BaseModal from '@/widgets/modal/baseModal';
import BaseText from '@/widgets/text/baseText';
import Image from 'next/image';
import PriceInfoCard from '@/components/common/card/priceInfoCard';
import BaseButton from '@/widgets/button/baseButton';
import { CLOSE_MODAL } from '@/context/global/slice/modalSlice';
import { useDispatch } from 'react-redux';
import useOnClickOutside from '@/shared/hooks/useOnClick';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { getTokenData, postPoolIn } from '@/shared/api/Activity';
import { useMutation, useQuery } from '@tanstack/react-query';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { useRouter } from 'next/navigation';
import { handleNumberUpdate } from '@/shared/utils/number';
import { QUERY_KEY } from '@/shared/constants/QUERY_KEY';

const cn = classNames.bind(styles);

const PoolInModal = ({
  topicId,
  title,
  value,
  imageUrl,
  baseTicker,
  baseTokenName,
  roundTicker,
  roundTokenName,
}: PoolInModalProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [tokenAmount, setTokenAmount] = useState<number | ''>('');
  const [tokenPrice, setTokenPrice] = useState<string>(tokenAmount.toString());
  const { mintToken, getTokenPrice } = useContext(RoundContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_PRICE, topicId],
    queryFn: () => getTokenData({ topicId }),
  });

  const handleCloseModal = useCallback(() => {
    dispatch(CLOSE_MODAL());
  }, [dispatch]);

  const poolInMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_POOL_IN],
    mutationFn: postPoolIn,
    onSuccess: (data) => {
      dispatch(CLOSE_MODAL());
    },
    onError: () => {},
  });

  const handlePoolIn = useCallback(() => {
    if (tokenAmount !== 0 && tokenAmount !== '' && tokenAmount !== undefined) {
      poolInMutation.mutate({
        topicId: topicId,
        topicToken: tokenAmount,
        reserveToken: parseInt(tokenPrice),
        pickerName: value,
      });
    }
  }, [topicId, tokenAmount, tokenPrice, title, value]);

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const _value = handleNumberUpdate(event.target.value);
    setTokenAmount(_value);
  }, []);

  useOnClickOutside({
    ref: modalRef,
    handler: handleCloseModal,
    mouseEvent: 'click',
  });

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
    <BaseModal background="DARK_OPACITY_5">
      <div className={cn('modal-inner')} ref={modalRef}>
        <p className={cn('modal-title')}>{title}</p>
        <div className={cn('text-container')}>
          <BaseText
            text="Guess who will win the most TVL and pool in it!"
            size="large"
            color="DARK_GRAY_2"
            weight="regular"
          />
        </div>
        <div className={cn('mid-container')}>
          <div className={cn('image-container')}>
            <Image
              src={imageUrl}
              alt="image"
              width={1200}
              height={1200}
              priority={true}
              className={cn('image')}
            />
          </div>
          <div className={cn('card-container')}>
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
                balance: '0',
                percent: '0',
              }}
            />
          </div>
        </div>
        <div className={cn('button-container')}>
          <BaseButton
            text={'Pool in'}
            disabled={tokenAmount === 0 || tokenAmount === ''}
            label="pool-in-button"
            colors={{ primary: 'BASE_BLUE_1', secondary: 'BASE_CREAM_1' }}
            theme="fill"
            fontSize="large"
            fontWeight="regular"
            shape="shape-4"
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
    </BaseModal>
  );
};

export default PoolInModal;
