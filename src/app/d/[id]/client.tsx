'use client';
<<<<<<< HEAD
import React, { Suspense } from 'react';
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
=======
import React from 'react';
import styles from '@/app/d/[id]/page.module.scss';
import classNames from 'classnames/bind';
import { getMetadata } from '@/shared/utils/metadata';
import { ResolvingMetadata } from 'next';
>>>>>>> d4d0d8c (ui: adds go back home button component to page)

const cn = classNames.bind(styles);

type Props = {
  id: string;
};
<<<<<<< HEAD

const DashboardClientPage = ({ id }: Props) => {
  const dashboard = useDashboard();
  const topic = useTopic();
  const myVote = useMyVote();

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
          </div>
        </section>
        <section className={cn('mid-inner')}>
          <Suspense>{myVote && <MyVoteContainer myVote={myVote} />}</Suspense>
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
          <div className={cn('activity-wrapper')}>
            <ActivityContainer topicId={id} />
          </div>
        </section>
        <section className={cn('comment-wrapper')}>
          <CommentContainer topicId={id} />
        </section>
      </div>
    </CommentProvider>
  );
};

=======

type MetadataProps = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export const generateMetadata = async (
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata,
) => {
  return getMetadata({});
};

const DashboardClientPage = ({ id }: Props) => {
  return (
    <div>
      <span>{id}</span>
    </div>
  );
};

>>>>>>> d4d0d8c (ui: adds go back home button component to page)
export default DashboardClientPage;
