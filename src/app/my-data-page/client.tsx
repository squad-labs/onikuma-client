import React from 'react';
import styles from '@/app/my-data-page/client.module.scss';
import classNames from 'classnames/bind';
import HighlightCard from '@/widgets/card/highlightCard';

const cn = classNames.bind(styles);

const MyClientPage = () => {
  return (
    <div className={cn('page-container')}>
      <h1>My Data</h1>
      <div className={cn('data-container')}>
        <div className={cn('highlights-container')}>
          <HighlightCard
            title = "Total Pooled in Amount" 
            mainText = "$1,423.23"
            subText = "0%"/>
          <HighlightCard
            title = "Total Earnings / Loss" 
            mainText = "+$1,423.23"
            subText = "0%"/>
          <HighlightCard
            title = "PnL (%)" 
            mainText = "+32%"
            subText = "0%"/>
          <HighlightCard
            title = "Base Asset" 
            mainText = "$HONEY"
            subText = "BERACHAIN"/>
        </div>
        <div className={cn('status-container')}>

        </div>
      </div>
    </div>
  );
};

export default MyClientPage;
