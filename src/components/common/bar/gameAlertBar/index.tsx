import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/components/common/bar/gameAlertBar/GameAlertBar.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import { useDispatch } from 'react-redux';
import { REMOVE_ALERT_DATA } from '@/context/global/slice/alertSlice';
import { getShortenAddress } from '@/shared/utils/format';

const cn = classNames.bind(styles);

type Props = {
  alertId: string;
  address: string;
  amount: number;
  ticker: string;
  pickerName: string;
  createAt: string;
};

const GameAlertBar = ({
  alertId,
  address,
  ticker,
  amount,
  pickerName,
  createAt,
}: Props) => {
  const dispatch = useDispatch();
  const [isHide, setIsHide] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsHide(true);
    setTimeout(() => {
      dispatch(REMOVE_ALERT_DATA({ alertId }));
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 3000);
  }, []);

  return (
    <div className={cn('bar-wrapper', isHide && 'bar-wrapper-hide')}>
      <div className={cn('bar-container')}>
        <BaseText
          text={`${getShortenAddress(address)} pooled in `}
          color={'DARK_GRAY_5'}
          size={'medium'}
          weight={'regular'}
          classNames={['white-space']}
        />
        <BaseText
          text={`$${amount} ${ticker}`}
          color={'DARK_GRAY_5'}
          size={'medium'}
          weight={'bold'}
          classNames={['white-space']}
        />
        <BaseText
          text={`to`}
          color={'DARK_GRAY_5'}
          size={'medium'}
          weight={'regular'}
          classNames={['white-space']}
        />
        <BaseText
          text={`${pickerName} at ${createAt}`}
          color={'DARK_GRAY_5'}
          size={'medium'}
          weight={'bold'}
          classNames={['white-space']}
        />
      </div>
    </div>
  );
};

export default GameAlertBar;
