import React from 'react';
import styles from '@/app/my-data-page/client.module.scss';
import classNames from 'classnames/bind';
import HighlightCard from '@/widgets/card/highlightCard';
import MyDataTable from '@/widgets/table/myDataTable';

const cn = classNames.bind(styles);

const mySampleData = [
  {
    name: 'Who is the best kisser?',
    status: 'Ongoing',
    schedule: '2024-08-20 - 2024-08-27',
    pooledIn: '$287,000',
    pnlDollars: '+287,000',
    pnlPercent: '+25.25%',
    checkResults: 'Check Results',
  },
  {
    name: 'Who will you vote for the next election?',
    status: 'Ongoing',
    schedule: '2024-08-20 - 2024-08-27',
    pooledIn: '$287,000',
    pnlDollars: '+287,000',
    pnlPercent: '+25.25%',
    checkResults: 'Hall of Honor',
  },
  {
    name: 'Your favorite anime character?',
    status: 'Ended',
    schedule: '2024-08-20 - 2024-08-27',
    pooledIn: '$287,000',
    pnlDollars: '+287,000',
    pnlPercent: '+25.25%',
    checkResults: 'Check Results',
  },
  {
    name: 'Item name',
    status: 'Ended',
    schedule: '2024-08-20 - 2024-08-27',
    pooledIn: '$287,000',
    pnlDollars: '+287,000',
    pnlPercent: '+25.25%',
    checkResults: 'Check Results',
  },
  {
    name: 'Item name',
    status: 'Ended',
    schedule: '2024-08-20 - 2024-08-27',
    pooledIn: '$287,000',
    pnlDollars: '+287,000',
    pnlPercent: '+25.25%',
    checkResults: 'Check Results',
  },
  {
    name: 'Item name',
    status: 'Ended',
    schedule: '2024-08-20 - 2024-08-27',
    pooledIn: '$287,000',
    pnlDollars: '+287,000',
    pnlPercent: '+25.25%',
    checkResults: 'Check Results',
  },
];

const MyClientPage = () => {
  return (
    <div className={cn('page-container')}>
      <h1>My Data</h1>
      <div className={cn('data-container')}>
        <div className={cn('highlights-container')}>
          <HighlightCard
            title="Total Pooled in Amount"
            mainText="$1,423.23"
            subText="0%"
          />
          <HighlightCard
            title="Total Earnings / Loss"
            mainText="+$1,423.23"
            subText="0%"
          />
          <HighlightCard title="PnL (%)" mainText="+32%" subText="0%" />
          <HighlightCard
            title="Base Asset"
            mainText="$HONEY"
            subText="BERACHAIN"
          />
        </div>
        <div className={cn('my-data-table-container')}>
          <MyDataTable data={mySampleData} />
        </div>
      </div>
    </div>
  );
};

export default MyClientPage;
