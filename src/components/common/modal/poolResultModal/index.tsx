'use client';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/QUERY_KEY';
import { getPollResult } from '@/shared/api/Dashboard';
import useOnClickOutside from '@/shared/hooks/useOnClick';
import ShareResultButton from '@/components/common/button/shareResultButton';

const cn = classNames.bind(styles);

const PoolResultModal = ({ topicId }: PoolResultModalProps) => {
  const [width, setWidth] = useState<number>(0);
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_POOL_RESULT, topicId],
    queryFn: () => getPollResult({ topicId }),
  });

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getSign = useCallback((value: number) => {
    return value === 0
      ? { result: true, sign: '' }
      : value > 0
        ? { result: true, sign: '+' }
        : { result: false, sign: '-' };
  }, []);

  const reward = useMemo(() => {
    return getSign(data?.totalGain || 0);
  }, [data?.totalGain, data?.totalPnL]);

  const getTextColor = useCallback((value: number) => {
    return value === 0
      ? 'DARK_GRAY_2'
      : value > 0
        ? 'BASE_GREEN_1'
        : 'BASE_RED_1';
  }, []);

  const sumTvl = useCallback(() => {
    if (data) {
      return data.competitors[0].poolTvl;
    }
    return 0;
  }, [data?.competitors]);

  const tvlSum = useMemo(() => {
    return sumTvl();
  }, [data?.competitors]);

  useOnClickOutside({
    ref: modalRef,
    handler: () => dispatch(CLOSE_MODAL()),
    mouseEvent: 'click',
  });

  return (
    <BaseModal background={'DARK_OPACITY_5'}>
      <div className={cn('modal-inner')} ref={modalRef}>
        <p className={cn('modal-title')}>{'Your poll results'}</p>
        <div className={cn('modal-text-container')}>
          {width > 415 && (
            <BaseText
              text={'You have won'}
              size="medium"
              weight="regular"
              color="DARK_GRAY_2"
              classNames={['white-space']}
            />
          )}
          <BaseText
            text={`${reward.sign}${Math.abs(data?.totalGain ?? 0)} $HONEY (${reward.sign}${Math.abs(data?.totalPnL ?? 0)}%)`}
            size="medium"
            weight="regular"
            color={getTextColor(data?.totalGain || 0)}
            classNames={['white-space']}
          />
          {width > 415 && (
            <BaseText
              text={'in total!'}
              size="medium"
              weight="regular"
              color="DARK_GRAY_2"
              classNames={['white-space']}
            />
          )}
        </div>
        <div className={cn('table-wrapper')}>
          <div className={cn('header-inner-left')}>
            {width > 415 ? (
              <Fragment>
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
              </Fragment>
            ) : (
              <BaseText
                text="TVL ($HONEY)"
                size="medium"
                weight="bold"
                color="DARK"
              />
            )}
          </div>
          {width > 415 && (
            <div className={cn('header-inner-right')}>
              <div className={cn('text-wrapper')}>
                <BaseText
                  text="My Pool"
                  size="medium"
                  weight="bold"
                  color="DARK_GRAY_5"
                  classNames={['white-space']}
                />
              </div>
              <div className={cn('text-wrapper')}>
                <BaseText
                  text="PnL($)"
                  size="medium"
                  weight="bold"
                  color="DARK_GRAY_5"
                  classNames={['white-space']}
                />
              </div>
              <div className={cn('text-wrapper')}>
                <BaseText
                  text="PnL(%)"
                  size="medium"
                  weight="bold"
                  color="DARK_GRAY_5"
                  classNames={['white-space']}
                />
              </div>
            </div>
          )}
        </div>
        <div className={cn('table-body')}>
          <div className={cn('list-container')}>
            {data?.competitors.map((item: Competitor, index: number) => {
              const rankText = index + 1;
              const chunk = tvlSum / 100;
              const ratio = Math.floor(item.poolTvl / chunk);

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
                      text={
                        item.name.length > 8
                          ? `${item.name.slice(0, 8)}..`
                          : item.name
                      }
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
                  {width > 415 && (
                    <Fragment>
                      <div className={cn('text-wrapper')}>
                        <BaseText
                          text={`${getSign(item.data.poolIn).sign}$${thousandFormat(Math.abs(parseFloat(item.data.poolIn.toFixed(2))) || '0')}`}
                          size="medium"
                          weight="light"
                          color={getTextColor(item.data.gain)}
                        />
                      </div>
                      <div className={cn('text-wrapper')}>
                        <BaseText
                          text={`${getSign(item.data.gain).sign}$${thousandFormat(Math.abs(parseFloat(item.data.gain.toFixed(2))) || '0')}`}
                          size="medium"
                          weight="light"
                          color={getTextColor(item.data.gain)}
                        />
                      </div>
                      <div className={cn('text-wrapper')}>
                        <BaseText
                          text={`${getSign(item.data.pnl).sign}${Math.abs(item.data.pnl)}%`}
                          size="medium"
                          weight="light"
                          color={getTextColor(item.data.gain)}
                        />
                      </div>
                    </Fragment>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className={cn('table-wrapper')}>
          <div className={cn('header-inner-left')}>
            <BaseText
              text="Total"
              size={width > 820 ? 'large' : 'medium'}
              weight="bold"
              color="DARK"
            />
          </div>
          <div className={cn('header-inner-right')}>
            <div className={cn('text-wrapper')}>
              <BaseText
                text={`${getSign(data?.totalPoolIn || 0).sign}$${thousandFormat(Math.abs(parseFloat(data?.totalPoolIn.toFixed(2) || '0')))}`}
                size="medium"
                weight="bold"
                color={getTextColor(data?.totalGain || 0)}
              />
            </div>
            <div className={cn('text-wrapper')}>
              <BaseText
                text={`${getSign(data?.totalGain || 0).sign}$${thousandFormat(Math.abs(parseFloat(data?.totalGain.toFixed(2) || '0')))}`}
                size="medium"
                weight="bold"
                color={getTextColor(data?.totalGain || 0)}
              />
            </div>
            <div className={cn('text-wrapper')}>
              <BaseText
                text={`${getSign(data?.totalPnL || 0).sign}${Math.abs(data?.totalPnL ?? 0)}%`}
                size="medium"
                weight="bold"
                color={getTextColor(data?.totalGain || 0)}
              />
            </div>
          </div>
        </div>
        <div className={cn('button-container')}>
          <ShareResultButton
            topicId={topicId}
            totalGain={data?.totalGain || 0}
            totalPnL={data?.totalPnL || 0}
            totalPoolIn={data?.totalPoolIn || 0}
            competitors={data?.competitors || []}
          />
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
