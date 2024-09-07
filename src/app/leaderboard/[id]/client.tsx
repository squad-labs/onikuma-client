import React from 'react';
import styles from '@/app/leaderboard/[id]/client.module.scss';
import classNames from 'classnames/bind';
import MyRankingTableContainer from '@/components/container/my-ranking-table-container';
import AllRankingTableContainer from '@/components/container/all-ranking-table-container';
import IfYouAreTableContainer from '@/components/container/if-you-are-table-container';

const cn = classNames.bind(styles);

const LeaderboardClientPage = () => {
  return (
    <div className={cn('container')}>
      <section className={cn('top-inner')}>
        <h1 className={cn('top-title')}>Leaderboard</h1>
      </section>
      <section className={cn('main-inner')}>
        <div className={cn('left-wrapper')}>
          <MyRankingTableContainer />
          <AllRankingTableContainer />
        </div>
        <div className={cn('right-wrapper')}>
          <IfYouAreTableContainer />
        </div>
      </section>
    </div>
  );
};

export default LeaderboardClientPage;
