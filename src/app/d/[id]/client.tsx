'use client';
import React, { Suspense, useMemo } from 'react';
import styles from '@/app/d/[id]/client.module.scss';
import classNames from 'classnames/bind';
import GraphContainer from '@/components/container/graph-container';
import {
  useDashboard,
  useMyVote,
  useTopic,
} from '@/context/partial/dashboardContext/DashboardProvider';
import TvlTableContaienr from '@/components/container/tvl-table-container';
import ActivityContainer from '@/components/container/activity-container';
import CommentContainer from '@/components/container/comment-container';
import { CommentProvider } from '@/context/partial/commentContext/CommentProvider';
import MyVoteContainer from '@/components/container/my-vote-container';
import TopicDropdown from '@/components/common/dropdown/topicDropdown';
import GameDateBar from '@/components/common/bar/gameDateBar';

const cn = classNames.bind(styles);

type Props = {
  id: string;
};

const DashboardClientPage = ({ id }: Props) => {
  const dashboard = useDashboard();
  const topic = useTopic();
  const myVote = useMyVote();

  const isBlurred = useMemo(() => {
    return (
      myVote != null &&
      Array.isArray(myVote.competitors) &&
      myVote.competitors.every((vote) => vote.reserveToken === 0)
    );
  }, [myVote]);

  return (
    <CommentProvider id={id}>
      <div className={cn('container')}>
        <section className={cn('top-inner')}>
          <h1 className={cn('top-title')}>Dashboard</h1>
          <div className={cn('dropdown-wrapper')}>
            {topic && (
              <Suspense>
                <TopicDropdown value={{ id: id, name: topic?.name }} />
              </Suspense>
            )}
            {topic && (
              <Suspense>
                <GameDateBar
                  id={id}
                  startDate={topic.startAt}
                  endDate={topic.endAt}
                />
              </Suspense>
            )}
          </div>
        </section>
        <section className={cn('mid-inner')}>
          <Suspense>
            {myVote && (
              <MyVoteContainer myVote={myVote} isBlurred={isBlurred} />
            )}
          </Suspense>
        </section>
        <section className={cn('mid-inner')}>
          <Suspense>
            {dashboard && <GraphContainer type={'tvl'} dashboard={dashboard} />}
            {dashboard && (
              <GraphContainer type={'vote'} dashboard={dashboard} />
            )}
          </Suspense>
        </section>
        <section className={cn('mid-inner')}>
          <div className={cn('table-wrapper')}>
            <Suspense>
              {dashboard && <TvlTableContaienr dashboard={dashboard} />}
            </Suspense>
          </div>
          {topic && (
            <div className={cn('activity-wrapper')}>
              <ActivityContainer topicId={id} tokenName={topic.tokenName} />
            </div>
          )}
        </section>
        <section className={cn('comment-wrapper')}>
          <CommentContainer topicId={id} />
        </section>
      </div>
    </CommentProvider>
  );
};

export default DashboardClientPage;
