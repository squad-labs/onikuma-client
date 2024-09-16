import React from 'react';
import styles from '@/app/leader-board/page.module.scss';
import classNames from 'classnames/bind';
import { getMetadata } from '@/shared/utils/metadata';
import LeaderboardClientPage from '@/app/leader-board/client';

const cn = classNames.bind(styles);

export const generateMetadata = async () => {
  return getMetadata({});
};

const LeaderboardPage = () => {
  return (
    <main className={cn('container')}>
      <div className={cn('inner')}>
        <LeaderboardClientPage />
      </div>
    </main>
  );
};

export default LeaderboardPage;
