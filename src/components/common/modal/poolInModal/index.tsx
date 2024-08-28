import React, { useCallback, useRef } from 'react';
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
import { postPoolIn } from '@/shared/api/Activity';
import { useMutation } from '@tanstack/react-query';

const cn = classNames.bind(styles);

const PoolInModal = ({
  topicId,
  title,
  value,
  imageUrl,
  poolAmount,
  baseTicker,
  baseTokenName,
  baseTokenPrice,
  roundTicker,
  roundTokenName,
  roundTokenPrice,
}: PoolInModalProps) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleCloseModal = useCallback(() => {
    dispatch(CLOSE_MODAL());
  }, [dispatch]);

  const poolInMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_POOL_IN],
    mutationFn: postPoolIn,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handlePoolIn = useCallback(() => {
    poolInMutation.mutate({
      topicId: topicId,
      topicToken: poolAmount,
      reserveToken: 100,
      pickerName: value,
    });
  }, [topicId, poolAmount, title, value]);

  useOnClickOutside({
    ref: modalRef,
    handler: handleCloseModal,
    mouseEvent: 'click',
  });
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
        </div>
        <div className={cn('button-container')}>
          <BaseButton
            text={'Pool in'}
            label="pool-in-button"
            colors={{ primary: 'BASE_BLUE_1', secondary: 'BASE_CREAM_1' }}
            theme="fill"
            fontSize="large"
            fontWeight="regular"
            shape="shape-4"
            onClick={() => {
              handlePoolIn();
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
            onClick={() => {}}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default PoolInModal;
