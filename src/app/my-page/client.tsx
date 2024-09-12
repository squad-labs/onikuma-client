'use client';
import React, { useMemo } from 'react';
import styles from '@/app/my-page/client.module.scss';
import classNames from 'classnames/bind';
import HighlightCard from '@/widgets/card/highlightCard';
import { MyData } from '@/shared/types/data/my-data';
import { thousandFormat } from '@/shared/utils/number';
import MyDataTableContainer from '@/components/container/my-data-table-container';

const cn = classNames.bind(styles);

type Props = {
  myData: MyData;
};

const MyClientPage = ({ myData }: Props) => {
  const total = useMemo(() => {
    return {
      myTotalPoolIn: myData.myTotalPoolIn ?? 0,
      totalCostPnL: myData.totalCostPnL ?? 0,
      myTotalPnL: myData.myTotalPnL ?? 0,
    };
  }, [myData]);

  const { signTotalGain, signPnL, formattedTotalGain } = useMemo(() => {
    const signTotalGain = total.totalCostPnL < 0 ? '-' : '+';
    const signPnL = total.myTotalPnL < 0 ? '' : '+';
    const formattedTotalGain = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(total.totalCostPnL));

    return { signTotalGain, signPnL, formattedTotalGain };
  }, [total]);

  return (
    <div className={cn('page-container')}>
      <h1>My Data</h1>
      <div className={cn('data-container')}>
        <div className={cn('highlights-container')}>
          <HighlightCard
            title="Total Pooled in Amount"
            mainText={`$${total.myTotalPoolIn ? thousandFormat(total.myTotalPoolIn) : '0.00'}`}
            subText="0%"
          />
          <HighlightCard
            title="Total Earnings / Loss"
            mainText={
              signTotalGain && formattedTotalGain
                ? `${signTotalGain}${formattedTotalGain}`
                : '0'
            }
            subText="0%"
          />
          <HighlightCard
            title="PnL (%)"
            mainText={
              signPnL && total.myTotalPnL
                ? `${signPnL}${total.myTotalPnL}%`
                : '0'
            }
            subText="0%"
          />
          <HighlightCard
            title="Base Asset"
            mainText="$HONEY"
            subText="BERACHAIN"
          />
        </div>
        <div className={cn('my-data-table-container')}>
          <MyDataTableContainer data={myData.result || []} />
        </div>
      </div>
    </div>
  );
};

export default MyClientPage;
