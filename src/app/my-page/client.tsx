'use client';
import React, { useState } from 'react';
import styles from '@/app/my-page/client.module.scss';
import classNames from 'classnames/bind';
import HighlightCard from '@/widgets/card/highlightCard';
import MyDataTable from '@/widgets/table/myDataTable';
import { MyData, MyTotalData, UserTopic } from '@/shared/types/data/my-data';

const cn = classNames.bind(styles);

type Props = {
  myData: MyData;
};

const MyClientPage = ({ myData }: Props) => {
  const [total, setTotal] = useState<MyTotalData>({
    myTotalPoolIn: myData.myTotalPoolIn,
    totalCostPnL: myData.totalCostPnL,
    myTotalPnL: myData.myTotalPnL,
  });
  const [dataTableData, setDataTableData] = useState<UserTopic[]>(
    myData.result,
  );

  const formattedTotalGain = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(total.totalCostPnL));

  const signTotalGain = total.totalCostPnL < 0 ? '-' : '+';

  const signPnL = total.myTotalPnL < 0 ? '' : '+';

  return (
    <div className={cn('page-container')}>
      <h1>My Data</h1>
      <div className={cn('data-container')}>
        <div className={cn('highlights-container')}>
          <HighlightCard
            title="Total Pooled in Amount"
            mainText={`$${total.myTotalPoolIn ?? '0.00'}`}
            subText="0%"
          />
          <HighlightCard
            title="Total Earnings / Loss"
            mainText={`${signTotalGain}${formattedTotalGain}`}
            subText="0%"
          />
          <HighlightCard
            title="PnL (%)"
            mainText={`${signPnL}${total.myTotalPnL}%`}
            subText="0%"
          />
          <HighlightCard
            title="Base Asset"
            mainText="$HONEY"
            subText="BERACHAIN"
          />
        </div>
        <div className={cn('my-data-table-container')}>
          <MyDataTable data={dataTableData} />
        </div>
      </div>
    </div>
  );
};

export default MyClientPage;
