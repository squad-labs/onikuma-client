import React, { useCallback, useMemo, useRef } from 'react';
import styles from '@/components/common/modal/poolResultModal/PoolResultModal.module.scss';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import BaseModal from '@/widgets/modal/baseModal';
import BaseText from '@/widgets/text/baseText';
import { PoolResultModalProps } from '@/shared/types/ui/Modal';
import { Competitor } from '@/shared/types/data/dashboard';
import { numberSuffix, thousandFormat } from '@/shared/utils/number';
import GraphBlock from '@/widgets/block/graphBlock';
import { GraphColorMap } from '@/components/container/graph-container';
import BaseButton from '@/widgets/button/baseButton';
import { CLOSE_MODAL } from '@/context/global/slice/modalSlice';

const cn = classNames.bind(styles);

const PoolResultModal = ({
  topicId,
  totalGain,
  totalPnL,
  totalPoolIn,
  competitors,
}: PoolResultModalProps) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const getSign = useCallback((value: number) => {
    return value === 0
      ? { result: true, sign: '' }
      : value > 0
        ? { result: true, sign: '+' }
        : { result: false, sign: '-' };
  }, []);

  const reward = useMemo(() => {
    return getSign(totalGain);
  }, [totalGain, totalPnL]);

  const getTextColor = useCallback((value: number) => {
    return value === 0
      ? 'DARK_GRAY_2'
      : value > 0
        ? 'BASE_GREEN_1'
        : 'BASE_RED_1';
  }, []);

  const sumTvl = useCallback(() => {
    return competitors.reduce((acc, cur) => acc + cur.poolTvl, 0);
  }, [competitors]);

  const tvlSum = useMemo(() => {
    return sumTvl();
  }, [competitors]);

  return (
    <BaseModal background={'DARK_OPACITY_5'}>
      <div className={cn('modal-inner')} ref={modalRef}>
        <p className={cn('modal-title')}>{'Your poll results'}</p>
        <div className={cn('modal-text-container')}>
          <BaseText
            text={'You have won'}
            size="medium"
            weight="regular"
            color="DARK_GRAY_2"
          />
          <BaseText
            text={`${reward.sign}${totalGain} $HONEY (${reward.sign}${totalPnL}%)`}
            size="medium"
            weight="regular"
            color={getTextColor(totalGain)}
          />
          <BaseText
            text={'in total!'}
            size="medium"
            weight="regular"
            color="DARK_GRAY_2"
          />
        </div>
        <div className={cn('table-wrapper')}>
          <div className={cn('header-inner-left')}>
            <BaseText
              text="Total volume locked"
              size="large"
              weight="bold"
              color="DARK"
            />
            <BaseText
              text="($HONEY)"
              size="large"
              weight="light"
              color="DARK_GRAY_5"
            />
          </div>
          <div className={cn('header-inner-right')}>
            <div className={cn('text-wrapper')}>
              <BaseText
                text="My Pool"
                size="medium"
                weight="bold"
                color="DARK_GRAY_5"
              />
            </div>
            <div className={cn('text-wrapper')}>
              <BaseText
                text="PnL($)"
                size="medium"
                weight="bold"
                color="DARK_GRAY_5"
              />
            </div>
            <div className={cn('text-wrapper')}>
              <BaseText
                text="PnL(%)"
                size="medium"
                weight="bold"
                color="DARK_GRAY_5"
              />
            </div>
          </div>
        </div>
        <div className={cn('table-body')}>
          <div className={cn('list-container')}>
            {competitors.map((item: Competitor, index: number) => {
              const rankText = index + 1;
              const chunk = (tvlSum / 100).toFixed(0);
              const ratio = Math.floor(item.poolTvl / parseInt(chunk));

              return (
                <div key={index} className={cn('list-item')}>
                  <BaseText
                    text={`${rankText}${numberSuffix(rankText)}`}
                    size={'medium'}
                    weight="light"
                    color={'DARK'}
                  />
                  <div className={cn('option-text')}>
                    <BaseText
                      text={item.name}
                      size={'medium'}
                      weight="light"
                      color={'DARK'}
                    />
                  </div>
                  <div className={cn('block-wrapper')}>
                    <GraphBlock
                      fillColor={GraphColorMap[rankText]}
                      fillRatio={ratio}
                    />
                  </div>
                  <div className={cn('text-wrapper')}>
                    <BaseText
                      text={`${getSign(item.data.poolIn).sign}$${thousandFormat(item.data.poolIn)}`}
                      size="medium"
                      weight="light"
                      color={getTextColor(item.data.gain)}
                    />
                  </div>
                  <div className={cn('text-wrapper')}>
                    <BaseText
                      text={`${getSign(item.data.gain).sign}$${thousandFormat(item.data.gain)}`}
                      size="medium"
                      weight="light"
                      color={getTextColor(item.data.gain)}
                    />
                  </div>
                  <div className={cn('text-wrapper')}>
                    <BaseText
                      text={`${getSign(item.data.pnl).sign}${item.data.pnl}%`}
                      size="medium"
                      weight="light"
                      color={getTextColor(item.data.gain)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={cn('table-wrapper')}>
          <div className={cn('header-inner-left')}>
            <BaseText text="Total" size="large" weight="bold" color="DARK" />
          </div>
          <div className={cn('header-inner-right')}>
            <div className={cn('text-wrapper')}>
              <BaseText
                text={`${getSign(totalPoolIn).sign}$${thousandFormat(totalPoolIn)}`}
                size="medium"
                weight="bold"
                color={getTextColor(totalGain)}
              />
            </div>
            <div className={cn('text-wrapper')}>
              <BaseText
                text={`${getSign(totalGain).sign}$${thousandFormat(totalGain)}`}
                size="medium"
                weight="bold"
                color={getTextColor(totalGain)}
              />
            </div>
            <div className={cn('text-wrapper')}>
              <BaseText
                text={`${getSign(totalPnL).sign}${totalPnL}%`}
                size="medium"
                weight="bold"
                color={getTextColor(totalGain)}
              />
            </div>
          </div>
        </div>
        <div className={cn('button-container')}>
          <BaseButton
            text="Close"
            shape="shape-4"
            colors={{ primary: 'BASE_BLUE_1', secondary: 'BASE_CREAM_1' }}
            theme="outline"
            fontSize="large"
            fontWeight="regular"
            onClick={() => {
              dispatch(CLOSE_MODAL());
            }}
            label="close-button"
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default PoolResultModal;
