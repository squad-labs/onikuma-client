import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '@/components/container/activity-container/ActivityContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import TableHeader from '@/components/common/etc/tableHeader';
import { getRecentActivity } from '@/shared/api/Activity';
import { ActivityType } from '@/shared/types/data/activity';
import { fetchRelatedTime } from '@/shared/utils/date';
import { COLOR } from '@/shared/constants/COLOR';
import { getShortenAddress } from '@/shared/utils/format';

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
};

const ActivityContainer = ({ topicId }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLast, setIsLast] = useState<boolean>(false);

  const [activityItems, setActivityItems] = useState<ActivityType[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const activities = await getRecentActivity({
      topicId,
      page,
      pageSize: 10,
    });
    console.log(activities);
    if (activities.length === 0) {
      console.log('isLast');
      setIsLast(true);
    }
    setActivityItems([...activityItems, ...activities]);
    setLoading(false);
  }, [page]);

  const onIntersection: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
  ) => {
    const target = entries[0];

    if (target.isIntersecting && !loading && !isLast) {
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
  }, [activityItems]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const isBlurred = useMemo(
    () => !activityItems || activityItems.length === 0,
    [activityItems],
  );

  return (
    <div className={cn('container')}>
      <div className={cn('top-inner')}>
        <BaseText
          text="Latist Activities"
          color={'DARK'}
          size={'large'}
          weight="regular"
        />
      </div>
      <div className={cn('table-header')}>
        <TableHeader onlyName={true} />
      </div>
      <div className={cn('table-body')} id="container">
        {activityItems?.map((item: ActivityType, index: number) => {
          const isLastRow = index === activityItems.length - 1;

          return (
            <div
              className={cn('item-wrapper')}
              key={item.activityId}
              style={{
                borderBottom: isLastRow
                  ? 'none'
                  : `1px solid ${COLOR['BASE_GRAY_2']}`,
              }}
            >
              <BaseText
                text={`${getShortenAddress(item.userWallet)} pooled in `}
                color={'DARK_GRAY_5'}
                size={'medium'}
                weight={'regular'}
              />
              <BaseText
                text={`$${item.poolIn} ${'HONEY'}`}
                color={'DARK_GRAY_5'}
                size={'medium'}
                weight={'bold'}
              />
              <BaseText
                text={`to`}
                color={'DARK_GRAY_5'}
                size={'medium'}
                weight={'regular'}
              />
              <BaseText
                text={`${'...'} at ${fetchRelatedTime(item.createdAt)}`}
                color={'DARK_GRAY_5'}
                size={'medium'}
                weight={'bold'}
              />
            </div>
          );
        })}
        <div id="observer-block" />;
        {isBlurred && (
          <div className={cn('overlay')}>
            <div className={cn('message')}>
              <p>No transaction yet!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityContainer;
