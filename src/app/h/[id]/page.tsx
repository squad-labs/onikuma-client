import React from 'react';
import styles from '@/app/h/[id]/page.module.scss';
import classNames from 'classnames/bind';
import HonorClientPage from '@/app/h/[id]/client';
import { getMetadata } from '@/shared/utils/metadata';
import { HonorType } from '@/shared/types/data/honor';
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

const HonorPage = async ({ params }: Props) => {
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

    const data: HonorType = await res.json();

    return (
      <main className={cn('container')}>
        <div className={cn('inner')}>
          <HonorClientPage id={id} honor={data} />
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

export default HonorPage;
