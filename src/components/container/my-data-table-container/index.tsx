import React, { useMemo } from 'react';
import styles from '@/components/container/my-data-table-container/MyDataTableContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import { fetchDateFormat } from '@/shared/utils/date';
import PlayGameButton from '@/components/common/button/playGameButton';
import CheckResultsButton from '@/components/common/button/checkResultsButton';
import StatusBar from '@/widgets/bar/statusBar';

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
    return data.length !== 10;
  }, [data]);

  return (
    <div className={cn('container')}>
      <div className={cn('table-header')}>
        <div className={cn('header-wrapper')}>
          <div className={'header-1'}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="Name"
            />
          </div>
          <div className={'header-2'}>
            <div className={'inner-text'}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="bold"
                text="Status"
              />
            </div>
          </div>
          <div className={'header-3'}>
            <div className={'inner-text'}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="bold"
                text="Schedule"
              />
            </div>
          </div>
          <div className={'header-4'}>
            <div className={'inner-text'}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="bold"
                text="Pooled in"
              />
            </div>
          </div>
          <div className={'header-5'}>
            <div className={'inner-text'}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="bold"
                text="PnL($)"
              />
            </div>
          </div>
          <div className={'header-6'}>
            <div className={'inner-text'}></div>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="PnL(%)"
            />
          </div>
          <div className={'header-7'}>
            <div className={'inner-text'}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="bold"
                text="Check Results"
              />
            </div>
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
      </div>
      {data.map((item, index) => {
        return (
          <div key={index} className={cn('list-item')}>
            <div className={cn('item-inner-1')}>
              <BaseText
                text={item.name}
                size={'medium'}
                weight="regular"
                color={'DARK'}
              />
            </div>
            <div className={cn('item-inner-2')}>
              <StatusBar label={item.status} />
            </div>
            <div className={cn('item-inner-3')}>
              {fetchDateFormat(item.startAt) +
                '~' +
                fetchDateFormat(item.endAt)}
            </div>
            <div className={cn('item-inner-4')}>
              {formatSign(item.totalPoolIn)}
              {formatDollar(item.totalPoolIn)}
            </div>
            <div className={cn('item-inner-5')}>
              {formatSign(item.totalCostPnL)}
              {formatDollar(item.totalCostPnL)}
            </div>
            <div className={cn('item-inner-6')}>
              {formatSign(item.totalPercentPnL)}
              {formatDollar(item.totalPercentPnL)}%
            </div>
            <div className={cn('item-inner-7')}>
              <CheckResultsButton
                text={
                  item.isBiggestTopicPooler ? 'Hall of Honor' : 'Check Results'
                }
                primaryColor={
                  item.isBiggestTopicPooler
                    ? 'BASE_RED_1'
                    : item.status.toLowerCase() === 'ongoing'
                      ? 'DARK_GRAY_5'
                      : 'BASE_BLUE_1'
                }
                secondaryColor="BASE_CREAM_1"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyDataTableContainer;
