import React, { useMemo } from 'react';
import styles from '@/components/container/activity-container/ActivityContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import TableHeader from '@/components/common/etc/tableHeader';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/QUERY_KEY';
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
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_RECENT_ACTIVITIES, topicId],
    queryFn: () => getRecentActivity({ topicId }),
  });

  const isBlurred = useMemo(() => !data || data.length === 0, [data]);

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
      <div className={cn('table-body')}>
        {data?.map((item: ActivityType, index: number) => {
          const isLastRow = index === data.length - 1;

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
