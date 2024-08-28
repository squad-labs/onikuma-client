'use client'
import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/app/my-page/client.module.scss';
import classNames from 'classnames/bind';
import HighlightCard from '@/widgets/card/highlightCard';
import MyDataTable from '@/widgets/table/myDataTable';
import { getMyData } from '@/shared/api/MyData';
import { useQueryClient } from '@tanstack/react-query';

const cn = classNames.bind(styles);

type Competitor = {
  name: string;
  imgUrl: string; 
  isBiggestPickerPooler: boolean;
};

type ResultItem = {
  topicId: string;
  name: string;
  status: string;
  startAt: string;
  endAt: string;
  totalPoolIn: number; 
  totalGain: number;
  totalPnL: number;
  isBiggestTopicPooler: boolean;
  competitors: Competitor[];};

type MyDataResponse = {
  result: ResultItem[]; 
  myTotalPoolIn: number; 
  totalCostPnL: number;
  myTotalPnL: number;
};

const MyClientPage = () => {
  const [highlights, setHighlights] = useState({
    myTotalPoolIn: 0,
    myTotalGain: 0,
    myTotalPnL: 0,
  });
  const [dataTableData, setDataTableData] = useState<ResultItem[]>([]);
  const queryClient = useQueryClient();

  const getData = useCallback(async () => {
    console.log('fetchLike');
    const response: MyDataResponse = await getMyData();
    console.log('API Response:', response);
    if (response) {
      setHighlights ({
        myTotalPoolIn: response.myTotalPoolIn,
        myTotalGain: response.totalCostPnL,
        myTotalPnL: response.myTotalPnL,
    });
    setDataTableData(response.result);
  }
  }, []);

  useEffect(() => {
    getData();  
  }, [getData]);

  return (
    <div className={cn('page-container')}>
      <h1>My Data</h1>
      <div className={cn('data-container')}>
        <div className={cn('highlights-container')}>
          <HighlightCard
            title="Total Pooled in Amount"
            mainText={`$${highlights.myTotalPoolIn ?? '0.00'}`}
            subText="0%"
          />
          <HighlightCard
            title="Total Earnings / Loss"
            mainText={`$${highlights.myTotalGain ?? '0.00'}`}
            subText="0%"
          />
          <HighlightCard 
            title="PnL (%)" 
            mainText={`${highlights.myTotalPnL ?? '0.00'}`} 
            subText="0%" />
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


