'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/app/my-page/client.module.scss';
import classNames from 'classnames/bind';
import HighlightCard from '@/widgets/card/highlightCard';
import MyDataTable from '@/widgets/table/myDataTable';
import { fetchMyData } from '@/shared/api/MyData';

const cn = classNames.bind(styles);

type Competitor = {
  name: string;
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
  competitors: Competitor[];
};

type MyDataResponse = {
  result: ResultItem[];
  myTotalPoolIn: number; 
  myTotalGain: number;
  myTotalPnL: number;
};

const MyClientPage = () => {

  const [myTotalPoolIn, setMyTotalPoolIn] = useState<number>(0);
  const [myTotalGain, setMyTotalGain] = useState<number>(0);
  const [myTotalPnL, setMyTotalPnL] = useState<number>(0);
  const [dataTableData, setDataTableData] = useState<ResultItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const loadData = async () => {
        try {
          const res = await fetchMyData();
          console.log('Fetched Data:', res);
  
          if (res && res.result) {
            setMyTotalPoolIn(res.myTotalPoolIn);
            setMyTotalGain(res.myTotalGain);
            setMyTotalPnL(res.myTotalPnL);
            setDataTableData(res.result);
          } else {
            throw new Error('Invalid data structure');
          }
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failure to fetch data');
        }
      };
      loadData();
    }, []);

  return (
    <div className={cn('page-container')}>
      <h1>My Data</h1>
      <div className={cn('data-container')}>
        <div className={cn('highlights-container')}>
          <HighlightCard
            title="Total Pooled in Amount"
            mainText={`$${myTotalPoolIn || '0.00'}`}
            subText="0%"
          />
          <HighlightCard
            title="Total Earnings / Loss"
            mainText={`$${myTotalGain || '0.00'}`}
            subText="0%"
          />
          <HighlightCard 
            title="PnL (%)" 
            mainText={`$${myTotalPnL?.toFixed(2) || '0.00'}`} 
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
