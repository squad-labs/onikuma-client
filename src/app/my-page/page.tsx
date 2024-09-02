import React from 'react';
import styles from '@/app/my-page/page.module.scss';
import classNames from 'classnames/bind';
import MyClientPage from '@/app/my-page/client';
import type { ResolvingMetadata } from 'next';
import { getMetadata } from '@/shared/utils/metadata';
import { cookies } from 'next/headers';
import { MyData } from '@/shared/types/data/my-data';

const cn = classNames.bind(styles);

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

const MyPage = async () => {
  const cookie = cookies().get('token');

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboards/all-my-data`, {
      headers: {
        Authorization: `Bearer ${cookie?.value}`,
      },
    })

    const data: MyData = await res.json();
    console.log('data', data);

    return (
      <main className={cn('container')}>
        <MyClientPage myData={data} />
      </main>
    );
  } catch (error) {
    console.error(error);
    return <div>error</div>
  }  
};

export default MyPage;
