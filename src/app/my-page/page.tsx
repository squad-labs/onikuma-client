import React from 'react';
import styles from '@/app/my-page/page.module.scss';
import classNames from 'classnames/bind';
import MyClientPage from '@/app/my-page/client';
import { getMetadata } from '@/shared/utils/metadata';
import { cookies } from 'next/headers';
import { MyData } from '@/shared/types/data/my-data';
import UnAuthorizedError from '@/components/common/error/unAuthorizedError';

const cn = classNames.bind(styles);

export const generateMetadata = async () => {
  return getMetadata({});
};

const MyPage = async () => {
  const cookie = cookies().get('accessToken');

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboards/all-my-data`,
      {
        headers: {
          Authorization: `Bearer ${cookie?.value}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: MyData = await res.json();

    return (
      <main className={cn('container')}>
        <div className={cn('inner')}>
          <MyClientPage myData={data} />
        </div>
      </main>
    );
  } catch (err) {
    return (
      <main className={cn('container')}>
        <div className={cn('inner')}>
          <UnAuthorizedError />
        </div>
      </main>
    );
  }
};

export default MyPage;
