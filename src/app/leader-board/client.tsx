'use client';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import styles from '@/app/leader-board/client.module.scss';
import classNames from 'classnames/bind';
import MyRankingTableContainer from '@/components/container/my-ranking-table-container';
import AllRankingTableContainer from '@/components/container/all-ranking-table-container';
import IfYouAreTableContainer from '@/components/container/if-you-are-table-container';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/QUERY_KEY';
import { getLeaderboard } from '@/shared/api/Dashboard';
import { LeaderItems } from '@/shared/types/data/leaderboard';

const cn = classNames.bind(styles);

const LeaderboardClientPage = () => {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLast, setIsLast] = useState<boolean>(false);
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_RANKINGS],
    queryFn: () =>
      getLeaderboard({
        page,
        pageSize: 20,
      }),
  });

  const [leaderItems, setLeaderItems] = useState<LeaderItems[]>([]);
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { leaders } = await getLeaderboard({
      page,
      pageSize: 20,
    });
    if (leaders.length === 0) {
      setIsLast(true);
    }
    setLeaderItems([...leaderItems, ...leaders]);
    setLoading(false);
  }, [page]);

  const onIntersection: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
  ) => {
    const target = entries[0];

    if (target.isIntersecting && !isLoading && !loading && !isLast) {
      console.log('fetch more');
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      root: document.querySelector('#container'),
      threshold: 0,
    });

    const observerTarget = document.querySelector('#observer-block');

    if (observerTarget) observer.observe(observerTarget);

    return () => {
      observer.disconnect();
    };
  }, [leaderItems]);

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className={cn('container')}>
      <section className={cn('top-inner')}>
        <h1 className={cn('top-title')}>Leaderboard</h1>
      </section>
      <section className={cn('main-inner')}>
        <div className={cn('left-wrapper')}>
          <Suspense>
            <MyRankingTableContainer myItem={data?.userRank} />
          </Suspense>
          <Suspense>
            <AllRankingTableContainer leaders={leaderItems || []} />
          </Suspense>
        </div>
        <div className={cn('right-wrapper')}>
          <IfYouAreTableContainer />
        </div>
      </section>
    </div>
  );
};

export default LeaderboardClientPage;
