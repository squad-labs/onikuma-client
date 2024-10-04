import React from 'react';
import styles from '@/app/d/[id]/page.module.scss';
import classNames from 'classnames/bind';
import DashboardClientPage from '@/app/d/[id]/client';
import { getMetadata } from '@/shared/utils/metadata';
import { Dashboard, MyVote } from '@/shared/types/data/dashboard';
import { Topic } from '@/shared/types/data/topic';
import { DashboardProvider } from '@/context/partial/dashboardContext/DashboardProvider';
import { cookies } from 'next/headers';
import UnAuthorizedError from '@/components/common/error/unAuthorizedError';

const cn = classNames.bind(styles);

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = async () => {
  return getMetadata({});
};

const DashboardPage = async ({ params }: Props) => {
  const cookie = cookies().get('accessToken');

  console.log();

  try {
    const dashboardRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboards/on-going`,
      {
        headers: {
          Authorization: `Bearer ${cookie?.value}`,
        },
      },
    );

    const topicRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics/on-going`,
      {
        headers: {
          Authorization: `Bearer ${cookie?.value}`,
        },
      },
    );

    const myRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboards/my-voting/on-going`,
      {
        headers: {
          Authorization: `Bearer ${cookie?.value}`,
        },
      },
    );

    console.log(dashboardRes.ok, topicRes.ok, myRes.ok);

    if (!dashboardRes.ok || !topicRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const dashboardData: Dashboard = await dashboardRes.json();
    const topicData: Topic = await topicRes.json();
    const myData: MyVote = await myRes.json();

    return (
      <main className={cn('container')}>
        <div className={cn('inner')}>
          <DashboardProvider
            topic={topicData}
            dashboard={dashboardData}
            myVote={myData}
          >
            <DashboardClientPage id={dashboardData.topicId} />
          </DashboardProvider>
        </div>
      </main>
    );
  } catch (err) {
    return (
      <main className={cn('container')}>
        <div className={cn('error-inner')}>
          <UnAuthorizedError />
        </div>
      </main>
    );
  }
};

export default DashboardPage;
