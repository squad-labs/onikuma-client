import React from 'react';
import styles from '@/app/d/[id]/page.module.scss';
import classNames from 'classnames/bind';
import DashboardClientPage from '@/app/d/[id]/client';
import { TestToken } from '@/shared/constants/TEST';
import { getMetadata } from '@/shared/utils/metadata';
import { Dashboard, MyVote } from '@/shared/types/data/dashboard';
import { Topic } from '@/shared/types/data/topic';
import { DashboardProvider } from '@/context/partial/dashboardContext/DashboardProvider';

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
  const { id } = params;

  try {
    const dashboardRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboards/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    const topicRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    const myRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboards/my-voting/${id}`,
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

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
            <DashboardClientPage id={id} />
          </DashboardProvider>
        </div>
      </main>
    );
  } catch (err) {
    return err;
  }
};

export default DashboardPage;
