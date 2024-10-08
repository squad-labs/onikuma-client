import React, { useCallback, useMemo } from 'react';
import styles from '@/components/container/my-data-table-container/MyDataTableContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import PlayGameButton from '@/components/common/button/playGameButton';
import StatusBar from '@/widgets/bar/statusBar';
import { fetchDateFormat } from '@/shared/utils/date';
import CheckResultsButton from '@/components/common/button/checkResultsButton';
import { useRouter } from 'next/navigation';
import { OPEN_MODAL } from '@/context/global/slice/modalSlice';
import { useDispatch } from 'react-redux';

const cn = classNames.bind(styles);

type TableRow = {
  topicId: string;
  name: string;
  status: string;
  startAt: string;
  endAt: string;
  totalPoolIn: number;
  totalCostPnL: number;
  totalPercentPnL: number;
  isBiggestTopicPooler: boolean;
  competitors: {
    name: string;
    isBiggestPickerPooler: boolean;
  }[];
};

type MyDataTableProps = {
  data: TableRow[];
};

const MyDataTableContainer = ({ data }: MyDataTableProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formatDollar = (value: number) => {
    const formattedNumber = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
    return formattedNumber;
  };

  const formatSign = (value: number) => {
    return value >= 0 ? '+' : '';
  };

  const isBlurred = useMemo(() => {
    return data.length === 0;
  }, [data]);

  return (
    <div className={cn('container')}>
      <div className={cn('table-header')}>
        <div className={cn('header-wrapper')}>
          <div className={cn('header-name')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="Name"
            />
          </div>
          <div className={cn('header-status')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="Status"
            />
          </div>
          <div className={cn('header-schedule')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="Schedule"
            />
          </div>
          <div className={cn('header-pooled-in')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="Pooled in"
            />
          </div>
          <div className={cn('header-pnl-dollar')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="PnL($)"
            />
          </div>
          <div className={cn('header-pnl-percent')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="PnL(%)"
            />
          </div>
          <div className={cn('header-checked-result')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="Check Results"
            />
          </div>
        </div>
      </div>
      <div className={cn('table-body')}>
        {isBlurred && (
          <div className={cn('overlay')}>
            <div className={cn('message')}>
              <p>You have not pooled in anything yet! Explore Onikuma Game</p>
              <PlayGameButton />
            </div>
          </div>
        )}
        {data.map((item, index) => {
          const isPickerHonor = () => {
            return item.competitors.some(
              (competitor) => competitor.isBiggestPickerPooler,
            );
          };

          const isHallofHonor = () => {
            return (
              (item.isBiggestTopicPooler || isPickerHonor()) &&
              item.status === 'onGoing'
            );
          };

          return (
            <div key={index}>
              <div className={cn('list-item')}>
                <div className={cn('item-name')}>
                  <span className={cn('text')}>{item.name}</span>
                </div>
                <div className={cn('item-status')}>
                  <StatusBar label={item.status} />
                </div>
                <div className={cn('item-schedule')}>
                  {fetchDateFormat(item.startAt)}
                </div>
                <div className={cn('item-pooled-in')}>
                  {formatSign(item.totalPoolIn)}
                  {formatDollar(item.totalPoolIn)}
                </div>
                <div className={cn('item-pnl-dollar')}>
                  {formatSign(item.totalCostPnL)}
                  {formatDollar(item.totalCostPnL)}
                </div>
                <div className={cn('item-pnl-percent')}>
                  {formatSign(item.totalPercentPnL)}
                  {formatDollar(item.totalPercentPnL)}%
                </div>
                <div className={cn('item-check-result')}>
                  <CheckResultsButton
                    text={isHallofHonor() ? 'Hall of Honor' : 'Check Results'}
                    primaryColor={
                      isHallofHonor()
                        ? 'BASE_RED_1'
                        : item.status === 'onGoing'
                          ? 'DARK_GRAY_5'
                          : 'BASE_BLUE_1'
                    }
                    secondaryColor="BASE_CREAM_1"
                    onClick={() => {
                      if (isHallofHonor() && item.status === 'onGoing') {
                        router.push(`/hall-of-honor/${item.topicId}`);
                      } else if (
                        isHallofHonor() === false &&
                        item.status === 'onGoing'
                      ) {
                        return;
                      } else {
                        dispatch(
                          OPEN_MODAL({
                            name: 'PoolResutlModal',
                            data: {
                              topicId: item.topicId,
                              totalGain: item.totalCostPnL,
                              totalPnl: item.totalPercentPnL,
                              totalPoolIn: item.totalPoolIn,
                              competitors: item,
                            },
                          }),
                        );
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyDataTableContainer;
