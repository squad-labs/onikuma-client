import React from 'react';
import styles from '@/app/hall-of-honor/[id]/page.module.scss';
import classNames from 'classnames/bind';
import { getMetadata } from '@/shared/utils/metadata';
import { HonorType } from '@/shared/types/data/honor';
import HallOfHonorClientPage from '@/app/hall-of-honor/[id]/client';
import { cookies } from 'next/headers';
import UnAuthorizedError from '@/components/common/error/unAuthorizedError';

const cn = classNames.bind(styles);

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = async () => {
  return getMetadata({
    title: 'Hall of Honor',
    siteName: 'Onikuma | Hall of Honor',
    description: 'Hall of Honor',
  });
};

const HallOfHonorPage = async ({ params }: Props) => {
  const { id } = params;
  const cookie = cookies().get('accessToken');

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboards/hall-of-honor/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie?.value}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: HonorType = await res.json();

    console.log(data);

    return (
      <main className={cn('container')}>
        <div className={cn('inner')}>
          <HallOfHonorClientPage id={id} honor={data} />
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

export default HallOfHonorPage;
