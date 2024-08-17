import React from 'react';
<<<<<<< HEAD
import styles from '@/app/d/[id]/page.module.scss';
import classNames from 'classnames/bind';
import DashboardClientPage from '@/app/d/[id]/client';
import { TestToken } from '@/shared/constants/TEST';
import { ResolvingMetadata } from 'next';
import { getMetadata } from '@/shared/utils/metadata';
import { Dashboard, MyVote } from '@/shared/types/data/dashboard';
import { Topic } from '@/shared/types/data/topic';
import { DashboardProvider } from '@/context/partial/dashboardContext/DashboardProvider';
=======
import styles from '@/app/d/[id]/client.module.scss';
import classNames from 'classnames/bind';
import DashboardClientPage from '@/app/d/[id]/client';
>>>>>>> d4d0d8c (ui: adds go back home button component to page)

const cn = classNames.bind(styles);

type Props = {
  params: {
    id: string;
  };
};

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

const DashboardPage = async ({ params }: Props) => {
  const { id } = params;

<<<<<<< HEAD
  try {
    const dashboardRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboards/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    const topicRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    const myRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboards/my-voting/${id}`,
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
    console.error(err);
    return <div>error</div>;
  }
};

=======
  return (
    <main className={cn('container')}>
      <DashboardClientPage id={id} />
    </main>
  );
};

>>>>>>> d4d0d8c (ui: adds go back home button component to page)
export default DashboardPage;
